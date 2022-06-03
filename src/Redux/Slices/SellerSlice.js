import { createSlice } from "@reduxjs/toolkit";


const SellerSlice=createSlice({
    name:'seller',
    initialState:{
        message:'',
        seller:{

        }
    },
    reducers:{
        registerSeller:(state,action)=>{
            state.message=action.payload.message;
            state.seller=action.payload.seller;
        }
    }
})

export const {registerSeller}=SellerSlice.actions;
export default SellerSlice.reducer;