import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import clientReducer from "./ClientSlice";
import supplierReduce from "./SupplierSlice";
import itemReduce from "./ItemSlice";
import shiftReduce from "./ShiftSlice"
import appointmentsListReduce from "./AppointmentsListSlice"
import itemsListReducer from "./ItemsListSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        client: clientReducer,
        supplier: supplierReduce,
        item: itemReduce,
        shift: shiftReduce,
        appointmentsList: appointmentsListReduce,
        itemsList: itemsListReducer
    },
});