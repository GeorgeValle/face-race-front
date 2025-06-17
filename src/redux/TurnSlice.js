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

export const turnSlice = createSlice({
    name: "turn",
    initialState,
    reducers: {
        addTurn: (state, action) => {
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
        changeTurn: (state, action) => {
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
        deleteTurn:(state)=>{
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

export const { addTurn, changeTurn, deleteTurn } = turnSlice.actions;
export default turnSlice.reducer;