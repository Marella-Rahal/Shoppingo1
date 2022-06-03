import React, { useState } from 'react';
import {FullScreen} from '../LogIn/LogIncss';
import styled from 'styled-components';
import $ from 'jquery';
import { useNavigate } from 'react-router';

export const Popup=styled.div`
position:fixed;
top:29%;
left:30%;
width:40%;
min-height:fit-content;
background-color:white;
border-radius:10px;
box-shadow:2px 2px 5px 5px white;
text-align:center;
padding:20px;
`
export const showUpgradePopup = () => {
    $('.upPopup').fadeTo(700, 1);
    $('.upFullscreen').fadeTo(700, 1);
    $('body').css('overflow', 'hidden');
};

function UpgradePopup(props) {

    const route=useNavigate();


    const goBack=()=>{
        $(".upPopup").fadeOut(500);
        $(".upFullscreen").fadeOut(500);
        $('body').css("overflow","auto");
        route('/Profile');
    }

    const resume=()=>{
        //todo hide the popup

        $(".upPopup").fadeOut(500);
        $(".upFullscreen").fadeOut(500);
        $('body').css("overflow","auto");

        //todo get the user location

        navigator.geolocation.getCurrentPosition((pos)=>{

        
            props.setCoords(pos.coords);
            props.setErrMsg(<h4>Your location has been successfully sent to us</h4>);
            props.showPopupNote();
      
          },(err)=>{
            const {code} = err;
       
            switch (code) {
                case err.TIMEOUT:
                    props.setErrMsg(<h4>We Failed to get your location:<br/>Timeout expired</h4>);
                    props.showPopupNote();
                    break;
                case err.PERMISSION_DENIED:
                    props.setErrMsg(<h4>We Failed to get your location:<br/>Permission denied</h4>);
                    props.showPopupNote();
                case err.POSITION_UNAVAILABLE:
                    props.setErrMsg(<h4>We Failed to get your location:<br/>Position unavailable</h4>);
                    props.showPopupNote();    
                default:
                    props.setErrMsg(<h4>We Failed to get your Location</h4>);
                    props.showPopupNote();
                    break;
            }
      
          },{
            enableHighAccuracy:false,
            timeout:30000,
            maximumAge:15000
          });

    }


    return (
        <FullScreen className='upFullscreen'>
            <Popup className='upPopup' style={{color:props.color}}>

                <h4>
                     Please before continuing to upgrade your profile, make sure you are in your store or whatever place  you selling your goods in it, so that we can provide the user with the exact location of your store
                </h4>
                
                <div style={{width:'100%',display:'flex',justifyContent:'space-evenly'}}>
                    <button onClick={goBack} style={{margin:'10px',backgroundColor:'white',border:`solid 1px ${props.color}`,color:props.color,borderRadius:'10px',width:'50px'}}>Go Back</button>

                    <button onClick={resume} style={{margin:'10px',backgroundColor:'white',border:`solid 1px ${props.color}`,color:props.color,borderRadius:'10px',width:'70px'}}>Continue</button>
                </div>

            </Popup>  
        </FullScreen>
    );
}

export default UpgradePopup;