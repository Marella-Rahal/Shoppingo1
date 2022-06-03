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
export const showPopupNote=()=>{
    $(".fullscreenNote").fadeTo(500,1);
    $(".popupNote").fadeTo(500,1);
    $("body").css("overflow","hidden");
}
function NotePopup(props) {

    const clearPopup=()=>{
        $(".popupNote").fadeOut(500);
        $(".fullscreenNote").fadeOut(500);
        $('body').css("overflow","auto");
    }


    return (
        <FullScreen className='fullscreenNote'>
            <Popup className='popupNote' style={{color:props.color}}>

                {props.msg}
                

                <button onClick={clearPopup} style={{marginTop:'10px',backgroundColor:'white',border:`solid 1px ${props.color}`,color:props.color,borderRadius:'10px',width:'50px'}}>Ok</button>

            </Popup>  
        </FullScreen>
    );
}

export default NotePopup;