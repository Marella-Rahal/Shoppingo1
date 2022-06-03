import React, { useState } from 'react';
import { FullScreen } from '../LogIn/LogIncss';
import styled from 'styled-components';
import $ from 'jquery';
import { Clear } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/Slices/UserSlice';
import NotePopup, { showPopupNote } from './NotePopup';
export const Popup = styled.div`
  display: none;
  width: 90%;
  min-height: 85%;
  background-image: linear-gradient(
    to top left,
    rgba(244, 196, 68, 1),
    rgba(235, 171, 0, 1)
  );
  position: fixed;
  top: 7%;
  left: 5%;
  z-index: 2;
  border-radius: 25px;
  box-shadow: 5px 5px 10px 15px rgba(0, 0, 0, 0.15);
  padding: 40px;
  flex-direction: column;
  justify-content: center;
`;

function IncomePopup(props) {
  const [TotalIncome, setTotalIncome] = useState(0);
  const dispatch = useDispatch();
  const token=localStorage.getItem("userToken");
  const [errMsg, setErrMsg] = useState('');


  const clearPopup = () => {
    $('.popupdiv').fadeOut(500);
    $('.fullscreen').fadeOut(500);
    $('body').css('overflow', 'auto');
  };
 
    const sendIncome = (e) => {
      e.preventDefault();

       axios.post(
          'http://localhost:5000/managment/addIncome',
          {
            value: TotalIncome,
          },
          {
            headers: { authorization: `bearer ${ token } `},
          }
        )
        .then((res)=>{
            dispatch(registerUser(res.data));
            $('.popupdiv').fadeOut(500);
            $('.fullscreen').fadeOut(500);
            $('body').css('overflow', 'auto');
        })
        .catch((err)=>{

          // console.log(err)
          if (!err.response){
            setErrMsg(<h4 >No Server Response</h4>);
            showPopupNote();
          }
          else if(err.response.status!==200&&err.response.status!==201&&err.response.data.message){
            setErrMsg(<h4>{err.response.data.message}</h4>);
            showPopupNote();
          }
          else if(err.response.status!==200&&err.response.status!==201&&!err.response.data.message){
            setErrMsg(<h4>{err.message}</h4>);
            showPopupNote();
          }
          else {
            setErrMsg(<h4>Failed</h4>);
            showPopupNote();
          }
        })
    };
  return (
    <FullScreen className="fullscreen">
      <NotePopup msg={errMsg} color="red" />
      <Popup className="popupdiv">
        <Clear
          style={{
            fontSize: '40px',
            color: 'white',
            cursor: 'pointer',
            float: 'right',
          }}
          onClick={clearPopup}
        />

        <h1
          style={{
            paddingBlock: '70px 50px',
            textAlign: 'center',
            color: '#0D065E',
          }}
        >
          {props.title}
        </h1>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <form onSubmit={sendIncome} style={{display:'flex', flexDirection:'column'}}>
          <input
            type="number"
            placeholder="100000"
            style={{
              minWidth: '30%',
              height: '50px',
              borderRadius: '50px',
              paddingLeft: '10px',
              textAlign: 'center',
              marginBlock: '20px',
              border: 'solid 1px white',
              outlineColor: 'white',
              boxShadow: '5px 3px 7px 15px white',
              color: '#0D065E',
            }}
            onChange={(e) => setTotalIncome(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              background: 'none',
              border: 'solid 2px #0D065E',
              borderRadius: '20px',
              minWidth: '10%',
              height: '50px',
              marginTop: '60px',
              color: '#0D065E',
              fontWeight: '500',
            }}
          >
            Insert Now
          </button>
          </form>
        </div>
      </Popup>
    </FullScreen>
  );
}

export default IncomePopup;
