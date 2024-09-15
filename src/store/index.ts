import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/menu/menuSlice";
// Импортируйте другие редьюсеры по мере необходимости

const store = configureStore({
  reducer: {
    menu: menuReducer,
    // другие редьюсеры
  },
  // middleware: [], // Миддлвары по желанию
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
