import React, { useState } from 'react';
import SideNavbar from '../AddProduct/SideNavbar/SideNavbar';
import { AddShoppingCart, Favorite} from '@mui/icons-material';
import {
  TopNavbar,
  Section,
  Label,
  InputText,
  DivSize,
} from '../AddProduct/Home/AddProductCss';
import { IconButton } from '@mui/material';
import { Route, Link,useNavigate } from 'react-router-dom';
import {
  Container,
  InnerContainer,
  Content,
  Title,
  Button1,
  Button,
  HeaderImage
} from './ProfileInfoCss';
import { useSelector } from 'react-redux';

function ProfileInfo(props) {

  const route=useNavigate();
  const [Input,setInput]=useState(true);
  const userInfo=useSelector(state=> state.user.user);

  const [image, setImage] = useState(require('../../Images/Default.jpg'));
  const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
      }
   }

  return (
    <Container>
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
              Hello,Hasan
            </div>

          
            <HeaderImage onClick={()=>{route('/Profile')}}/>
            

          </div>
        </TopNavbar>
        <Content style={{ marginTop: '50px'  }}>
      

          <Section>
            <Label>Your Name</Label>
            <InputText
             type="text"
             value={userInfo.name}
             style={{ marginBottom: '20px',fontSize:'20px'}}
             disabled={Input}
             ></InputText>
            <Label> Your Email Address</Label>

            <InputText
              type="email"
              value={userInfo.email}
              disabled={Input}
              style={{ marginBottom: '20px',fontSize:'20px'}}
            ></InputText>
            <Label> Your Password</Label>
            <DivSize>
              <InputText 
              type="text"
              value={userInfo.password}
              disabled={Input}
              style={{fontSize:'20px'}} 
              >
              </InputText>
              <Button1 onClick={()=>setInput(false)}>Edit</Button1>
            </DivSize>
            
            <Button>Done</Button>
            
            <Button style={{minHeight:'50px',width:'63%'}} onClick={()=>{route('/UpgradeProfile')}}>Upgrade Your account to seller</Button>
            
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
              
              <label for="img" className="btn btn-info" style={{marginTop:'50px',color:'#6b7aa1',background:'#f5cb59'}}>Change Photo</label>
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
