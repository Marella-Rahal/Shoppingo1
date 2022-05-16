import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet , useNavigate} from 'react-router';
import { registerUser } from '../../Redux/Slices/UserSlice';

function GetHomeData(props) {

    const token=localStorage.getItem('userToken');
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
            route('/Error',{replace:true});
        })

        return <Outlet/>;
          
    }
    else{
       return <Outlet/>;
    }
    
}

export default GetHomeData;