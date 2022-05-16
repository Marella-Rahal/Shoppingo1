import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { registerUser } from '../../Redux/Slices/UserSlice';
import { updatePaymentReq } from '../../Redux/Slices/PaymentReqSlice';

function GetPaymentReqData(props) {

    const token=localStorage.getItem('userToken');
    const location=useLocation();
    const dispatch=useDispatch();
    const route=useNavigate();

    if(token){

        axios.get(
            'http://localhost:5000/managment/getallreqpayments',
            {
                headers:{
                    authorization : `bearer ${token}`,
                }
            }
        ).then(res=>{
            // console.log(res.data);
            dispatch(registerUser(res.data));
            dispatch(updatePaymentReq(res.data));
        }).catch(err=>{
            // console.log(err);
            route('/Error',{replace:true});
        })

        return <Outlet/>

    }
    else{
        return <Navigate to='/LogIn' state={{from : location}} replace/>
    }
}

export default GetPaymentReqData;