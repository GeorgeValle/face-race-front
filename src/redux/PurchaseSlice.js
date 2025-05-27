import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:null,
    purchaseNumber:null,
    payment:null,
    itemList:null,
    description:null,
    purchaseDate:null,
    paid:null,
    supplier:null,
};

export const purchaseSlice = createSlice({
    name: "purchase",
    initialState,
    reducers:{
        addPurchase: (state, action)=>{
            const {_id, purchaseNumber, payment, itemList, description, purchaseDate,  paid, supplier} = action.payload;
            state._id = _id;
            state.purchaseNumber = purchaseNumber;
            state.payment = payment;
            state.itemList = itemList;
            state.description = description;
            state.purchaseDate = purchaseDate;            
            state.paid = paid;
            state.supplier = supplier;
        },
        resetPurchase: (state) => {
            state = initialState;
        },
        changePurchase:(state, action)=>{
            const {purchaseNumber, payment, itemList, description, purchaseDate, paid, supplier}= action.payload;
            state.purchaseNumber = purchaseNumber;
            state.payment = payment;
            state.itemList = itemList;
            state.description = description;
            state.purchaseDate = purchaseDate;            
            state.paid = paid;
            state.supplier = supplier;
        }
    }
});

export const {addPurchase, resetPurchase, changeSPurchase}= purchaseSlice.actions;
export default purchaseSlice.reducer; 