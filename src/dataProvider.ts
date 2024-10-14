import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from "axios";
import queryString from "query-string";
import { URL_API } from "./settings";
import {
  DataProvider,
  GetListParams,
  GetManyParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
  DeleteManyParams,
  GetManyReferenceParams,
  UpdateManyParams,
  RaRecord,
  GetListResult,
  GetManyResult,
  GetOneResult,
  CreateResult,
  UpdateResult,
  DeleteResult,
  DeleteManyResult,
  GetManyReferenceResult,
  QueryFunctionContext,
  UpdateManyResult,
  Identifier,
} from "react-admin";
import { DataResponse } from "./interface/DataResponse";

// Создаём экземпляр axios
const apiClient = axios.create({
  // Устанавливаем базовый URL для всех запросов
  baseURL: URL_API,
  // Задаём заголовки по умолчанию
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавляем интерцептор для обработки запросов
apiClient.interceptors.request.use(
  // Функция, которая вызывается перед отправкой запроса
  (config: InternalAxiosRequestConfig) => {
    // Извлекаем токен из sessionStorage
    const token = sessionStorage.getItem("token");
    console.log("token", token);
    // Если токен существует, добавляем его в заголовки запроса
    if (token) {
      // Если заголовки отсутствуют, создаём их
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }
      // Устанавливаем токен для GraphQL
      (config.headers as AxiosRequestHeaders)["x-graphql-token"] = token;
      // Устанавливаем токен для авторизации
      (config.headers as AxiosRequestHeaders)["Authorization"] =
        `Bearer ${token}`;
    }
    // Возвращаем конфигурацию запроса с обновлёнными заголовками
    return config;
  },
  // Функция для обработки ошибок запроса
  (error) => Promise.reject(error),
);

// Интерцептор ответа для обработки ошибок
apiClient.interceptors.response.use(
  // Функция, которая вызывается при успешном ответе
  (response: AxiosResponse) => response,
  // Функция для обработки ошибок ответа
  (error) => {
    // Проверяем, есть ли ошибка в ответе
    if (error.response) {
      // Если статус ответа 401 (неавторизован), очищаем данные пользователя
      if (error.response.status === 401) {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("permissions");
      }
      // Если статус ответа не равен 200, выбрасываем ошибку с сообщением из ответа
      if (error.response.status !== 200) {
        throw new Error(error.response.data.errors.message);
      }
    }
    // Возвращаем отклонённый промис с ошибкой
    return Promise.reject(error);
  },
);

// Конфигурация dataProvider
export const dataProvider: DataProvider = {
  /**
   * Асинхронная функция для получения списка записей.
   * Обобщённый тип RecordType по умолчанию является DataResponse.
   *
   * @param resource Название ресурса, для которого выполняется запрос.
   * @param params Параметры для запроса, включая параметры пагинации, сортировки и фильтрации.
   * @returns Возвращает Promise, который разрешается в объект с отформатированными данными типа GetListResult<RecordType>.
   */
  getList: async <RecordType extends RaRecord = DataResponse>(
    resource: string, // Имя ресурса
    params: GetListParams & QueryFunctionContext, // Параметры для запроса списка записей
  ): Promise<GetListResult<RecordType>> => {
    // Возвращает Promise, который разрешается в результат типа GetListResult с обобщённым типом RecordType

    // Формирует параметры запроса
    const queryParam = {
      // Преобразуем параметры пагинации в строку JSON
      pagination: JSON.stringify(params.pagination),
      // Преобразуем параметры сортировки в строку JSON
      sort: JSON.stringify(params.sort),
      // Преобразуем фильтры в строку JSON
      filter: JSON.stringify(params.filter),
    };

    // Формируем URL для запроса, включая параметры
    const url = `${resource}?${queryString.stringify(queryParam)}`;
    // Выполняем запрос к API
    const responseClient = await apiClient.get(url);
    // Получаем заголовки ответа
    const headers = responseClient.headers;
    // Извлекаем значение заголовка `content-range`
    const contentRange = headers["content-range"] as string | undefined;
    // Обрабатываем данные из ответа
    const data = Array.isArray(responseClient.data)
      ? responseClient.data
      : [responseClient.data];

    // Форматируем данные, преобразуя `id` в строку
    const formattedData = data.map((item: DataResponse) => ({
      ...item, // Копируем все свойства из исходного объекта
      id: item.id ? item.id.toString() : null, // Преобразуем `id` в строку, если он существует
    })) as unknown as RecordType[]; // Приводим тип данных к типу `RecordType[]`, используя промежуточный тип `unknown`

    // Вычисляем общее количество записей из заголовка `content-range`, если он присутствует
    const total = contentRange
      ? parseInt(contentRange.split("/").pop() || "0", 10)
      : 0;

    // Возвращаем результат с отформатированными данными и общим количеством записей
    return {
      data: formattedData,
      total,
    };
  },

  /**
   * Асинхронная функция для получения множества записей.
   * Принимает обобщённый тип RecordType, по умолчанию DataResponse.
   *
   * @param resource Название ресурса, для которого выполняется запрос.
   * @param params Параметры для запроса, включая массив идентификаторов.
   *
   * @returns Возвращает Promise, который разрешается в объект с отформатированными данными типа GetManyResult<RecordType>.
   */
  getMany: async <RecordType extends RaRecord = DataResponse>(
    resource: string, // Название ресурса
    params: GetManyParams<RecordType>, // Параметры для запроса, типизированные RecordType
  ): Promise<GetManyResult<RecordType>> => {
    // Возвращает Promise, который разрешается в результат типа GetManyResult с обобщённым типом RecordType

    // Формирует URL для запроса, используя идентификаторы из params
    const url = `${resource}?${queryString.stringify({ id: params.ids })}`;
    // Выполняет GET-запрос по сформированному URL
    const response = await apiClient.get(url);
    // Приводит данные к массиву, если они не являются массивом
    const data = Array.isArray(response.data) ? response.data : [response.data];
    // Форматирует данные, преобразуя id в строку
    const formattedData = data.map((item: DataResponse) => ({
      ...item, // Копирует все свойства объекта
      id: item.id ? item.id.toString() : null, // Преобразует id в строку, если оно есть, иначе ставит null
    })) as unknown as RecordType[]; // Приведение типа данных к RecordType[]

    // Возвращает объект с отформатированными данными
    return {
      data: formattedData,
    };
  },

  /**
   * Асинхронная функция для получения одной записи по её идентификатору.
   * Обобщённый тип RecordType по умолчанию является DataResponse.
   *
   * @param resource Название ресурса, для которого выполняется запрос.
   * @param params Параметры запроса, включая идентификатор записи.
   * @returns Возвращает Promise, который разрешается в объект с данными типа GetOneResult<RecordType>.
   */
  getOne: async <RecordType extends RaRecord = DataResponse>(
    resource: string, // Название ресурса
    params: GetOneParams<RecordType>, // Параметры запроса, включающие идентификатор записи
  ): Promise<GetOneResult<RecordType>> => {
    // Возвращаемый результат типа GetOneResult<RecordType>

    // Формируем URL для запроса записи по идентификатору
    const url = `${resource}/${params.id}`;
    // Выполняем GET-запрос и получаем данные
    const { data } = await apiClient.get(url);

    // Возвращаем данные записи
    return {
      data,
    };
  },

  /**
   * Асинхронная функция для создания новой записи.
   * Обобщённый тип RecordType по умолчанию является DataResponse без поля 'id'.
   * Результат включает добавленное поле 'id' в тип RecordType.
   *
   * @param resource Название ресурса, для которого выполняется запрос на создание записи.
   * @param params Параметры запроса, включая данные для создания записи.
   * @returns Возвращает Promise, который разрешается в объект с данными типа CreateResult<RecordType & { id: Identifier }>.
   */
  create: async <RecordType extends Omit<RaRecord, "id"> = DataResponse>(
    resource: string, // Название ресурса
    params: CreateParams<RecordType>, // Параметры запроса, включая данные для создания записи
  ): Promise<CreateResult<RecordType & { id: Identifier }>> => {
    // Возвращаемый результат с добавленным полем 'id'

    // Формируем URL для запроса на создание записи
    const url = `${resource}`;
    // Выполняем POST-запрос и получаем данные
    const { data } = await apiClient.post(url, params.data);

    // Возвращаем данные записи с добавленным полем 'id'
    return {
      data: { ...data, id: data.id.toString() } as RecordType & {
        id: Identifier;
      },
    };
  },

  /**
   * Асинхронная функция для обновления существующей записи.
   * Обобщённый тип RecordType по умолчанию является DataResponse.
   *
   * @param resource Название ресурса, для которого выполняется запрос на обновление записи.
   * @param params Параметры запроса, включая идентификатор записи и данные для обновления.
   * @returns Возвращает Promise, который разрешается в объект с обновлёнными данными записи.
   */
  update: async <RecordType extends RaRecord = DataResponse>(
    resource: string, // Название ресурса
    params: UpdateParams<RecordType>, // Параметры запроса, включая идентификатор записи и данные для обновления
  ): Promise<UpdateResult<RecordType>> => {
    // Возвращаемый результат с обновлёнными данными записи

    // Формируем URL для запроса на обновление записи
    const url = `${resource}/${params.id}`;
    // Выполняем PUT-запрос и получаем обновлённые данные
    const { data } = await apiClient.put(url, params.data);

    // Возвращаем обновлённые данные записи
    return {
      data,
    };
  },

  /**
   * Асинхронная функция для удаления записи.
   * Обобщённый тип RecordType по умолчанию является DataResponse.
   *
   * @param resource Название ресурса, из которого нужно удалить запись.
   * @param params Параметры запроса, включая идентификатор записи и предыдущие данные.
   * @returns Возвращает Promise, который разрешается в объект с данными предыдущей записи или пустым объектом.
   */
  delete: async <RecordType extends RaRecord = DataResponse>(
    resource: string, // Название ресурса
    params: DeleteParams<RecordType>, // Параметры запроса, включая идентификатор записи и предыдущие данные
  ): Promise<DeleteResult<RecordType>> => {
    // Возвращаемый результат с данными предыдущей записи

    // Формируем URL для запроса на удаление записи
    const url = `${resource}/${params.id}`;
    // Выполняем DELETE-запрос для удаления записи
    await apiClient.delete(url);

    // Возвращаем данные предыдущей записи или пустой объект
    return {
      data: params.previousData || ({} as RecordType),
    };
  },

  /**
   * Асинхронная функция для удаления нескольких записей.
   * Обобщённый тип RecordType по умолчанию является DataResponse.
   *
   * @param resource Название ресурса, из которого нужно удалить записи.
   * @param params Параметры запроса, включая идентификаторы записей для удаления.
   * @returns Возвращает Promise, который разрешается в объект с массивом идентификаторов удалённых записей.
   */
  deleteMany: async <RecordType extends RaRecord = DataResponse>(
    resource: string, // Название ресурса
    params: DeleteManyParams<RecordType>, // Параметры запроса, включая идентификаторы записей для удаления
  ): Promise<DeleteManyResult<RecordType>> => {
    // Возвращаемый результат с массивом идентификаторов удалённых записей

    // Выполняем удаление каждой записи из списка идентификаторов
    await Promise.all(
      params.ids.map(async (id) => {
        const url = `${resource}/${id}`; // Формируем URL для запроса на удаление записи
        await apiClient.delete(url); // Выполняем DELETE-запрос для удаления записи
      }),
    );

    // Возвращаем массив идентификаторов удалённых записей
    return {
      data: params.ids,
    };
  },

  /**
   * Асинхронная функция для получения множества записей, связанных с указанным ресурсом.
   * Обобщённый тип RecordType по умолчанию является DataResponse.
   *
   * @param resource Название ресурса, для которого нужно получить связанные записи.
   * @param params Параметры запроса, включая параметры пагинации, сортировки и фильтрации.
   * @returns Возвращает Promise, который разрешается в объект с массивом записей и общим количеством записей.
   */
  getManyReference: async <RecordType extends RaRecord = DataResponse>(
    resource: string, // Название ресурса
    params: GetManyReferenceParams, // Параметры запроса, включая пагинацию, сортировку и фильтрацию
  ): Promise<GetManyReferenceResult<RecordType>> => {
    // Возвращаемый результат с массивом записей и общим количеством записей

    // Формируем параметры запроса
    const query = {
      pagination: JSON.stringify(params.pagination), // Параметры пагинации
      sort: JSON.stringify(params.sort), // Параметры сортировки
      filter: JSON.stringify(params.filter), // Параметры фильтрации
    };

    // Формируем URL для запроса
    const url = `${resource}?${queryString.stringify(query)}`;
    // Выполняем GET-запрос для получения данных
    const response = await apiClient.get(url);
    // Извлекаем заголовки из ответа
    const headers = response.headers;
    // Получаем заголовок 'content-range', который может содержать общее количество записей
    const contentRange = headers["content-range"] as string | undefined;
    // Форматируем полученные данные
    const data = Array.isArray(response.data) ? response.data : [response.data]; // Убедимся, что данные представляют собой массив

    // Преобразуем данные, добавляя идентификатор в виде строки
    const formattedData = data.map((item: DataResponse) => ({
      ...item, // Копируем все свойства объекта
      id: item.id ? item.id.toString() : null, // Преобразуем идентификатор в строку
    })) as unknown as RecordType[]; // Приводим тип к RecordType[]

    // Определяем общее количество записей на основе заголовка 'content-range'
    const total = contentRange
      ? parseInt(contentRange.split("/").pop() || "0", 10)
      : 0;

    // Возвращаем данные и общее количество записей
    return {
      data: formattedData, // Массив записей
      total, // Общее количество записей
    };
  },

  /**
   * Асинхронная функция для обновления нескольких записей в указанном ресурсе.
   * Обобщённый тип RecordType по умолчанию является DataResponse.
   *
   * @param resource Название ресурса, в котором нужно обновить записи.
   * @param params Параметры запроса, включая массив идентификаторов записей и данные для обновления.
   * @returns Возвращает Promise, который разрешается в объект с массивом идентификаторов обновлённых записей.
   */
  updateMany: async <RecordType extends RaRecord = DataResponse>(
    resource: string, // Название ресурса
    params: UpdateManyParams<RecordType>, // Параметры запроса, включая массив идентификаторов и данные для обновления
  ): Promise<UpdateManyResult<RecordType>> => {
    // Возвращаемый результат с массивом идентификаторов обновлённых записей

    // Выполняем параллельное обновление записей по каждому идентификатору
    await Promise.all(
      params.ids.map(async (id) => {
        const url = `${resource}/${id}`; // Формируем URL для запроса
        await apiClient.put(url, params.data); // Выполняем PUT-запрос для обновления записи
      }),
    );

    // Возвращаем массив идентификаторов обновлённых записей
    return {
      data: params.ids, // Массив идентификаторов обновлённых записей
    };
  },
};
