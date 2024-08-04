module.exports = {
    "extends": [
        "eslint:recommended", // Подключает рекомендованные правила ESLint
        "plugin:react/recommended", // Подключает рекомендованные правила для React
        "plugin:react/jsx-runtime", // Подключает правила для JSX Runtime (React 17+)
        "plugin:react-hooks/recommended", // Подключает рекомендованные правила для хуков React
        "plugin:@typescript-eslint/recommended", // Подключает рекомендованные правила для TypeScript
        "prettier" // Подключает Prettier для форматирования кода, отключает конфликтующие правила ESLint
    ],
    "parser": "@typescript-eslint/parser", // Устанавливает парсер для TypeScript
    "plugins": ["@typescript-eslint"], // Добавляет плагин для TypeScript
    "env": {
        "browser": true, // Устанавливает глобальные переменные для браузера
        "es2021": true // Включает поддержку глобальных переменных ECMAScript 2021
    },
    "settings": {
        "react": {
            "version": "detect" // Автоматически определяет версию React для правил ESLint
        }
    },
    "rules": {
        "no-unused-vars": "off", // Отключает правило no-unused-vars для JavaScript (так как используется TypeScript)
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
        // Включает правило no-unused-vars для TypeScript, игнорирует аргументы, начинающиеся с _
    }
}
