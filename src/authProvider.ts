import axios, {AxiosError} from "axios";
import {AUTH_URL_API} from "./settings";
import {Permission} from "./interface/Permission";
import {AuthResult} from "./interface/AuthResult";

type SetShowLoader = (show: boolean) => void;
type SetUserPermissions = (permissions: Permission[]) => void;

interface ErrorDetail {
    [key: string]: string[];
}

const authProvider = (
    setShowLoader: SetShowLoader,
    setUserPermissions: SetUserPermissions,
) => ({
    login: async ({
                      username,
                      password,
                  }: {
        username: string;
        password: string;
    }) => {
        try {
            const response = await axios.post<AuthResult>(
                AUTH_URL_API,
                {
                    email: username,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                },
            );

            const result = response.data;
            const {
                data: {user, token = ""},
            } = result;

            if (response.status == 200) {
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", JSON.stringify(user));
                setUserPermissions(user.role.permissions);
                return Promise.resolve();
            } else {
                return Promise.reject(
                    new Error("Ошибка аутентификации: Неверные учетные данные"),
                );
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.data) {
                    const errorData = axiosError.response.data as {
                        errors?: ErrorDetail;
                    };
                    if (errorData.errors) {
                        const errorMessage = Object.keys(errorData.errors)
                            .map((key) => `${key}: ${errorData.errors?.[key].join(", ")}`)
                            .join("; ");
                        throw new Error(errorMessage);
                    }
                }
                // Если errorData.errors нет, выводим текст ошибки
                throw new Error(
                    axiosError.message || "Ошибка аутентификации: Неизвестная ошибка",
                );
            }
            // Для не Axios ошибок
            throw new Error(
                "Ошибка аутентификации: Не удалось выполнить запрос к серверу",
            );
        }
    },

    logout: () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        setUserPermissions([]);
        setTimeout(() => setShowLoader(false), 0);
        return Promise.resolve();
    },

    checkError: () => {
        return Promise.resolve();
    },

    checkAuth: async () => {
        if (sessionStorage.getItem("token")) {
            setTimeout(() => {
                setTimeout(() => setShowLoader(false), 0);
            }, 3000);
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    },

    getPermissions: () => {
        const persistedUser = sessionStorage.getItem("user");
        const user = persistedUser ? JSON.parse(persistedUser) : null;

        if (user && user.role && user.role.permissions) {
            setTimeout(() => setShowLoader(false), 0);
            return Promise.resolve(user.role.permissions);
        } else {
            setTimeout(() => setShowLoader(false), 0);
            // if (window.location.pathname !== "/admin-login") {
            //     window.location.replace("/admin-login");
            // }

            // Возвращаем промис с отклоненной ошибкой
            return Promise.reject(
                "Необходима авторизация. Перенаправление на страницу входа.",
            );
        }
    },

    getIdentity: () => {
        const persistedUser = sessionStorage.getItem("user");
        const user = persistedUser ? JSON.parse(persistedUser) : null;
        return Promise.resolve(user);
    },
});

export default authProvider;
