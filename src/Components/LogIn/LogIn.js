import React ,{useState} from 'react';
import Navbar from '../Home/Navbar/Navbar';
import LSbackground from '../../Images/SignUp2.jpg';
import {
  Container,
  FullScreen,
  Popup,
  ChooseButton,
  Lsection,
  Overlay,
  Title,
  ChooseContainer,
  Span,
  Rsection,
  Content,
  Link1,
  Input,
  Input2,
  Form,
  FormContent,
  Link2,
  VLine,
  HLine,
} from './LogIncss';
import { useNavigate ,useLocation } from 'react-router';
import $ from 'jquery';
import axios from 'axios';
import NotePopup, { showPopupNote } from '../PopUp/NotePopup';
import { registerUser } from '../../Redux/Slices/UserSlice';
import { useDispatch } from 'react-redux' 

function LogIn() {

  const route = useNavigate();
  const dispatch=useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email,setEmail]=useState('');
  const [pwd,setPwd]=useState('');


  
  const [errMsg,setErrMsg]=useState('');

  const handlesubmit =async (e) => {

    e.preventDefault();

    try{

      const res = await axios.post(
        'http://localhost:5000/auth/login',
        {
          email:email,
          password:pwd
        },
      )

      //todo response data

      // console.log(res.data);
      localStorage.setItem('userToken',res.data.token);        
      dispatch(registerUser(res.data));

      setEmail('');
      setPwd('');

      //todo route after a success log in                                                  
      route('/');

      //todo pop_up after sending the info 

      // $('.popupdiv').fadeTo(700, 1);
      // $('.fullscreen').fadeTo(700, 1);
      // $('body').css('overflow', 'hidden');

    }
    catch(err){

      // console.log(err);
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
        setErrMsg(<h4>Log in Failed</h4>);
        showPopupNote();
      }

    }

  };


  return (
    <>
      <Navbar />
      <Container>
        <NotePopup msg={errMsg} color='red'/>
        <FullScreen className="fullscreen">
          <Popup className="popupdiv">
            <h1
              style={{
                color: 'white',
                paddingBottom: '50px',
                textAlign: 'center',
              }}
            >
              Where would You Go
            </h1>
            <ChooseContainer>
              <ChooseButton
                type="button"
                onClick={() => {
                  route('/Mangment/Dashbord');
                  $('body').css('overflow', 'auto');
                }}
              >
                Manage Your Money
              </ChooseButton>
              <VLine />
              <ChooseButton
                type="button"
                onClick={() => {
                  route('/Shop');
                  $('body').css('overflow', 'auto');
                }}
              >
                Find Your Product
              </ChooseButton>
            </ChooseContainer>
          </Popup>
        </FullScreen>
        <Lsection>
          <img
            src={LSbackground}
            style={{ width: '100%', height: '100%', opacity: '0.4' }}
          />
          <Overlay>
            <Title>Welcome Back</Title>
            <Span>
              we will help you to discover the world fashion clothes any where
              you are
            </Span>
          </Overlay>
        </Lsection>
        <HLine />
        <Rsection>
          <Content>
            Sign in to your account or{' '}
            <Link1 href="/SignUP">create a new account</Link1>
          </Content>
          <Form onSubmit={handlesubmit}>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              placeholder="     Enter Your Email address"
            ></Input>
            <Input
              type="password"
              name="password"
              value={pwd}
              onChange={(e)=>setPwd(e.target.value)}
              required
              placeholder="     Enter Your Password"
            ></Input>

            <FormContent>
              <Input2 type="submit">Log In</Input2>
              <Link2 onClick={()=>route('/ResetPassword')}>Forget your password?</Link2>
            </FormContent>

          </Form>
        </Rsection>
      </Container>
    </>
  );
}
export default LogIn;
