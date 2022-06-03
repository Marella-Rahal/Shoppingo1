import React,{useState,useEffect} from 'react';
import Navbar from '../Home/Navbar/Navbar';
import LSbackground from '../../Images/SignUp2.jpg';
import {Container,FullScreen,Popup,ChooseButton,Lsection,Overlay,Title,ChooseContainer,Span,Rsection,Content,Link1,Input,Input2,Form,FormContent,Link2,VLine,HLine,Sendcode} from '../LogIn/LogIncss';
import { useNavigate } from 'react-router';
import $ from 'jquery';
import NotePopup, { showPopupNote } from '../PopUp/NotePopup';
import axios from 'axios';

const EMAIL_REGEX=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

function ResetPassword(props) {

    //********** initialize
    const route = useNavigate();

    const [email,setEmail]=useState('');
    const [validEmail,setValidEmail]=useState(false);

    const [code,setCode]=useState('');
    const [adminCode,setAdminCode]=useState('');
    const [validCode,setValidCode]=useState(false);

    const [disableCode,setDisableCode]=useState(true);
  
  
    const [pwd,setPwd]=useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [disablePwd,setDisablePwd]=useState(true);
  
    const [matchPwd,setMatchPwd]=useState('');
    const [validMatch, setValidMatch] = useState(false);

  
    const [errMsg,setErrMsg]=useState('');

    //************ validate 
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(()=>{
        setValidCode(code===adminCode)
    },[code])
    
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    //*********************** functions *****************************

    const sendingEmail=async(e)=>{

        e.preventDefault();

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

        try {
            
            const res=await axios.post(
                'http://localhost:5000/auth/forgetPassword',
                {
                    email:email
                }
            )
                //! *********
                console.log(res.data);
                // setAdminCode(res.data);
                // setDisableCode(false);
            
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
                setErrMsg(<h4>Failed</h4>);
                showPopupNote();
              }
        }
        
    }
    //* *************************
    const checkingCode=(e)=>{
        e.preventDefault();
        if(!validCode){
            setErrMsg(<h4>Your code is not correct, please try again !!!</h4>);
            showPopupNote();
            return;
        }

        setDisablePwd(false);

    }
    //* ***************************
    const handlesubmit = async(e) => {
        e.preventDefault();
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

        try {

            const res=await axios.post(
                'http://localhost:5000/auth/resetPassword',
                {
                    password:pwd
                }
            )

            setEmail('');
            setCode('');
            setPwd('');
            setMatchPwd('');
            //! **************
            route('/LogIn',{replace:true});
            
            
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
                setErrMsg(<h4>Failed</h4>);
                showPopupNote();
              }

        }

    };
    //* **********************************
    return (
        <>
            <Navbar />
            <Container>
                <NotePopup msg={errMsg} color='red'/>
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

                
                <h2 style={{color:'#6B7AA1'}}> Reset Password </h2>

                <Form>
                    <Input
                    type="email"
                    value={email}
                    onChange={e=>{setEmail(e.target.value)}}
                    placeholder="     Enter Your Email address"
                    ></Input>

                    {/* //***********  */}
                    <Sendcode onClick={sendingEmail}>send code</Sendcode>

                    <Input
                    type="text"
                    value={code}
                    onChange={e=>setCode(e.target.value)}
                    disabled={disableCode}
                    placeholder="       Enter  the code we sent to your email"
                    ></Input>

                    {/* //*************  */}
                    <Input2 onClick={checkingCode} style={{alignSelf:'self-end'}}>Check code</Input2>

                    <Input
                    type="password"
                    value={pwd}
                    onChange={e=>setPwd(e.target.value)}
                    disabled={disablePwd}
                    placeholder="     Enter New Password"
                    ></Input>

                    <Input
                    type="password"
                    value={matchPwd}
                    onChange={e=>setMatchPwd(e.target.value)}
                    disabled={disablePwd}
                    placeholder="     Confirm Password"
                    ></Input>

                    {/* //*************** */}
                    <Input2 style={{alignSelf:'self-end'}} onClick={handlesubmit}>Update Password</Input2>


                </Form>

                </Rsection>

            </Container>    
            
        </>
    )
}

export default ResetPassword;