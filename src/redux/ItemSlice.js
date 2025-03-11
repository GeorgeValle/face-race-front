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
        updatePrice: (state, action) =>{
            const {price} = action.payload;
            state.price = price;
        },
        subtractStock: (state, action) => {
            const { quantity } = action.payload;
            if (state.stockQuantity !== null && state.stockQuantity>0 && state.stockQuantity>=quantity) {
                state.stockQuantity - quantity
            }
        },
        deleteItem:(state)=>{
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

export const { addItem, changeItem, deleteItem, updatePrice, subtractStock } = itemSlice.actions;
export default itemSlice.reducer;