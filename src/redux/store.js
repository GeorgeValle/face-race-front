import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import clientReducer from "./ClientSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        client: clientReducer
    },
});