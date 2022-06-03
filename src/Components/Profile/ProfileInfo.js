import React, { useEffect, useState } from 'react';
import SideNavbar from '../AddProduct/SideNavbar/SideNavbar';
import { AddShoppingCart, Favorite} from '@mui/icons-material';
import {TopNavbar,Section,Label,InputText,DivSize} from '../AddProduct/Home/AddProductCss';
import { IconButton, requirePropFactory } from '@mui/material';
import { Route, Link,useNavigate } from 'react-router-dom';
import {Container,InnerContainer,Content,Title,Button1,Button} from './ProfileInfoCss';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router';
import axios from 'axios';
import NotePopup, { showPopupNote } from '../PopUp/NotePopup';
import $ from 'jquery';
import { registerUser } from '../../Redux/Slices/UserSlice';
import HeaderImage from './HeaderImage';

function ProfileInfo(props) {

  //************  initialize

  const route=useNavigate();
  const [Input,setInput]=useState(true);
  const [upgrade,setUpgrade]=useState(true);
  const userInfo=useSelector(state=> state.user.user);
  const [name,setName]=useState(userInfo.name);
  const [pwd,setPwd]=useState(userInfo.password);

  const [image,setImage]=useState();

  const token=localStorage.getItem('userToken');
  const [errMsg,setErrMsg]=useState('');
  const dispatch=useDispatch();

  //******************
  useEffect(()=>{
    
    if(userInfo.imageUrl.length>1){
      setImage(`http://localhost:5000/${userInfo.imageUrl}`);
    }
    else{
      setImage(require('../../Images/Default.jpg'));
    }

    //*disable the upgrade button when the user is already a seller
    if(userInfo.status==1){
      setUpgrade(true);
    }
    else{
      setUpgrade(false);
    }
    
  })


  //* change image and sending it 

  const onImageChange = (e) => {

      const fd=new FormData();
      fd.append('imageUrl', e.target.files[0], e.target.files[0].name);

      axios.post('http://localhost:5000/updateProfile',
                fd,
                {
                  headers:{
                    authorization :`bearer ${token}`
                  }
                })
            .then(res=>{
                dispatch(registerUser(res.data));
            })
            .catch(err=>{
            
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
      
   }

  //* change username and password and sending them

  const handlesubmit= async (e)=>{
    e.preventDefault();

    try {

      const res=await axios.post(
        'http://localhost:5000/updateProfile',
        {
          name:name,
          password:pwd
        },
        {
          headers:{
            authorization :`bearer ${token}`
          }
        })


        dispatch(registerUser(res.data));
        setInput(true);
      
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

  return (
    <Container>
      <NotePopup msg={errMsg} color='red'/>
      <SideNavbar />
      <InnerContainer>
        <TopNavbar>
          <div>
            <Title>Profile Information</Title>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop:'10px',
              paddingRight:'10px',
              height: '100%',
            }}
          >
            <Link to="/Favourite">
              <IconButton
                onClick={() => {
                  Route('/Favourite');
                }}
                style={{ color: '#6B7AA1' }}
              >
                <Favorite />
              </IconButton>
            </Link>

            <Link to="/ShoppingCard">
              <IconButton
                onClick={() => {
                  Route('/ShoppingCard');
                }}
                style={{ color: '#6B7AA1' }}
              >
                <AddShoppingCart />
              </IconButton>
            </Link>

            <div style={{marginTop:'7px', fontSize: '15px' }}>
              Hello , {userInfo.name}
            </div>

          
            <HeaderImage image={image}/>
            

          </div>
        </TopNavbar>
        <Content style={{ marginTop: '50px'  }}>
      

          <Section>
            <form onSubmit={handlesubmit}>
                <Label>Your Name</Label>
                <InputText
                type="text"
                defaultValue={userInfo.name}
                onChange={(e)=>setName(e.target.value)}
                style={{ marginBottom: '20px',fontSize:'20px'}}
                disabled={Input}
                ></InputText>
                <Label> Your Email Address</Label>

                <InputText
                  type="email"
                  defaultValue={userInfo.email}
                  disabled={true}
                  style={{ marginBottom: '20px',fontSize:'20px'}}
                ></InputText>
                <Label> Your Password</Label>
                <DivSize>
                  <InputText 
                  type="text"
                  defaultValue={userInfo.password}
                  onChange={(e)=>setPwd(e.target.value)}
                  disabled={Input}
                  style={{fontSize:'20px'}} 
                  >
                  </InputText>
                  <Button1 type="button" onClick={(e)=>setInput(prev=>!prev)}>Edit</Button1>
                </DivSize>
                
                <Button type="submit">Done</Button>
            </form>
            
            <Button disabled={upgrade} style={{minHeight:'50px',width:'63%'}} onClick={()=>{route('/UpgradeProfile')}}>Upgrade Your account to seller</Button>
            
          </Section>

          <Section>
            <div
              style={{
                width: '100%',
                height: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center',
                flexDirection: 'column'

              }}
            >
              <img
                src={image}
                alt="preview image"
                style={{ height: '250px', width: '250px', borderRadius: '50%',marginTop:'75px'}}
              />
              
              <label htmlFor="img" className="btn btn-info" style={{marginTop:'50px',color:'#6b7aa1',background:'#f5cb59'}}>Change Photo</label>
              <input
                type="file"
                id="img"
                onChange={onImageChange}
                className="filetype"
                style={{ marginLeft: '10px',display:'none' }}
              />
             
            </div>
          </Section>

        </Content>
      </InnerContainer>
    </Container>
  );
}

export default ProfileInfo;
