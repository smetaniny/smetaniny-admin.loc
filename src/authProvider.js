import axios from 'axios';
import {AUTH_URL_API} from "./settings";

/**
 * Авторизационный провайдер, используемый React Admin.
 */
const authProvider = (setShowLoader, setUserPermissions) => ({
    /**
     * Функция входа.
     */
    login: async ({username, password}) => {
        try {
            // Выполняем запрос к API для аутентификации
            const response = await axios.post(AUTH_URL_API, {
                email: username,
                password: password,
            }, {
                //
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });

            // Получаем результат из ответа
            const result = await response.data;

            // Извлекаем статус, пользователя и токен из результата
            const {status = false, data: {user = {}, token = ""}} = result;

            // Если статус успешный, сохраняем токен и пользователя в sessionStorage
            if (status) {
                // Устанавливаем токен
                sessionStorage.setItem('token', token);
                // Устанавливаем пользователя
                sessionStorage.setItem('user', JSON.stringify(user));
                // Устанавливаем права
                setUserPermissions(user.role.permissions);
                // Возвращаем успешный результат входа
                return Promise.resolve();
            } else {
                // Если статус неуспешный, возвращаем ошибку
                return Promise.reject(new Error('Ошибка аутентификации: Неверные учетные данные'));
            }
        } catch (error) {
            // Если получен ответ с кодом ошибки
            if (error.response && error.response.status !== 200) {
                // Преобразуем объект ошибок в строку
                const errorMessage = Object.keys(error.response.data.errors).map(key => `${key}: ${error.response.data.errors[key].join(', ')}`).join('; ');
                // Бросить ошибку с текстом ошибки из ответа
                throw new Error(errorMessage);

            } else {
                // Иначе, бросить ошибку общего характера
                throw new Error('Ошибка аутентификации: Не удалось выполнить запрос к серверу');
            }
        }
    },


    /**
     * Функция выхода.
     */
    logout: () => {
        // Удаляем данные пользователя
        sessionStorage.removeItem("user");
        //  Удаляем токен
        sessionStorage.removeItem("token");
        //  Удаляем разрешения
        setUserPermissions([]);
        // Выключение loader
        setShowLoader(false)
        // Возвращаем успешный результат выхода
        return Promise.resolve();
    },
    /**
     * Функция проверки ошибки.
     */
    checkError: () => {
        return Promise.resolve()
    },
    /**
     * Функция проверки аутентификации.
     */
    checkAuth: async () => {
        // console.log('sessionStorage.getItem("token")', sessionStorage.getItem("token"));
        // Если токен есть, возвращаем успешный результат
        if (sessionStorage.getItem("token")) {
            // Выключение loader
            setShowLoader(false)
            return Promise.resolve();
        } else {
            // Если токена нет, возвращаем ошибку
            return Promise.reject();
        }
    },

    /**
     * Функция получения разрешений пользователя.
     */
    getPermissions: () => {
        const persistedUser = sessionStorage.getItem("user");
        const user = persistedUser ? JSON.parse(persistedUser) : [];

        if (user && user.role && user.role.permissions) {
            // Выключение loader
            setShowLoader(false);
            return Promise.resolve(user.role.permissions);
        } else {
            if (window.location.pathname !== '/login') {
                // Перенаправление на страницу авторизации
                setShowLoader(false); // Убедимся, что loader выключен до перенаправления
                window.location.replace('/login');
            } else {
                setShowLoader(false);
            }
            return Promise.reject();
        }
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
