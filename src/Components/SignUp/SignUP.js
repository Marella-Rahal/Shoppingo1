import React,{useState,useEffect} from 'react';
import Navbar from '../Home/Navbar/Navbar';
import LSbackground from '../../Images/SignUp2.jpg';
import {Lsection,Overlay,Title,Span,Contain,Button1,Button1C,Button2,Button2c,Input,Input2,Container,Rsection,ButtonS,Form,BlueFacebook,RedGoogle,HLine} from './SignUPcss.js';
import {FullScreen,Popup,ChooseContainer,ChooseButton,VLine} from '../LogIn/LogIncss';
import NotePopup ,{showPopupNote}from '../PopUp/NotePopup';
import { useNavigate } from 'react-router';
import $ from 'jquery';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Redux/Slices/UserSlice';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;


function SignUp() {

  const route = useNavigate();
  const dispatch=useDispatch();

  const [user,setUser]=useState('');
  const [validUser,setValidUser]=useState(false);


  const [email,setEmail]=useState('');
  const [validEmail,setValidEmail]=useState(false);


  const [pwd,setPwd]=useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd,setMatchPwd]=useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg,setErrMsg]=useState('');

  useEffect(()=>{
    setValidUser(USER_REGEX.test(user));
  },[user])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  const handlesubmit = async (e) => {

    e.preventDefault();

    if (!validUser ) {
        setErrMsg(
          <>  
            <h4 style={{borderBottom:'solid 1px red'}}>Invalid User Name !!!</h4>
            <p>   4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.</p>
          </>
        );
        showPopupNote();
        return;
    }

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

    if(!validPwd){
      setErrMsg(
        <>
          <h4 style={{borderBottom:'solid 1px red'}}>Invalid Password !!!</h4>
          <p>6 to 24 characters.<br />
          Must include uppercase and lowercase letters, a number and a special character.<br />
          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span></p>
        </>
      );
      showPopupNote();
      return;
    }

    if( !validMatch ){
      setErrMsg(<h4>Password does not match</h4>);
      showPopupNote();
      return;
    }

    try{

      const res = await axios.post(
        'http://localhost:5000/auth/signup',
        {
          name:user,
          email:email,
          password:pwd
        }
      )

      //todo response data
    
      // console.log(res);
      localStorage.setItem('userToken',res.data.token);                                                     
      dispatch(registerUser(res.data));

      setUser('');
      setEmail('');
      setPwd('');
      setMatchPwd('');

      //todo pop_up after sending the info 
      $('.popupdiv').fadeTo(700, 1);
      $('.fullscreen').fadeTo(700, 1);
      $('body').css('overflow', 'hidden');

    }catch(err){

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
        setErrMsg(<h4>Registration Failed</h4>);
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
            <Title>start mangment your money stay with all fashion new</Title>
            <Span>
              we will help you to discover the world fashion clothes any where
              you are
            </Span>
          </Overlay>
        </Lsection>
        <HLine />
        <Rsection>
          {/* <Contain>continue with</Contain>

          <ButtonS>
            <Button1>
              <RedGoogle />
              <Button1C>Google</Button1C>
            </Button1>

            <Button2>
              <BlueFacebook />
              <Button2c>FaceBook</Button2c>
            </Button2>
          </ButtonS>

          <Contain style={{marginBottom:'5px'}}>or</Contain> */}

          <Form style={{marginTop:'100px'}} onSubmit={handlesubmit}>
            <Input
              type="text"
              name="userName"
              required
              autoComplete='off'
              value={user}
              onChange={(e)=>setUser(e.target.value)}
              placeholder="     Enter Your Name"
              style={{marginTop:'0px'}}
            ></Input>
            <Input           
              type="email"
              name="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="     Enter Your Email address"
            ></Input>
            <Input
              type="password"
              name="password"
              required
              value={pwd}
              onChange={(e)=>setPwd(e.target.value)}
              placeholder="     Enter Your Password"
            ></Input>
            <Input
              type="password"
              name="matchPassword"
              required
              value={matchPwd}
              onChange={(e)=>setMatchPwd(e.target.value)}
              placeholder="     Confirm Your password "
            ></Input>
            <Input2  type="submit">
              Sign Up
            </Input2>
          </Form>
        </Rsection>
      </Container>
    </>
  );
}

export default SignUp;
