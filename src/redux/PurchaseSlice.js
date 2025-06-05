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
    status:null
};

export const purchaseSlice = createSlice({
    name: "purchase",
    initialState,
    reducers:{
        addPurchase: (state, action)=>{
            const {_id, purchaseNumber, payment, itemList, description, purchaseDate,  paid, supplier, status} = action.payload;
            state._id = _id;
            state.purchaseNumber = purchaseNumber;
            state.payment = payment;
            state.itemList = itemList;
            state.description = description;
            state.purchaseDate = purchaseDate;            
            state.paid = paid;
            state.supplier = supplier;
            state.status = status;
        },
        resetPurchase: (state) => {
            state = initialState;
        },
        changePurchase:(state, action)=>{
            const {purchaseNumber, payment, itemList, description, purchaseDate, paid, supplier, status}= action.payload;
            state.purchaseNumber = purchaseNumber;
            state.payment = payment;
            state.itemList = itemList;
            state.description = description;
            state.purchaseDate = purchaseDate;            
            state.paid = paid;
            state.supplier = supplier;
            state.status = status;
        },
        toggleChecked: (state, action) => {
            const { code } = action.payload; // code item
            const item = state.itemList.find(item => item.code === code); // find item
            if (item) {
                item.checked = !item.checked; // change checked status
            }
        }

    }
});

export const {addPurchase, resetPurchase, changeSPurchase, toggleChecked}= purchaseSlice.actions;
export default purchaseSlice.reducer; 