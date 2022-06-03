import React from 'react';
import {FullScreen} from '../LogIn/LogIncss';
import styled from 'styled-components';
import $ from 'jquery';

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
//* ************************
export const sleep= (ms) => {
    return new Promise(resolve=>setTimeout(resolve,ms));
}

//* ************************
export const showSleepingPopup = () => {
    $('.popupSleep').fadeTo(700, 1);
    $('.fullscreenSleep').fadeTo(700, 1);
    $('body').css('overflow', 'hidden');
};
//* ************************
export const clearSleepingPopup=()=>{
    $(".popupSleep").fadeOut(500);
    $(".fullscreenSleep").fadeOut(500);
    $('body').css("overflow","auto");
}
//* ************************
function SleepingPopup(props) {

    return (
        <FullScreen className='fullscreenSleep'>
            <Popup className='popupSleep' style={{color:props.color}}>

                {props.msg}

            </Popup>  
        </FullScreen>
    );
}

export default SleepingPopup;