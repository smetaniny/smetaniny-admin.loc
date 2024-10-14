import React from "react";
import { App } from "./App";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";

export const ReactAdmin = () => {
    return (
        <React.StrictMode>
            <DevSupport
                ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}
            >
                <App />
            </DevSupport>
        </React.StrictMode>
    );
};

