import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const itemsListSlice = createSlice({
    name: "itemsList",
    initialState,
    reducers: {
        addItems: (state, action) => {
            const existingItem = state.find(item => item.code === action.payload.code);
            if (existingItem) {
                let stock = parseInt(existingItem.quantity)
                // If the item exist, sum the quantity. 
                existingItem.quantity = stock + parseInt(action.payload.quantity);
            } else {
                // If dont exist, add the new item
                state.push(action.payload);
            }
        },
        removeItem: (state, action) => {
            return state.filter(item => item.code !== action.payload); // delete item for code
        },
        
        clearItems: (state) => {
            return []; // delete all content of array
        },
        updateItemQuantity: (state, action) => {
            const { code, quantity } = action.payload;
            const existingItem = state.find(item => item.code === code);
            if (existingItem) {
                //let stock =parseInt(quantity)
                existingItem.quantity =  parseInt(quantity); // update the quantity of item
            }
        }
    },
});

export const { addItems, removeItem, clearItems, updateItemQuantity } = itemsListSlice.actions;
export default itemsListSlice.reducer;