import "./Scss/app.scss"
import {
    Admin,
    Resource
} from "react-admin";
import {BrowserRouter} from 'react-router-dom';


import {authProvider} from "./authProvider";
import i18nProvider from "./i18nProvider";
import {dataProvider} from "./dataProvider";
import React, {useEffect, useState} from "react";
import {smetaninyTheme} from "./layout/Themes";
import Loader from "./components/Loader";
import Dashboard from "./Dashboard";

import { ListPages } from './pages/Pages.jsx';

export const App = () => {
    const [showLoader, setShowLoader] = useState(true);

    return <>
        {showLoader && <Loader />}
        <BrowserRouter>
            <Admin
                theme={smetaninyTheme}
                dataProvider={dataProvider}
                authProvider={authProvider(setShowLoader)}
                i18nProvider={i18nProvider}
                dashboard={Dashboard}
                disableTelemetry
            >
                <Resource
                    name="pages"
                    list={ListPages}
                    // edit={EditPage}
                    // show={ShowPage}
                />
            </Admin>
        </BrowserRouter>
    </>
};
