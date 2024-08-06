// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useEffect, useState} from "react";
import "./scss/app.scss"
import {
    Admin,
    Resource
} from "react-admin";
import {BrowserRouter} from 'react-router-dom';
import {dataProvider} from "./dataProvider";
import {smetaninyTheme} from "./layout/Themes";
import Dashboard from "./Dashboard";
import Login from "./Login";
import i18nProvider from "./i18nProvider";
import Pages from './pages/Pages.jsx';
import GroupPermissions from './pages/GroupPermissions.jsx';
import Roles from './pages/Roles.jsx';
import authProvider from './authProvider';
import Loader from "./resource/components/Loader";
import {Permission} from "./interface/Permission";

/**
 * Компонент App
 * @returns {Element}  возвращает элемент
 * @constructor
 */

export const App = () => {
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [userPermissions, setUserPermissions] = useState<Permission[]>([]);

    useEffect(() => {
        authProvider(setShowLoader, setUserPermissions).getPermissions()
            .then((permissions) => {
                if (permissions) {
                    setUserPermissions(permissions);
                }
                setShowLoader(false);
            })
            .catch(e => {
                console.error('e', e);
            });
    }, []);

    return (
        <BrowserRouter>
            {showLoader && <Loader />}
            <Admin
                theme={smetaninyTheme}
                dataProvider={dataProvider}
                authProvider={authProvider(setShowLoader, setUserPermissions)}
                i18nProvider={i18nProvider}
                dashboard={Dashboard}
                loginPage={Login}
                disableTelemetry
            >
                <Resource
                    name="pages"
                    list={Pages(userPermissions).list}
                    create={Pages(userPermissions).create}
                    edit={Pages(userPermissions).edit}
                />
                <Resource
                    name="roles"
                    list={Roles(userPermissions).list}
                    create={Roles(userPermissions).create}
                    edit={Roles(userPermissions).edit}
                />
                <Resource
                    name="groupPermission"
                    list={GroupPermissions(userPermissions).list}
                    create={GroupPermissions(userPermissions).create}
                    edit={GroupPermissions(userPermissions).edit}
                />
                {/*<Resource*/}
                {/*    name="permissions"*/}
                {/*    list={Permissions(userPermissions).list}*/}
                {/*    create={Permissions(userPermissions).create}*/}
                {/*    edit={Permissions(userPermissions).edit}*/}
                {/*/>*/}
            </Admin>
        </BrowserRouter>
    );
};
