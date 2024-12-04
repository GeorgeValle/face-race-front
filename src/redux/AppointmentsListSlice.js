import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list:null,
    
};

export const appointmentsListSlice = createSlice({
    name: "appointmentsList",
    initialState,
    reducers: {
        addAppointmentsList: (state, action) => {
            const {appointments} = action.payload;

            state.list = appointments;
            
        },
        // changeAppointmentsList: (state, action) => {
        //     const { appointments } = action.payload;
        
        //     state.shiftDate = shiftDate;
        //     state.timeSlot = timeSlot;
        //     state.person = person;
        //     state.phone = phone;
        //     state.email = email;
        //     state.dni = dni;
        // },
        deleteClient:(state)=>{
            state.list=null;
        },
    },
});

export const { addAppointmentsList, deleteClient } = appointmentsListSlice.actions;
export default appointmentsListSlice.reducer;