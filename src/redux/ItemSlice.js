import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:null,
    stockQuantity:null,
    code:null,
    name:null,
    brand:null,
    model:null,
    origin:null,
    manufacturer:null,
    warehouseLocation:null,
    price: null,
    description:null
};

export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const {_id, stockQuantity, code, name, brand, model, origin, manufacturer, warehouseLocation, price, description } = action.payload;
            state._id = _id;
            state.stockQuantity = stockQuantity;
            state.code = code;
            state.name = name;
            state.brand = brand;
            state.model = model;
            state.origin = origin;
            state.manufacturer = manufacturer;
            state.warehouseLocation = warehouseLocation;
            state.price = price;
            state.description = description;
        },
        changeItem: (state, action) => {
            const { stockQuantity, code, name, brand, model, origin, manufacturer, warehouseLocation, price, description } = action.payload;
            
            state.stockQuantity = stockQuantity;
            state.code = code;
            state.name = name;
            state.brand = brand;
            state.model = model;
            state.origin = origin;
            state.manufacturer = manufacturer;
            state.warehouseLocation = warehouseLocation;
            state.price = price;
            state.description = description;
        },
        deleteClient:(state)=>{
            state._id = null;
            state.stockQuantity = null;
            state.code = null;
            state.name = null;
            state.brand = null;
            state.model = null;
            state.origin = null;
            state.manufacturer = null;
            state.warehouseLocation = null;
            state.price = null;
            state.description = null;

        },
    },
});

export const { addItem, changeItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;