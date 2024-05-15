import { URL_API } from "./settings";
import axios from 'axios';
import queryString from 'query-string';

// В коде комментарии будут в именительном падеже
const apiClient = axios.create({
    // базовый URL для API
    baseURL: URL_API,
    // заголовки запроса
    headers: {
        // Устанавливаем тип контента
        'Content-Type': 'application/json',
    },
});

// Интерсептор для обработки запросов
apiClient.interceptors.request.use(config => {
    // Получаем токен из sessionStorage
    const token = sessionStorage.getItem("token");
console.log('token', token);
    // Если токен есть, добавляем его к заголовкам запроса
    if (token) {
        config.headers['x-graphql-token'] = token;
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

// Интерсептор для обработки ответов
apiClient.interceptors.response.use(
    // Обработка успешного ответа
    response => {
        // Добавить здесь логику обработки успешных ответов, если необходимо
        return response;
    },
    // Обработка ошибки
    error => {
        if (error.response && error.response.status === 401) {
            // Удаляем данные пользователя
            sessionStorage.removeItem("user");
            //  Удаляем токен
            sessionStorage.removeItem("token");
            //  Удаляем разрешения
            sessionStorage.removeItem("permissions");
        }
        // Если получен ответ с кодом 500
        if (error.response && error.response.status !== 200) {
            // Бросить ошибку с текстом ошибки из ответа
            throw new Error(error.response.data.errors);
        }
        // Продолжить передачу ошибки, если она не связана со статусом 500
        return Promise.reject(error);
    }
);

// Конфигурация провайдера данных
export const dataProvider = {
    // Метод для получения списка ресурсов
    getList: async (resource, params) => {
        const query = {
            pagination: JSON.stringify(params.pagination),
            sort: JSON.stringify(params.sort),
            filter: JSON.stringify(params.filter),
        };

        let url = `${resource}?${queryString.stringify(query)}`;

        // Выполняем GET-запрос к API
        const response = await apiClient.get(url);

        // Получаем заголовки ответа
        const headers = response.headers;
        // Получаем значение заголовка 'X-Total-Count'
        const totalCount = headers.get('X-Total-Count');

        // Получаем значение заголовка 'Content-Range'
        const contentRange = headers.get('Content-Range');

        // Преобразуем данные ответа в массив, если они не являются таковыми
        const data = Array.isArray(response.data) ? response.data : [response.data];

        // Форматируем данные, добавляя к каждому элементу идентификатор
        const formattedData = data.map(item => ({...item, id: item.id ? item.id.toString() : null}));

        // Возвращаем отформатированные данные и общее количество записей
        return {
            data: formattedData,
            total: parseInt(contentRange.split('/').pop(), 10),
        };
    },

    // Получение множества ресурсов
    getMany: async (resource, params) => {
        // Формирование URL для запроса, включая параметры запроса
        const url = `${resource}?${queryString.stringify({id: params.ids})}`;
        // Отправка GET запроса к API
        const response = await apiClient.get(url);
        // Проверка на массив данных в ответе, если не массив - преобразование в массив
        const data = Array.isArray(response.data) ? response.data : [response.data];
        // Форматирование данных, включая преобразование id в строку, если необходимо
        const formattedData = data.map(item => ({...item, id: item.id ? item.id.toString() : null}));
        // Возврат отформатированных данных
        return {
            data: formattedData,
        };
    },

    // Получение одного ресурса
    getOne: async (resource, params) => {
        // Формирование URL для запроса, включая идентификатор ресурса
        const url = `${resource}/${params.id}`;
        // Отправка GET запроса к API и извлечение данных из ответа
        const {data} = await apiClient.get(url);
        // Возврат полученных данных
        return {
            data: data,
        };
    },

    // Создание нового ресурса
    create: async (resource, params) => {
        // Формирование URL для запроса
        const url = `${resource}`;
        // Отправка POST запроса к API с данными для создания ресурса
        const {data} = await apiClient.post(url, params.data);
        // Возврат данных созданного ресурса с присвоенным идентификатором
        return {
            data: {...data, id: data.id},
        };
    },

    // Обновление ресурса
    update: async (resource, params) => {
        // Формирование URL для запроса, включая идентификатор ресурса
        const url = `${resource}/${params.id}`;
        // Отправка PUT запроса к API с обновленными данными ресурса
        const {data} = await apiClient.put(url, params);
        // Возврат обновленных данных ресурса
        return {
            data: data,
        };
    },

    // Удаление ресурса
    delete: async (resource, params) => {
        // Формирование URL для запроса, включая идентификатор ресурса
        const url = `${resource}/${params.id}`;
        // Отправка DELETE запроса к API для удаления ресурса
        await apiClient.delete(url);
        // Возврат предыдущих данных ресурса (до удаления)
        return {
            data: params.previousData,
        };
    },

    // Массовое удаление ресурсов
    deleteMany: async (resource, params) => {
        // Извлечение идентификаторов ресурсов из параметров запроса
        const {ids} = params;
        // Асинхронное удаление каждого ресурса по его идентификатору
        await Promise.all(ids.map(async (id) => {
            // Формирование URL для запроса, включая идентификатор ресурса
            const url = `${resource}/${id}`;
            // Отправка DELETE запроса к API для удаления ресурса
            await apiClient.delete(url);
        }));
        // Возврат идентификаторов удаленных ресурсов
        return {
            data: ids,
        };
    },
};
