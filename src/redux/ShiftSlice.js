import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:null,
    shiftDate:null,
    timeSlot:null,
    person:null,
    phone:null,
    email:null,
    dni:null,
    status:null,
    description:null
};

export const shiftSlice = createSlice({
    name: "shift",
    initialState,
    reducers: {
        addShift: (state, action) => {
            const {_id, person,phone, email, dni, shiftDate, timeSlot,status,description} = action.payload;

            state._id = _id;
            state.person = person;
            state.phone = phone;
            state.email = email;
            state.dni = dni;
            state.shiftDate = shiftDate;
            state.timeSlot = timeSlot;
            state.status = status;
            state.description = description;
            
        },
        changeShift: (state, action) => {
            const { person,phone, email, dni, shiftDate, timeSlot,status, description } = action.payload;
        
            state.shiftDate = shiftDate;
            state.timeSlot = timeSlot;
            state.person = person;
            state.phone = phone;
            state.email = email;
            state.dni = dni;
            state.status = status;
            state.description = description;
        },
        deleteShift:(state)=>{
            state._id=null;
            state.client=null;
            state.shiftDate=null;
            state.timeSlot=null;
            state.person=null;
            state.phone=null;
            state.email=null;
            state.dni=null;
            state.status=null;
            state.description=null;
        },
    },
});

export const { addShift, changeShift, deleteShift } = shiftSlice.actions;
export default shiftSlice.reducer;