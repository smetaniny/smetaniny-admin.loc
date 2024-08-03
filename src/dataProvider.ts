import axios, {InternalAxiosRequestConfig, AxiosResponse, AxiosRequestHeaders} from 'axios';
import queryString from 'query-string';
import { URL_API } from './settings';
import { DataProvider, GetListParams, GetManyParams, GetOneParams, CreateParams, UpdateParams, DeleteParams, DeleteManyParams, GetManyReferenceParams, UpdateManyParams, RaRecord } from 'react-admin';

// Создаём экземпляр axios
const apiClient = axios.create({
    baseURL: URL_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерцептор запроса для добавления заголовков авторизации
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            if (!config.headers) {
                config.headers = {} as AxiosRequestHeaders;
            }
            (config.headers as AxiosRequestHeaders)['x-graphql-token'] = token;
            (config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Интерцептор ответа для обработки ошибок
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('permissions');
            }
            if (error.response.status !== 200) {
                throw new Error(error.response.data.errors);
            }
        }
        return Promise.reject(error);
    }
);

// Конфигурация dataProvider
export const dataProvider: DataProvider = {
    getList: async (resource: string, params: GetListParams) => {
        const query = {
            pagination: JSON.stringify(params.pagination),
            sort: JSON.stringify(params.sort),
            filter: JSON.stringify(params.filter),
        };
        const url = `${resource}?${queryString.stringify(query)}`;
        const response = await apiClient.get(url);

        const headers = response.headers;
        const contentRange = headers['content-range'] as string | undefined;

        const data = Array.isArray(response.data) ? response.data : [response.data];
        const formattedData = data.map((item: any) => ({ ...item, id: item.id ? item.id.toString() : null }));

        const total = contentRange ? parseInt(contentRange.split('/').pop() || '0', 10) : 0;

        return {
            data: formattedData,
            total,
        };
    },

    getMany: async (resource: string, params: GetManyParams) => {
        const url = `${resource}?${queryString.stringify({ id: params.ids })}`;
        const response = await apiClient.get(url);
        const data = Array.isArray(response.data) ? response.data : [response.data];
        const formattedData = data.map((item: any) => ({ ...item, id: item.id ? item.id.toString() : null }));

        return {
            data: formattedData,
        };
    },

    getOne: async (resource: string, params: GetOneParams) => {
        const url = `${resource}/${params.id}`;
        const { data } = await apiClient.get(url);

        return {
            data,
        };
    },

    create: async (resource: string, params: CreateParams) => {
        const url = `${resource}`;
        const { data } = await apiClient.post(url, params.data);

        return {
            data: { ...data, id: data.id },
        };
    },

    update: async (resource: string, params: UpdateParams) => {
        const url = `${resource}/${params.id}`;
        const { data } = await apiClient.put(url, params.data);

        return {
            data,
        };
    },

    delete: async (resource: string, params: DeleteParams) => {
        const url = `${resource}/${params.id}`;
        await apiClient.delete(url);

        return {
            data: params.previousData as any,
        };
    },

    deleteMany: async (resource: string, params: DeleteManyParams<RaRecord>) => {
        await Promise.all(params.ids.map(async (id) => {
            const url = `${resource}/${id}`;
            await apiClient.delete(url);
        }));

        return {
            data: params.ids,
        };
    },

    getManyReference: async (resource: string, params: GetManyReferenceParams) => {
        const query = {
            pagination: JSON.stringify(params.pagination),
            sort: JSON.stringify(params.sort),
            filter: JSON.stringify(params.filter),
        };
        const url = `${resource}?${queryString.stringify(query)}`;
        const response = await apiClient.get(url);

        const headers = response.headers;
        const contentRange = headers['content-range'] as string | undefined;

        const data = Array.isArray(response.data) ? response.data : [response.data];
        const formattedData = data.map((item: any) => ({ ...item, id: item.id ? item.id.toString() : null }));

        const total = contentRange ? parseInt(contentRange.split('/').pop() || '0', 10) : 0;

        return {
            data: formattedData,
            total,
        };
    },

    updateMany: async (resource: string, params: UpdateManyParams<RaRecord>) => {
        await Promise.all(params.ids.map(async (id) => {
            const url = `${resource}/${id}`;
            await apiClient.put(url, params.data);
        }));

        return {
            data: params.ids,
        };
    },
};
