import {AuthProvider} from "react-admin";
import axios from 'axios';
import {AUTH_URL_API} from "./settings";

/**
 * Авторизационный провайдер, используемый React Admin.
 */
export const authProvider = (setShowLoader: Function): AuthProvider => ({
    /**
     * Функция входа.
     */
    login: async ({username, password}) => {
        // Выполняем запрос к API для аутентификации
        const response = await axios.post(AUTH_URL_API, {
            email: username,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
        // Получаем результат из ответа
        const result = await response.data;
        // Извлекаем статус, пользователя и токен из результата
        const {status = false, user = {}, token = "", config = {}} = result;
        // Если статус успешный, сохраняем токен и пользователя в sessionStorage
        if (status) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('config', JSON.stringify(config));
            // Устанавливаем токен в заголовке Authorization для всех будущих запросов
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Возвращаем успешный результат входа
            return Promise.resolve();
        } else {
            // Если статус неуспешный, возвращаем ошибку
            return Promise.reject();
        }
    },
    /**
     * Функция выхода.
     */
    logout: () => {
        // Удаляем данные пользователя и токен из sessionStorage
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        // Возвращаем успешный результат выхода
        return Promise.resolve();
    },
    /**
     * Функция проверки ошибки.
     */
    checkError: () => Promise.resolve(),
    /**
     * Функция проверки аутентификации.
     */
    checkAuth: async () => {
        // Проверяем наличие токена в sessionStorage
        const token = sessionStorage.getItem("token");
        // Если токен есть, возвращаем успешный результат
        if (token) {
            setShowLoader(false)
            return Promise.resolve();
        } else {
            setShowLoader(false)
            // Если токена нет, возвращаем ошибку
            return Promise.reject();
        }
    },
    /**
     * Функция получения разрешений пользователя.
     */
    getPermissions: () => {
        // Возвращаем разрешения (в данном случае не определены)
        return Promise.resolve(undefined);
    },
    /**
     * Функция получения идентификации пользователя.
     */
    getIdentity: () => {
        // Получаем данные пользователя из sessionStorage
        const persistedUser = sessionStorage.getItem("user");
        const user = persistedUser ? JSON.parse(persistedUser) : null;
        // Возвращаем данные пользователя
        return Promise.resolve(user);
    },
});

export default authProvider;
