import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:null,
    code:null,
    name:null,
    stockQuantity:null,
    price: null,
    category:null,
    brand:null,
    model:null,
    origin:null,
    warehouseLocation:null,
    description:null
};

export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const {_id, stockQuantity, code, name, brand, model, origin, category, warehouseLocation, price, description } = action.payload;
            state._id = _id;
            state.code = code;
            state.name = name;
            state.stockQuantity = stockQuantity;
            state.price = price;
            state.category = category;
            state.brand = brand;
            state.model = model;
            state.origin = origin;
            state.warehouseLocation = warehouseLocation;
            state.description = description;
            
        },
        changeItem: (state, action) => {
            const { stockQuantity, code, name, brand, model, origin, category, warehouseLocation, price, description } = action.payload;
            
            
            state.code = code;
            state.name = name;
            state.stockQuantity = stockQuantity;
            state.price = price;
            state.category = category;
            state.brand = brand;
            state.model = model;
            state.origin = origin;
            state.warehouseLocation = warehouseLocation;
            state.description = description;
        },
        deleteClient:(state)=>{
            state._id = null;
            state.code = null;
            state.name = null;
            state.stockQuantity = null;
            state.price = null;
            state.category = null;
            state.brand = null;
            state.model = null;
            state.origin = null;
            state.warehouseLocation = null;
            state.description = null;

        },
    },
});

export const { addItem, changeItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;