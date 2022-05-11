import { Sort } from '@mui/icons-material';
import React ,{useEffect} from 'react';
import './Sortbutton.css';
import {useSelector} from 'react-redux';
import $ from 'jquery';

function Sortbutton(props) {

    const user=useSelector(state=>state.user);

    useEffect(()=>{

        user.user.name
        ? $('#nearest_loc').css('display','block')
        : $('#nearest_loc').css('display','none');

    },[])
    
    return (
        <div className='dropdown'>

            <button className='dropdown-btn'>
                Sort By&nbsp;&nbsp; 
                <Sort/>
            </button>

            <div className='dropdown-content'>

                <button type='button'>Price : Low To Hight</button>

                <button type='button'>Price : Hight To Low</button>

                <button type='button' style={{display:'flex',flexDirection:'column',alignItems:'center'}}>

                    from

                    <div>

                    <input type='number' placeholder='20000' style={{width:'160px'}} />
                    s.p
                    </div>

                    to

                    <div>
                    <input type='number' placeholder='50000' style={{width:'160px'}}/>
                    s.p
                    </div>

                    <button type='button' className='go-btn'>
                        Go
                    </button>

                </button>  
                
                <button id="nearest_loc" type='button'>The Nearest Location</button>
        

            </div>
            
        </div>
    );
}

export default Sortbutton;