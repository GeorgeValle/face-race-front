import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const itemsListSlice = createSlice({
    name: "itemsList",
    initialState,
    reducers: {
        addItems: (state, action) => {
            const existingItem = state.find(item => item.code === action.payload.code);
            if (existingItem) {
                // Si el item ya existe, suma la cantidad
                existingItem.quantity += action.payload.quantity;
            } else {
                // Si no existe, agrega el nuevo item
                state.push(action.payload);
            }
        },
        removeItem: (state, action) => {
            return state.filter(item => item.code !== action.payload); // Elimina el item por código
        },
        
        clearItems: (state) => {
            return []; // Borra todo el contenido del array
        },
        updateItemQuantity: (state, action) => {
            const { code, quantity } = action.payload;
            const existingItem = state.find(item => item.code === code);
            if (existingItem) {
                existingItem.quantity = quantity; // Actualiza la cantidad del item
            }
        }
    },
});

export const { addItems, removeItem, clearItems, updateItemQuantity } = itemsListSlice.actions;
export default itemsListSlice.reducer;