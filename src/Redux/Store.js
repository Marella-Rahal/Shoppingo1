import { configureStore } from "@reduxjs/toolkit";
import  UserSlice from "./Slices/UserSlice";


export  const Store=configureStore({
    reducer:{
        user:UserSlice,
    }
});