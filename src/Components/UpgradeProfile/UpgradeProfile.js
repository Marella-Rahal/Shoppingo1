import React, { useEffect, useState } from 'react';
import Navbar from '../Home/Navbar/Navbar';
import AttachmentIcon from '@mui/icons-material/Attachment';
import LSbackground from '../../Images/SignUp2.jpg';
import styled from 'styled-components';
import {
  Overlay,
  Title,
  Span,
  Input,
  Input2,
  Container,
  Rsection,
  Form,
} from '../SignUp/SignUPcss';
import { HLine } from '../LogIn/LogIncss';
import { useNavigate } from 'react-router';
import $ from 'jquery';
import UpgradePopup from '../PopUp/UpgradePopup';
import NotePopup, { showPopupNote } from '../PopUp/NotePopup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SleepingPopup, { clearSleepingPopup, showSleepingPopup, sleep } from '../PopUp/SleepingPopup';
import {showUpgradePopup} from '../PopUp/UpgradePopup';

export const Lsection = styled.div`
  position: relative;
  width: 50%;
  background-color: #fbf2d1;
  @media (max-width: 770px) {
    width: 100%;
  }
  @media (max-width: 650px) {
    padding-bottom: 220px;
  }
`;

//***************************** */
const EMAIL_REGEX=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX=/^[0][9][0-9]{8}$/;
//**************************** */

function UpgradeProfile() {
  const route = useNavigate();
  const user=useSelector(state=>state.user.user)
  const token=localStorage.getItem('userToken');

  const [email,setEmail]=useState();
  const [validEmail,setValidEmail]=useState();

  const [phone,setPhone]=useState();
  const [validPhone,setValidPhone]=useState();

  const [shopName,setShopName]=useState();
  const [address,setAddress]=useState();
  
  const [coords,setCoords]=useState();

  const [errMsg,setErrMsg]=useState();
  const [noteMsg,setNoteMsg]=useState();



  //*************************** 
  useEffect(()=>{
    showUpgradePopup();
  },[])

  useEffect(()=>{
    setValidEmail(EMAIL_REGEX.test(email));
  },[email])

  useEffect(()=>{
    setValidPhone(PHONE_REGEX.test(phone));
  },[phone])

  //***************************** 
  const handleSubmit=async(e)=>{
        e.preventDefault();

  //todo test input validation before sending it

        if(!validEmail){
          setErrMsg(
            <>
              <h4 style={{borderBottom:'solid 1px red'}}>Invalid Email !!!</h4>
              <p>The Email must be like this : <br/> username@example.com</p>
            </>
          );
          showPopupNote();
          return;
        }

        if (!validPhone ) {
          setErrMsg(
            <>  
              <h4 style={{borderBottom:'solid 1px red'}}>Invalid Phone Number !!!</h4>
              <p>The Phone Number :<br/> consist of 10 number digits <br/>
              Must begins with a 09 </p>
            </>
          );
          showPopupNote();
          return;
        }

        if(!coords.latitude || !coords.longitude){
          setErrMsg(
            <>  
              <h4 style={{borderBottom:'solid 1px red'}}>Invalid Location !!!</h4>
              <p>Sorry we can't get your location ,bad connection ,please try in another time</p>
            </>
          );
          showPopupNote();
          return;
        }


  //todo start sending the data

        try {

          const res=await axios.post('http://localhost:5000/auth/ubgrade',{

            emailShop:email,
            phone:phone,
            nameShop:shopName,
            address:address,
            infoUser:user,
            lat:coords.latitude,
            log:coords.longitude

          },{
            headers:{
              authorization : `bearer ${token}`
            }
          });

          setNoteMsg(
            <h4>
              Wait for us to call this number: <br/> {phone} <br/> so we can confirm your identity.
              <br/> It may take a bout a week
            </h4>
          )

          showSleepingPopup();

          await sleep(10000);

          clearSleepingPopup();

          setEmail('');
          setPhone('');
          setShopName('');
          setAddress('');
    
          route("/Profile");
          
        } catch (err) {
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
            setErrMsg(<h4>Upgrading Failed</h4>);
            showPopupNote();
          }
        }

  }

  //****************************************
  return (
    <>
      <Navbar />
      <Container>

      <UpgradePopup setCoords={setCoords} setErrMsg={setErrMsg} showPopupNote={showPopupNote} color="#6b7aa1"/>

      <SleepingPopup msg={noteMsg} color="#6b7aa1"/>
      <NotePopup msg={errMsg} color='red'/>


        <Lsection>
          <img
            src={LSbackground}
            style={{ width: '100%', height: '100%', opacity: '0.4' }}
          />
          <Overlay>
            <Title>
              If you are a Seller you will be fine and your prouducts will be
              selling
            </Title>
            <Span>
              we will help you to discover the world fashion clothes any where
              you are
            </Span>
          </Overlay>
        </Lsection>
        <HLine />
        <Rsection>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              marginBottom: '25px',
              alignItems: 'center',
            }}
          >
            <div
              style={{ color: '#805F0D', fontWeight: '600', fontSize: '21px' }}
            >
              <AttachmentIcon
                style={{ color: '#1940A4', transform: 'rotate(-35deg)' }}
              />{' '}
              Use the code sent by us to your email if approved
            </div>
            <div
              style={{ color: '#805F0D', fontWeight: '600', fontSize: '21px' }}
            >
              {' '}
              <AttachmentIcon
                style={{ color: '#1940A4', transform: 'rotate(-35deg)' }}
              />{' '}
              Approval may take up to two days for safety
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              placeholder="     Enter Your Email Shop"
              required
              style={{ marginBottom: '30px' }}
            ></Input>
            <Input
              type="number"
              value={phone}
              onChange={e=>setPhone(e.target.value)}
              placeholder="     Enter Your Phone Number"
              required
              style={{ marginBottom: '30px' }}
            ></Input>
            <Input
              type="text"
              value={shopName}
              onChange={e=>setShopName(e.target.value)}
              placeholder="     Enter Your Shop Name"
              required
              style={{ marginBottom: '30px' }}
            ></Input>
            <Input
              type="text"
              value={address}
              onChange={e=>setAddress(e.target.value)}
              placeholder="     Enter Your Address "
              required
              style={{ marginBottom: '30px' }}
            ></Input>
            <Input2 type="submit">
              Upgrade
            </Input2>
          </Form>
        </Rsection>
      </Container>
    </>
  );
}
export default UpgradeProfile;
