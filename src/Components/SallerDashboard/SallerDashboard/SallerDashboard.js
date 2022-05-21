import React, { useState } from 'react';
import SideNavbar from '../../AddProduct/SideNavbar/SideNavbar';
import BarChart2 from './BarChar';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { Route, Link, useNavigate } from 'react-router-dom';
import { TopNavbar, Content } from '../../AddProduct/Home/AddProductCss';
import { Container, HeaderImage } from '../../Profile/ProfileInfoCss';
import { IconButton } from '@mui/material';
import { InnerContainer } from '../../Dashboard/DashboardCss';
import {
  PaymentsContainer,
  Paragraph,
  Input,
  InputContainer,
  FormContainer,
} from '../../InsertPaymentPage/InsertPaymentcss';
import {
  ProduactSection,
  TopProductSection,
  ProductContainer,
  AddButton,
  PaymentsInfo,
} from './SallerDashboardCss';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';

function SellerDashboard() {
  const route = useNavigate();
  const [data, setdata] = useState('');
  const token = localStorage.getItem('userToken');
  axios
    .get('http://localhost:5000/managment/getSellerDash', {
      headers: { authorization: `bearer ${token}` },
    })
    .then((res) => {
      setdata(res.data);
      console.log(data);
    });
  return (
    <Container>
      <SideNavbar />
      <InnerContainer>
        <TopNavbar style={{ justifyContent: 'end' }}>
          <div
            style={{
              display: 'flex',
              paddingTop: '10px',
              paddingRight: '10px',
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

            <div style={{ marginTop: '7px', fontSize: '15px' }}>
              Hello,Hasan
            </div>

            <HeaderImage
              onClick={() => {
                route('/Profile');
              }}
            />
          </div>
        </TopNavbar>
        <Content style={{ marginTop: '15px', flexDirection: 'column' }}>
          <PaymentsContainer
            style={{ marginBottom: '30PX', justifyContent: 'space-evenly' }}
          >
            <PaymentsInfo>
              <Paragraph style={{ fontSize: '25px' }}>
                Total Income From Shoppingo
              </Paragraph>
              <Paragraph>1,335,000 S.P</Paragraph>
            </PaymentsInfo>

            <PaymentsInfo>
              <Paragraph style={{ fontSize: '25px' }}>
                number of user buy from seller
              </Paragraph>
              <Paragraph>500 users </Paragraph>
            </PaymentsInfo>
          </PaymentsContainer>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid',
              borderTop: '1px solid',
              marginTop: '20px',
              padding: '20px 0px',
            }}
          >
            <BarChart2></BarChart2>
          </div>

          <ProduactSection>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <AddButton
                onClick={() => {
                  route('/AddProduct');
                }}
              >
                Add more product
              </AddButton>
            </div>
            <TopProductSection>
              <h1 style={{ color: '#11324D', fontWeight: '400' }}>
                Product You Have In Site
              </h1>
            </TopProductSection>
            <ProductContainer>
              {data.sellerProducts.map((item) => {
                let offer = false;
                return (
                  <ProductCard
                    productCateg={item.productCateg}
                    newPrice={item.newPrice}
                    imgUrl={item.imgUrl}
                    isOffer={offer}
                  />
                );
              })}
            </ProductContainer>
          </ProduactSection>
        </Content>
      </InnerContainer>
    </Container>
  );
}

export default SellerDashboard;
