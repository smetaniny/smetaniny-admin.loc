// Самовызывающаяся функция (IIFE) создает локальную область видимости,
// чтобы избежать конфликтов с глобальными переменными.
(function () {
  // Проверяем, существует ли переменная `global`.
  // Если `global` не определена, создаем её и указываем, что это глобальный объект `window`.
  if (typeof global === "undefined") {
    window.global = window;
  }
  // После выполнения функция завершает работу, её переменные больше не доступны глобально.
})();
