import { AddShoppingCart, Favorite, Home, LogoutOutlined } from '@mui/icons-material';
import {HeaderImage} from '../../Profile/ProfileInfoCss';
import { IconButton } from '@mui/material';
import {Link , useNavigate,Navigate,useLocation} from 'react-router-dom';
import React, { useRef , useEffect } from 'react';
import './Navbar.css';
import {useDispatch, useSelector} from 'react-redux';
import $ from 'jquery';

function Navbar(props) {
    
    const route=useNavigate();
    const location=useLocation();
    const user=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const tabs=useRef();

    useEffect(()=>{

        if(user.user.name){

            $('.sign-btn').css('display','none');
            $('.log-btn').css('display','none');
            $('.log-out').css('display','inline');
            $('.user-info').css('display','inline');

        }
        else{

            $('.sign-btn').css('display','inline');
            $('.log-btn').css('display','inline');
            $('.log-out').css('display','none');
            $('.user-info').css('display','none');

        }

    },[]);

    const show=()=>{
        const x=tabs.current;
        if(x.style.display=='none' )
            x.style.display='flex';
        else
            x.style.display='none';    
    }

    return (
        <div className='navbar'>

            <div className='nav-toggle'>

                <h5 className='brand'>
                    Shoppingo
                </h5>

                <button type='button' className='toggle-btn' 
                onClick={show}>

                    <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e" alt="toggle button"/>

                </button>

            </div>

            <div ref={tabs} className='tabs'>


                <IconButton className='nav-icons' onClick={()=>route('/')} style={{fontSize:'15px important'}}>
                    <Home/>
                    <p style={{fontSize:'15px',marginBottom:'0px',marginLeft:'10px'}}>Home</p>
                </IconButton>


                <Link to="/Shop" className='nav-links'>
                    Product
                </Link>

                <Link  to="/Mangment/Dashbord" className='nav-links'>
                    Managment
                </Link>

                <Link  to="/Offers" className='nav-links'>
                    Offers
                </Link>

                <IconButton className='nav-icons' onClick={()=>route('/Favourite')}>
                    <Favorite/>
                </IconButton>

                <IconButton className='nav-icons' onClick={()=>route('/ShoppingCard')}>
                    <AddShoppingCart/>
                </IconButton>


                <button type="button" className='log-btn' onClick={()=>route('/LogIn')}>
                    Log In
                </button>

                <button  type="button" className='sign-btn' onClick={()=>route('/SignUp')}>
                    Sign Up
                </button>

                <IconButton onClick={()=>{localStorage.clear();window.location.reload(true)}} className='user-info nav-icons' style={{marginBottom:'5px',fontSize: '15px'}}>
                        <LogoutOutlined/>
                        <button className='user-info'>Log Out</button>
                </IconButton>


                <div className='user-info' style={{marginTop:'7px', fontSize: '15px'}}>
                Hello , {user.user.name}
                </div>

                <HeaderImage className='user-info' style={{marginTop:'7px'}} onClick={()=>{route('/Profile')}}/>


            </div>

        </div>
    );
}

export default Navbar;