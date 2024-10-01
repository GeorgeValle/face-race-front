import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: null,
    email: null,
    name: null,
    surname:null,
    role: null,
    access:false,
    error:null,
    loading:false,
    
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {_id, email, name, surname, role, access, error, loading} = action.payload;
            state._id = _id;
            state.email = email;
            state.name = name;
            state.surname = surname;
            state.role = role;
            state.access = access;
            state.error = error;
            state.loading = loading;
        },
        changeEmail: (state, action) => {
            state.email = action.payload;
        },
        deleteUser:(state)=>{
            state._id = null;
            state.email = null;
            state.name = null;
            state.surname = null;
            state.role = null;
            state.access = false;
            state.error = null;
            state.loading = false;
        },
    },
});

export const { addUser, changeEmail, deleteUser } = userSlice.actions;
export default userSlice.reducer;