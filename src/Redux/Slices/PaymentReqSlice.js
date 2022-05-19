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
        },
        filterReqPayments :(state,action)=>{
            state.paymentReq=action.payload.filterReqPayments;
        }
    }

})

export const {updatePaymentReq ,filterReqPayments}=PaymentReqSlice.actions;

export default PaymentReqSlice.reducer;