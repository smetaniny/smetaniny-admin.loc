import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

// Поиск элемента с id "root"
const rootElement = document.getElementById("root");

if (rootElement) {
    // Если элемент найден, создаём корневой элемент React и рендерим приложение
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    // Обработка случая, когда элемент с id "root" не найден
    console.error('Element with id "root" not found');
}
