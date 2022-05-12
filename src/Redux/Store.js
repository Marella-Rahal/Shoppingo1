import { configureStore } from "@reduxjs/toolkit";
import PaymentSlice from "./Slices/PaymentSlice";
import  UserSlice from "./Slices/UserSlice";


export  const Store=configureStore({
    reducer:{
        user:UserSlice,
        pay:PaymentSlice
    }
});