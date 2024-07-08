import "./Scss/app.scss"
import {
    Admin,
    Resource
} from "react-admin";
import {BrowserRouter} from 'react-router-dom';
import {dataProvider} from "./dataProvider";
import React, {useEffect, useState} from "react";
import {smetaninyTheme} from "./layout/Themes";
import Dashboard from "./Dashboard";
import Login from "./Login";
import i18nProvider from "./i18nProvider";
import Pages from './pages/Pages.jsx';
import GroupPermissions from './pages/GroupPermissions.jsx';
import Roles from './pages/Roles.jsx';
import authProvider from './authProvider';
import Loader from "./resource/components/Loader";

/**
 * Компонент App
 * @returns {Element}  возвращает элемент
 * @constructor
 */
export const App = () => {
    // Состояние для отображения загрузчика
    const [showLoader, setShowLoader] = useState(true);
    // Состояние для разрешений пользователя
    const [userPermissions, setUserPermissions] = useState([]);

    useEffect(() => {
        // Получение разрешений пользователя с помощью провайдера аутентификации
        authProvider(setShowLoader, setUserPermissions).getPermissions([])
            .then(permissions => {
                // Установка разрешений пользователя
                if (permissions) {
                    setUserPermissions(permissions);
                }
                // Скрытие загрузчика после загрузки разрешений
                setShowLoader(false);
            })
            .catch(e => {
                // Обработка ошибки, если не удалось получить разрешения
                console.error("Необходима авторизация!");
            });
    }, []);


    // Возвращаем основной контент приложения
    return <>
        <BrowserRouter>
            {showLoader && <Loader />}
            <Admin
                // Установка темы административной панели
                theme={smetaninyTheme}
                // Установка провайдера данных
                dataProvider={dataProvider}
                // Установка провайдера аутентификации
                authProvider={authProvider(setShowLoader, setUserPermissions)}
                // Установка провайдера локализации
                i18nProvider={i18nProvider}
                // Установка компонента приборной панели
                dashboard={Dashboard}
                // Установка страницы входа
                loginPage={Login}
                // Отключение телеметрии
                disableTelemetry
            >
                <Resource
                    // Установка имени ресурса
                    name="pages"
                    // Установка компонента списка
                    list={Pages(userPermissions).list}
                    // Установка компонента создания
                    create={Pages(userPermissions).create}
                    // Установка компонента редактирования
                    edit={Pages(userPermissions).edit}
                />
                <Resource
                    // Установка имени ресурса
                    name="roles"
                    // Установка компонента списка
                    list={Roles(userPermissions).list}
                    // Установка компонента создания
                    create={Roles(userPermissions).create}
                    // Установка компонента редактирования
                    edit={Roles(userPermissions).edit}
                />
                <Resource
                    // Установка имени ресурса
                    name="groupPermission"
                    // Установка компонента списка
                    list={GroupPermissions(userPermissions).list}
                    // Установка компонента создания
                    create={GroupPermissions(userPermissions).create}
                    // Установка компонента редактирования
                    edit={GroupPermissions(userPermissions).edit}
                />

                {/*<Resource*/}
                {/*    // Установка имени ресурса*/}
                {/*    name="permissions"*/}
                {/*    // Установка компонента списка*/}
                {/*    list={Permissions(userPermissions).list}*/}
                {/*    // Установка компонента создания*/}
                {/*    create={Permissions(userPermissions).create}*/}
                {/*    // Установка компонента редактирования*/}
                {/*    edit={Permissions(userPermissions).edit}*/}
                {/*/>*/}
            </Admin>
        </BrowserRouter>
        );
    </>
};
