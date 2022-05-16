import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router';
import { registerUser } from '../../Redux/Slices/UserSlice';

function GetProfileData(props) {

    const token=localStorage.getItem('userToken');
    const location=useLocation();
    const dispatch=useDispatch();
    const route=useNavigate();

    if(token){

        axios.get('http://localhost:5000/profile',{
            headers:{
                authorization : `bearer ${token}`
            }
        }).then(res=>{
            // console.log(res.data);
            dispatch(registerUser(res.data));
            
        }).catch(err=>{
            // console.log(err.message);
            route('/Error',{replace:true});
        })

        return <Outlet/>;
          
    }
    else{
       return <Navigate to='/LogIn' state={{ from : location }} replace />;
    }
    
}

export default GetProfileData;