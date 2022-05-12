import { createSlice } from "@reduxjs/toolkit";

const PaymentSlice=createSlice({
    name:'pay',
    initialState:{
        payment:[]
    },
    reducers:{
        updatePayment:(state,action)=>{
            state.payment=action.payload;
        }
    }
});

export const {updatePayment}=PaymentSlice.actions;
export default PaymentSlice.reducer;