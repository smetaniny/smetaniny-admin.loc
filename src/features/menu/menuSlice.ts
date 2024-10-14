import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_API } from "../../settings";

// Определение типа состояния
interface MenuItem {
  id: string;
  title: string;
  is_open: boolean;
  active: boolean;
  children?: MenuItem[];
}

interface MenuState {
  items: MenuItem[];
  menu_id: string | null;
}

// Изначальное состояние
const initialState: MenuState = {
  items: [],
  menu_id: null,
};

// Функция для обновления элемента меню на сервере
export const updateMenuItem = createAsyncThunk(
  "menu/updateMenuItem",
  async (item: MenuItem, { rejectWithValue }) => {
    try {
      await axios.put(`${URL_API}/pages/${item.id}`, item);
      return item;
    } catch (error) {
      return rejectWithValue("Failed to update menu item");
    }
  },
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<MenuItem[]>) {
      state.items = action.payload;
    },
    setMenuId(state, action: PayloadAction<string | null>) {
      state.menu_id = action.payload;
    },
    handleToggle(state, action: PayloadAction<string>) {
      const id = action.payload;
      const toggleItem = (items: MenuItem[], id: string): MenuItem[] => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, is_open: !item.is_open, active: true };
          } else if (item.children) {
            return { ...item, children: toggleItem(item.children, id) };
          } else {
            return item;
          }
        });
      };

      state.items = toggleItem(state.items, id);
    },
    handleContextMenu(state, action: PayloadAction<string>) {
      console.log("state", state);
      console.log("action", action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMenuItem.fulfilled, (state, action) => {
      const updatedItem = action.payload as MenuItem;
      const updateItems = (items: MenuItem[]): MenuItem[] => {
        return items.map((item) => {
          if (item.id === updatedItem.id) {
            return updatedItem;
          } else if (item.children) {
            return { ...item, children: updateItems(item.children) };
          } else {
            return item;
          }
        });
      };

      state.items = updateItems(state.items);
    });
  },
});

export const { setItems, setMenuId, handleToggle, handleContextMenu } =
  menuSlice.actions;
export default menuSlice.reducer;
