import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import clientReducer from "./ClientSlice";
import supplierReduce from "./SupplierSlice";
import itemReduce from "./ItemSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        client: clientReducer,
        supplier: supplierReduce,
        item: itemReduce,
    },
});