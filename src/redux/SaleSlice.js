import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:null,
    saleNumber:null,
    payment:null,
    itemList:null,
    description:null,
    saleDate:null,
    saleTime:null,
    paid:null,
    client:null,
};

export const saleSlice = createSlice({
    name: "sale",
    initialState,
    reducers:{
        addSale: (state, action)=>{
            const {_id, saleNumber, payment, itemList, description, saleDate, saleTime, paid, client} = action.payload;
            state._id = _id;
            state.saleNumber = saleNumber,
            state.payment = payment;
            state.itemList = itemList;
            state.description = description;
            state.saleDate = saleDate;
            state.saleTime = saleTime;
            state.paid = paid;
            state.client = client;
        },
        resetSale: (state) => {
            state = initialState;
        },
        changeSale:(state, action)=>{
            const {saleNumber, payment, itemList, description, saleDate, SaleTime, paid, client}= action.payload;
            state.saleNumber = saleNumber;
            state.payment = payment;
            state.itemList = itemList;
            state.description = description;
            state.saleDate = saleDate;
            state.saleTime = SaleTime;
            state.paid = paid;
            state.client = client;
        }
    }
});

export const {addSale, resetSale, changeSale}= saleSlice.actions;
export default saleSlice.reducer;