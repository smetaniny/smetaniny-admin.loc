import axios from 'axios';
import {AUTH_URL_API} from './settings';
import {Permission} from "./interface/Permission";
import {AuthResult} from "./interface/AuthResult";

type SetShowLoader = (show: boolean) => void;
type SetUserPermissions = (permissions: Permission[]) => void;

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
        } catch (error: any) {
            if (error.response && error.response.status !== 200) {
                const errorMessage = Object.keys(error.response.data.errors)
                    .map(key => `${key}: ${error.response.data.errors[key].join(', ')}`)
                    .join('; ');
                throw new Error(errorMessage);
            } else {
                throw new Error('Ошибка аутентификации: Не удалось выполнить запрос к серверу');
            }
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
        const user = persistedUser ? JSON.parse(persistedUser) : [];
        if (user && user.role && user.role.permissions) {
            setShowLoader(false);
            return Promise.resolve(user.role.permissions);
        } else {
            if (window.location.pathname !== '/login') {
                setShowLoader(false);
                window.location.replace('/login');
            } else {
                setShowLoader(false);
            }
            return Promise.reject();
        }
    },

    getIdentity: () => {
        const persistedUser = sessionStorage.getItem("user");
        const user = persistedUser ? JSON.parse(persistedUser) : null;
        return Promise.resolve(user);
    },
});

export default authProvider;
