import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
// import "./global-shim";
// import "./scss/app.scss";
import { Admin, Resource, CustomRoutes } from "react-admin";
import { BrowserRouter } from "react-router-dom";
import { dataProvider } from "./dataProvider";
import { smetaninyTheme } from "./layout/Themes";
import Dashboard from "./Dashboard";
import Login from "./Login";
import i18nProvider from "./i18nProvider";
import GroupPermissions from "./resource/groupPermissions";
import Permissions from "./resource/permissions";
import Pages from "./resource/pages";
import authProvider from "./authProvider";
import Loader from "./resource/components/Loader";
import { Permission } from "./interface/Permission";
import Roles from "./resource/roles";
import { UsersAdminModule } from "./resource/usersAdmin/Contracts/UsersAdminModule";

// Определите компонент App
export const App = () => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [userPermissions, setUserPermissions] = useState<Permission[]>([]);
  const [UsersAdmin, setUsersAdmin] = useState<UsersAdminModule | null>(null);

  useEffect(() => {
    authProvider(setShowLoader, setUserPermissions)
      .getPermissions()
      .then((permissions) => {
        if (permissions) {
          setUserPermissions(permissions);
        }
        setShowLoader(false);
      })
      .catch((e) => {
        console.error("Error fetching permissions", e);
        setShowLoader(false);
      });
  }, []);

  useEffect(() => {
    // Динамически импортируйте модуль
    import("./resource/usersAdmin").then((module) => {
      setUsersAdmin(() => module.default as UsersAdminModule);
    });
  }, []);

  // Проверяем, что UsersAdmin не null перед вызовом
  const usersAdminComponents = UsersAdmin
    ? UsersAdmin(userPermissions)
    : {
        list: undefined,
        create: undefined,
        edit: undefined,
      };

  return (
    <BrowserRouter>
      {!showLoader && <Loader />}
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
          name="usersAdmin"
          list={usersAdminComponents.list}
          create={usersAdminComponents.create}
          edit={usersAdminComponents.edit}
        />
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
        <Resource
          name="permissions"
          list={Permissions(userPermissions).list}
          create={Permissions(userPermissions).create}
          edit={Permissions(userPermissions).edit}
        />
      </Admin>
    </BrowserRouter>
  );
};
