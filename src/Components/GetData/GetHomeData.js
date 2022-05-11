import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import {Navigate, Outlet, useLocation} from 'react-router';
import { registerUser } from '../../Redux/Slices/UserSlice';

function GetHomeData(props) {

    const token=localStorage.getItem('userToken');
    const location=useLocation();
    const dispatch=useDispatch();

    if(token){

        axios.get('http://localhost:8080/profile',{
            headers:{
                authorization : `bearer ${token}`
            }
        }).then(res=>{
            // console.log(res.data);
            dispatch(registerUser(res.data));
            
            
        }).catch(err=>{
            // console.log(err.message);
            if(err.res.status!==200 && err.res.status!==201){
                <Navigate to='/Error' state={{ from : location }} replace/>
            }
        })

        return <Outlet/>;
          
    }
    else{
       return <Outlet/>;
    }
    
}

export default GetHomeData;