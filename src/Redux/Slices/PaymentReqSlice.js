import { createSlice } from "@reduxjs/toolkit";

const PaymentReqSlice=createSlice({

    name:'payReq',

    initialState : {
        paymentReq :[],
        message :[],
    },

    reducers : {
        updatePaymentReq :(state,action)=>{
            state.paymentReq=action.payload.payreq;
            state.message=action.payload.necessorymessage;
        }
    }

})

export const {updatePaymentReq}=PaymentReqSlice.actions;

export default PaymentReqSlice.reducer;