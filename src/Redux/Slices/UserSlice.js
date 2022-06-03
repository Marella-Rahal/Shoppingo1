import { createSlice } from '@reduxjs/toolkit';

const UserSlice=createSlice({

    name:'user',

    initialState:{
        message:'',
        user:{
            name:'',
            email:'',
            password:'',
            status:null,
            pass:{
                iv:'',
                content:'',
            },
            income:null,
            totalBalance:null,
            totalPayments:null,
            payments:[],
            paymentsReq:[],
            imageUrl:'',
            id:'',
            createdAt:'',
            updatedAt:'',
            v:null
        },
        token:'',
    },

    reducers:{

        registerUser: (state,action) => {

            let x=action.payload;
            
            state.message=x.message;

            state.user.name=x.user.name;
            state.user.email=x.user.email;
            state.user.password=x.user.password;
            state.user.status=x.user.status;
            state.user.pass.iv=x.user.pass.iv;
            state.user.pass.content=x.user.pass.content;
            state.user.income=x.user.income;
            state.user.totalBalance=x.user.totalBalance;
            state.user.totalPayments=x.user.totalPayments; 
            state.user.payments=x.user.payments; 
            state.user.paymentsReq=x.user.paymentsReq; 
            state.user.imageUrl=x.user.imageUrl; 
            state.user.id=x.user._id; 
            state.user.createdAt=x.user.createdAt; 
            state.user.updatedAt=x.user.updatedAt; 
            state.user.v=x.user.v; 

            state.token=x.token;
        },
    }
    
});

export const {registerUser}=UserSlice.actions;

export default UserSlice.reducer;


