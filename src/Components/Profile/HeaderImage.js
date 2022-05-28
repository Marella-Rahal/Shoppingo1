import React from 'react';
import { useNavigate } from 'react-router';

function HeaderImage(props) {
    const route=useNavigate();
    return (
        <div style={{background:'transparent',cursor:'pointer', backgroundSize: 'contain',marginLeft: '5px',width: 'fit-content',height: 'fit-content',borderRadius: '50px',marginLeft:'10px',marginRight:'5px'}}  onClick={() => { route('/Profile') }}>
            <img src={props.image} alt="your photo" style={{width:'40px',height:'40px',borderRadius:'50px'}}/>
        </div>
    );
}

export default HeaderImage;