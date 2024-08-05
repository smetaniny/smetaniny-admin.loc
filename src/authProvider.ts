import axios, {AxiosError} from 'axios';
import {AUTH_URL_API} from './settings';
import {Permission} from "./interface/Permission";
import {AuthResult} from "./interface/AuthResult";

type SetShowLoader = (show: boolean) => void;
type SetUserPermissions = (permissions: Permission[]) => void;

interface ErrorDetail {
    [key: string]: string[]; // Ключи — это строки, значения — массивы строк
}

const authProvider = (setShowLoader: SetShowLoader, setUserPermissions: SetUserPermissions) => ({
    login: async ({username, password}: { username: string; password: string }) => {
        try {
            const response = await axios.post<AuthResult>(AUTH_URL_API, {
                email: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });

            const result = response.data;
            const {status = false, data: {user, token = ""}} = result;

            if (status) {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('user', JSON.stringify(user));
                setUserPermissions(user.role.permissions);
                return Promise.resolve();
            } else {
                return Promise.reject(new Error('Ошибка аутентификации: Неверные учетные данные'));
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.data) {
                    const errorData = axiosError.response.data as { errors?: ErrorDetail };
                    if (errorData.errors) {
                        const errorMessage = Object.keys(errorData.errors)
                            .map(key => `${key}: ${errorData.errors?.[key].join(', ')}`)
                            .join('; ');
                        throw new Error(errorMessage);
                    }
                }
                // Если errorData.errors нет, выводим текст ошибки
                throw new Error(axiosError.message || 'Ошибка аутентификации: Неизвестная ошибка');
            }
            // Для не Axios ошибок
            throw new Error('Ошибка аутентификации: Не удалось выполнить запрос к серверу');
        }
    },

    logout: () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        setUserPermissions([]);
        setShowLoader(false);
        return Promise.resolve();
    },

    checkError: () => {
        return Promise.resolve();
    },

    checkAuth: async () => {
        if (sessionStorage.getItem("token")) {
            setShowLoader(false);
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    },

    getPermissions: () => {
        const persistedUser = sessionStorage.getItem("user");
        const user = persistedUser ? JSON.parse(persistedUser) : null;

        if (user && user.role && user.role.permissions) {
            setShowLoader(false);
            return Promise.resolve(user.role.permissions);
        } else {
            setShowLoader(false);

            if (window.location.pathname !== '/login') {
                window.location.replace('/login');
            }

            // Возвращаем промис с отклоненной ошибкой
            return Promise.reject('Необходима авторизация. Перенаправление на страницу входа.');
        }
    },


    getIdentity: () => {
        const persistedUser = sessionStorage.getItem("user");
        const user = persistedUser ? JSON.parse(persistedUser) : null;
        return Promise.resolve(user);
    },
});

export default authProvider;
