import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    _id:null,
    email:null,
    cuit:null,
    businessName:null,
    companyName:null,
    coreBusiness:null,
    address:null,
    city:null,
    province:null,
    postalCode:null,
    phone: null,
    cel: null,
    description:null
    
}];

export const listSupplierSlice = createSlice({
    name: "supplier",
    initialState,
    reducers: {
        addSupplier: (state, action) => {
            const {_id, email, cuit, coreBusiness, businessName, companyName, address, city, province, postalCode, phone, cel, description } = action.payload;
    state._id= _id;
    state.email= email ;
    state.cuit= cuit ;
    state.coreBusiness= coreBusiness;
    state.businessName= businessName ;
    state.companyName= companyName ;
    state.address= address ;
    state.city= city;
    state.province= province ;
    state.postalCode= postalCode ;
    state.phone= phone ;
    state.cel= cel  ;
    state.description= description;
        },                   
        changeSupplier: (state, action) => {
            const { email, cuit, coreBusiness, businessName, companyName, address,city,province, postalCode, phone, cel, description } = action.payload;
            
    state.email= email ;
    state.cuit= cuit ;
    state.coreBusiness= coreBusiness;
    state.businessName= businessName ;
    state.companyName= companyName ;
    state.address= address ;
    state.city= city;
    state.province= province ;
    state.postalCode= postalCode ;
    state.phone= phone ;
    state.cel= cel  ;
    state.description= description;
        },
        deleteSupplier:(state)=>{
            state._id=null;
            state.email=null;
            state.cuit=null;
            state.coreBusiness=null;
            state.businessName=null;
            state.companyName = null;
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

export const { addListSupplier, changeListSupplier, deleteListSupplier } = listSupplierSlice.actions;
export default listSupplierSlice.reducer;