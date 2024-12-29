import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:null,
    email:null,
    dni:null,
    name:null,
    surname:null,
    address:null,
    city:null,
    province:null,
    postalCode:null,
    phone:null,
    cel:null,
    description:null
    
};

export const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        addClient: (state, action) => {
            const {_id, email, dni, name, surname,address,city,province, postalCode, phone, cel, description } = action.payload;
            state._id = _id;
            state.email = email;
            state.dni = dni;
            state.name = name;
            state.surname = surname;
            state.address = address;
            state.city = city;
            state.province = province;
            state.postalCode = postalCode;
            state.phone = phone;
            state.cel = cel;
            state.description = description;
        },
        changeClient: (state, action) => {
            const { email, dni, name, surname,address,city,province, postalCode, phone, cel, description } = action.payload;
            
            state.email = email;
            state.dni = dni;
            state.name = name;
            state.surname = surname;
            state.address = address;
            state.city = city;
            state.province = province;
            state.postalCode = postalCode;
            state.phone = phone;
            state.cel = cel;
            state.description = description;
        },
        deleteClient:(state)=>{
            state._id=null;
            state.email=null;
            state.dni=null;
            state.name=null;
            state.surname=null;
            state.address=null;
            state.city=null;
            state.province=null;
            state.postalCode=null;
            state.phone= null;
            state.cel= null;
            state.description=null;

        },
    },
});

export const { addClient, changeClient, deleteClient } = clientSlice.actions;
export default clientSlice.reducer;