import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    email: "",
    name: "",
    surname:"",
    role: "",
    access:false,
    
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {_id, email, name, surname, role, access} = action.payload;
            state._id = _id;
            state.email = email;
            state.name = name;
            state.surname = surname;
            state.role = role;
            state.access = access;
        },
        changeEmail: (state, action) => {
            state.email = action.payload;
        },
    },
});

export const { addUser, changeEmail } = userSlice.actions;
export default userSlice.reducer;