import { combineReducers } from "redux";
import menuReducer from "../features/menu/menuSlice";
// Импортируйте другие редьюсеры по мере необходимости

const rootReducer = combineReducers({
  menu: menuReducer,
  // другие редьюсеры
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
