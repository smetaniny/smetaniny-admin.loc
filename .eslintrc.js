module.exports = {
    env: {
        browser: true, // Определяет глобальные переменные, доступные в браузере
        es2021: true, // Определяет глобальные переменные для ECMAScript 2021
        node: true, // Определяет глобальные переменные для Node.js
    },
    parser: '@typescript-eslint/parser', // Устанавливает парсер для TypeScript
    parserOptions: {
        ecmaVersion: 2021, // Версия ECMAScript, которую следует использовать (можно указать 'latest')
        sourceType: 'module', // Разрешает использование модулей ECMAScript
    },
    extends: [
        'eslint:recommended', // Использует рекомендованные правила ESLint
        'plugin:react/recommended', // Использует рекомендованные правила для React
        'plugin:react-hooks/recommended', // Использует рекомендованные правила для React Hooks
        '@typescript-eslint/recommended', // Использует рекомендованные правила для TypeScript
        'prettier', // Включает правила Prettier для форматирования кода
    ],
    plugins: [
        '@typescript-eslint', // Плагин для TypeScript
        'react', // Плагин для React
        'react-hooks', // Плагин для React Hooks
        'simple-import-sort', // Плагин для сортировки импортов
        'import', // Плагин для проверки правильности импортов
    ],
    rules: {
        // Ваши кастомные правила здесь
        'semi': ['error', 'always'], // Требует точку с запятой в конце каждого выражения
        'quotes': ['error', 'single'], // Требует использования одинарных кавычек для строк
        'indent': ['error', 2], // Требует отступ в 2 пробела
        'max-len': ['warn', { 'code': 80 }], // Предупреждение, если длина строки превышает 80 символов
        'no-console': 'warn', // Предупреждение при использовании console.log
        'complexity': ['warn', { 'max': 10 }], // Предупреждение, если сложность функции превышает 10
        'eqeqeq': ['error', 'always'], // Требует использование === и !== вместо == и !=
        'no-use-before-define': ['error', { 'functions': false, 'classes': true }], // Запрет на использование переменных перед их объявлением
        'simple-import-sort/imports': 'error', // Включает правило для сортировки импортов
        'import/order': ['error', { 'newlines-between': 'always' }], // Включает правило для порядка импортов
        'react/prop-types': 'off', // Отключает проверку типов пропсов в React (если используется TypeScript)
        'react/react-in-jsx-scope': 'off', // Отключает требование импорта React в файлах с JSX (актуально для новых версий React)
        'camelcase': 'error', // Требует использование camelCase для именования переменных и функций
        'comma-dangle': ['error', 'always-multiline'], // Требует запятую в последнем элементе массивов и объектов
        'eol-last': ['error', 'always'], // Требует новую строку в конце файла
        'func-call-spacing': ['error', 'never'], // Запрещает пробелы между именем функции и вызывающими скобками
        'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }], // Требует консистентные пробелы между ключами и значениями в объектах
        'keyword-spacing': ['error', { 'before': true, 'after': true }], // Требует пробелы перед и после ключевых слов
        'linebreak-style': ['error', 'unix'], // Требует стиль перевода строк Unix
        'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 2 }], // Требует новой строки после каждого вызова метода в цепочке
        'no-multiple-empty-lines': ['error', { 'max': 1 }], // Запрещает несколько пустых строк
        'no-trailing-spaces': 'error', // Запрещает завершающие пробелы
        'object-curly-spacing': ['error', 'always'], // Требует пробелы внутри фигурных скобок
        'space-before-blocks': ['error', 'always'], // Требует пробел перед блоками
        'space-before-function-paren': ['error', 'never'], // Запрещает пробел перед именами функций
        'space-in-parens': ['error', 'never'], // Запрещает пробелы внутри круглых скобок
        'space-infix-ops': 'error', // Требует пробелы вокруг операторов
        'spaced-comment': ['error', 'always', { 'exceptions': ['-'] }], // Требует пробелы после // или /* в комментариях
        'curly': ['error', 'all'], // Требует фигурные скобки для всех блоков
        'default-case': 'error', // Требует секцию default в switch
        'dot-notation': ['error', { 'allowKeywords': true }], // Требует использования точечной нотации при доступе к свойствам
        'no-eval': 'error', // Запрещает использование eval()
        'no-extend-native': 'error', // Запрещает расширение встроенных объектов
        'no-implicit-globals': 'error', // Запрещает объявления глобальных переменных
        'no-implied-eval': 'error', // Запрещает неявное использование eval()
        'no-loop-func': 'error', // Запрещает объявления функций в циклах
        'no-magic-numbers': ['warn', { 'ignore': [0, 1] }], // Предупреждение при использовании "магических чисел" (чисел, использованных без объяснений)
        'no-new-wrappers': 'error', // Запрещает создание объектов оберток
        'no-proto': 'error', // Запрещает использование __proto__
        'no-return-assign': ['error', 'always'], // Запрещает присваивание в возвращаемых выражениях
        'no-script-url': 'error', // Запрещает использование javascript: URL
        'no-self-compare': 'error', // Запрещает сравнение переменной с самой собой
        'no-sequences': 'error', // Запрещает использование последовательностей
        'no-throw-literal': 'error', // Запрещает бросание литеральных исключений
        'no-unused-expressions': 'error', // Запрещает неиспользуемые выражения
        'no-useless-concat': 'error', // Запрещает ненужное конкатенирование строк
        'no-useless-escape': 'error', // Запрещает ненужные экранирования
        'radix': 'error', // Требует указание основания для parseInt()
        'yoda': ['error', 'never'], // Запрещает "йодированный" стиль условий
    },
    settings: {
        react: {
            version: 'detect', // Автоматически определяет версию React
        },
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'], // Правила, специфичные для файлов TypeScript
            rules: {
                '@typescript-eslint/no-unused-vars': ['error'], // Запрещает неиспользуемые переменные в TypeScript
                '@typescript-eslint/explicit-module-boundary-types': 'off', // Отключает требование явного указания типов возвращаемых значений функций
            },
        },
        {
            files: ['*.js', '*.jsx'], // Правила, специфичные для файлов JavaScript
            rules: {
                'no-var': 'error', // Запрещает использование var, рекомендуется использовать let или const
                'prefer-const': 'error', // Рекомендует использование const вместо let, если переменная не изменяется
            },
        },
    ],
};
