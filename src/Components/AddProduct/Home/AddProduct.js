import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SideNavbar from '../SideNavbar/SideNavbar';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Route, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ChromePicker} from 'react-color'; 

import {
  Container,
  InnerContainer,
  TopNavbar,
  Title,
  Content,
  Section,
  ProductName,
  Label,
  InputText,
  ProductPrice,
  RadioSection,
  InputRadio,
  Pargraph,
  InputNumber,
  PriceWithOffer,
  Label2,
  ProductImage,
  ProductSize,
  InputChek,
  DivSize,
  ProductType,
  ProductDescription,
  InnerDivSize,
  CheckboxDiv,
  ColorDiv,
  Button,
  DivButton,
  Button2,
  Form,
} from './AddProductCss';

import HeaderImage  from '../../Profile/HeaderImage';
import $ from 'jquery';
import NotePopup from '../../PopUp/NotePopup';
import { registerUser } from '../../../Redux/Slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';


var i = 0;
let  ColorArr = [];




function AddProduct(props) {
  const  user= useSelector((state) => state.user);
  const route = useNavigate();

  const [errMsg, setErrMsg] = useState('');
  const token=localStorage.getItem('userToken',);
  const [Gender, setGender] = useState('man');
  const [Catg, setCatg] = useState('Blazer');
  const [quantity, setquantity] = useState(null);
  const [brand, setbrand] = useState('');
  const [NumberOfModel, setNumberOfModel] = useState(null);
  const [FabricType, setFabricType] = useState('cashmere');
  const [s, sets] = useState('');
  const [m, setm] = useState('');
  const [x, setx] = useState('');
  const [xl, setxl] = useState('');
  const [xxl, setxxl] = useState('');
  const [xxxl, setxxxl] = useState('');
  const [ProductPrice, setProductPrice] = useState();
  const [offer, setoffer] = useState();
  const [selectImag, setselectImag] = useState(null);
  const [manChecked, setmanChecked] = useState(true);
  const [womanChecked, setwomanChecked] = useState(false);
  const [Color, setColor] = useState('');
  const [noteMsg, setNoteMsg] = useState('');
  const [file, setFile] = useState(require('../../../Images/defaultProduct.jfif'));
  
  const [image,setImage]=useState();
  useEffect(()=>{
    
    if(user.user.imageUrl.length>1){
      setImage(`http://localhost:5000/${user.user.imageUrl}`);
    }
    else{
      setImage(require('../../../Images/Default.jpg'));
    }
  })

  const onFileChange = (event) => {
    setselectImag(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  //todo control gender checkbox

  const mantoggle = (e) => {
    setGender('man');
    setCatg('Blazer');
    setmanChecked(true);
    setwomanChecked(false);
    $('#man').css('display', 'block');
    $('#woman').css('display', 'none');
  };

  const womantoggle = (e) => {
    setGender('woman');
    setCatg('Blazer');
    setmanChecked(false);
    setwomanChecked(true);
    $('#man').css('display', 'none');
    $('#woman').css('display', 'block');
  };

  //todo create product color

  const showPopupNote = () => {
    $('.fullscreenNote').fadeTo(500, 1);
    $('.popupNote').fadeTo(500, 1);
    $('body').css('overflow', 'hidden');
  };
    
  const addColorFunc = (e) => {
    e.preventDefault();
    document.getElementById("colorSelector").style.display = "block";
    document.getElementById("ButtonsDiv").style.display = "none";
  };

  //todo delete product color

  const removeColorFunc = () => {
    if (document.getElementById('addColorDiv').children) {
      document.getElementById('addColorDiv').lastElementChild.remove();
    }

  };
  
  const selectColorFromPicker = (e) => {
    e.preventDefault();   
    ColorArr.push(Color);
    console.log(ColorArr);
    document.getElementById("colorSelector").style.display = "none";
    var In = document.createElement('input');
    In.type = 'button';
    In.style.backgroundColor=Color;
    In.name = 'productColor';
    In.style.border = 'none';
    In.style.width = '30px';
    In.style.height = '30px';
    In.style.borderRadius = '10px';
    $('#addColorDiv').append(In);
    document.getElementById("ButtonsDiv").style.display = "block";

    
  }

  const sendData = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('gender', Gender);
    fd.append('categ', Catg);
    fd.append('price', ProductPrice);
    fd.append('percent', offer);
    fd.append('s', s);
    fd.append('m', m);
    fd.append('x', x);
    fd.append('xl', xl);
    fd.append('xxl', xxl);
    fd.append('xxxl', xxxl);
    fd.append('red', 'red');
    fd.append('fabricType', FabricType);
    fd.append('quantity', quantity);
    fd.append('Brand', brand);
    fd.append('numOfModel', NumberOfModel);
    fd.append('productImage', selectImag, selectImag.name);
    axios.post('http://localhost:5000/shop/addProduct', fd, {
      headers: { authorization: `bearer ${token}` },
    })
    .then(
      (res)=>
      {
      // console.log(res.data);
      route('/Mangment/SellerDashboard');
      }
    )
    .catch((err) =>{

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

  //todo ************************

  return (
    <Container>
      {/* <NotePopup msg={noteMsg} color="#6b7aa1" /> */}
      <SideNavbar />
      <InnerContainer>
        <TopNavbar>
          <div>
            <Title>Add Product</Title>
          </div>

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
            <Link to="/ShoppingCart">
              <IconButton
                onClick={() => {
                  Route('/ShoppingCart');
                }}
                style={{ color: '#6B7AA1' }}
              >
                <AddShoppingCart />
              </IconButton>
            </Link>

            <div style={{ marginTop: '10px', fontSize: '15px' }}>
              Hello , {user.user.name}
            </div>
            <HeaderImage image={image}
              
            />
          </div>
        </TopNavbar>

        <Content>
          <Form onSubmit={sendData} >
            <Section>
              <ProductType>
                <Label>Product Type</Label>
                <DivSize>
                  <CheckboxDiv>
                    <InputChek
                      type="checkbox"
                      name="gender"
                      onClick={mantoggle}
                    ></InputChek>
                    <Pargraph>Man</Pargraph>
                  </CheckboxDiv>
                  <CheckboxDiv style={{ marginRight: '100px' }}>
                    <InputChek
                      type="checkbox"
                      name="gender"
                      onClick={womantoggle}
                    ></InputChek>
                    <Pargraph>Woman</Pargraph>
                  </CheckboxDiv>
                </DivSize>
              </ProductType>
              <ProductDescription>
                <select
                  id="man"
                  name="man"
                  style={{
                    width: '64%',
                    padding: '10px',
                    color: '#6b7aa1',
                    borderRadius: '10px',
                    border: 'none',
                    boxShadow: '10px 4px 4px rgba(0, 0, 0, 0.25) ',
                  }}
                  onChange={(e) => {
                    setCatg(e.target.value);
                  }}
                >
                  <option defaultValue="Blazer">Blazer</option>
                  <option defaultValue="Abayas">Abayas</option>
                  <option defaultValue="Hoodies">Hoodies</option>
                  <option defaultValue="Jackets">Jackets</option>
                  <option defaultValue="Pants">Pants</option>
                  <option defaultValue="Shirts">Shirts</option>
                  <option defaultValue="Sets">Sets</option>
                  <option defaultValue="Shorts">Shorts</option>
                  <option defaultValue="Suits">Suits</option>
                  <option defaultValue="T-Shirts">T-Shirts</option>
                  <option defaultValue="Swimwear">Swimwear</option>
                  <option defaultValue="Vests">Vests</option>
                  <option defaultValue="Pajamas">Pajamas</option>
                  <option defaultValue="Bow ties">Bow ties</option>
                  <option defaultValue="Hats">Hats</option>
                  <option defaultValue="Scarves">Scarves</option>
                  <option defaultValue="Ties">Ties</option>
                  <option defaultValue="Belts">Belts</option>
                </select>

                <select
                  id="woman"
                  name="woman"
                  style={{
                    width: '64%',
                    padding: '10px',
                    color: '#6b7aa1',
                    borderRadius: '10px',
                    border: 'none',
                    boxShadow: '10px 4px 4px rgba(0, 0, 0, 0.25) ',
                    display: 'none',
                  }}
                  onChange={(e) => {
                    setCatg(e.target.value);
                  }}
                >
                  <option defaultValue="Blazer">Blazer</option>
                  <option defaultValue="Abayas">Abayas</option>
                  <option defaultValue="Hoodies">Hoodies</option>
                  <option defaultValue="Jackets">Jackets</option>
                  <option defaultValue="Dresses">Dresses</option>
                  <option defaultValue="Shirts">Shirts</option>
                  <option defaultValue="Sets">Sets</option>
                  <option defaultValue="Shorts">Shorts</option>
                  <option defaultValue="Suits">Suits</option>
                  <option defaultValue="T-Shirts">T-Shirts</option>
                  <option defaultValue="Swimwear">Swimwear</option>
                  <option defaultValue="Vests">Vests</option>
                  <option defaultValue="Pajamas">Pajamas</option>
                  <option defaultValue="BodySuits">BodySuits</option>
                  <option defaultValue="Hats">Hats</option>
                  <option defaultValue="Scarves">Scarves</option>
                  <option defaultValue="Ties">Ties</option>
                  <option defaultValue="Belts">Belts</option>
                  <option defaultValue="Skirts">Skirts</option>
                  <option defaultValue="Jeans">Jeans</option>
                </select>
              </ProductDescription>

              <ProductDescription>
                <Label>Product color</Label>

                <div style={{ marginBottom: '15px' }}>
                  <div id="ButtonsDiv">
                  <Button
                    type="button"
                    onClick={addColorFunc}
                    style={{ width: '30%', height: '50px', marginLeft: '0px' }}
                  >
                    Add Color
                  </Button>
                  <Button
                    type="button"
                    onClick={removeColorFunc}
                    style={{ width: '30%', height: '50px' }}
                  >
                    Remove Color
                  </Button>
                  </div>
                  <div id="colorSelector" style={{display:"none" , marginTop:"20px"}}>
                  <ChromePicker id="jasem" color={Color} onChange={UpdatedColor => setColor(UpdatedColor.hex)} ></ChromePicker>
                  <Button onClick={selectColorFromPicker} style={{marginTop:"20px"}}>Add</Button>
                  </div>
                </div>

                <div id="addColorDiv" style={{ width: '65%' , display: "flex" , justifyContent: "space-evenly"}}></div>
              </ProductDescription>

              <Label>Quantity</Label>
              <InputNumber
                type="number"
                required
                onChange={(e) => setquantity(e.target.value)}
              />

              <Label>Brand</Label>
              <InputText required onChange={(e) => setbrand(e.target.value)} />

              <Label>Number of Model</Label>
              <InputText
                type="number"
                required
                onChange={(e) => setNumberOfModel(e.target.value)}
              />
            </Section>

            <Section>
              <ProductDescription>
                <Label>Fabric Type</Label>
                <select
                  onChange={(e) => setFabricType(e.target.value)}
                  id="cars"
                  name="cars"
                  style={{
                    width: '65%',
                    padding: '10px',
                    color: '#6b7aa1',
                    borderRadius: '10px',
                    border: 'none',
                    boxShadow: '10px 4px 4px rgba(0, 0, 0, 0.25) ',
                  }}
                >
                  <option defaultValue="Cashmere">Cashmere</option>
                  <option defaultValue="Chenille">Chenille</option>
                  <option defaultValue="Cotton">Cotton</option>
                  <option defaultValue="Crêpe">Crêpe</option>
                  <option defaultValue="Georgette">Georgette</option>
                  <option defaultValue="Gingham">Gingham</option>
                  <option defaultValue="Leather">Leather</option>
                  <option defaultValue="Linen">Linen</option>
                  <option defaultValue="Organza">Organza</option>
                  <option defaultValue="Silk">Silk</option>
                  <option defaultValue="Velvet">Velvet</option>
                  <option defaultValue="Twill">Twill</option>
                  <option defaultValue="Damask">Damask</option>
                  <option defaultValue="naylon">naylon</option>
                </select>
              </ProductDescription>

              <ProductSize>
                <Label>Product Size</Label>
                <DivSize>
                  <InnerDivSize>
                    <CheckboxDiv>
                      <InputChek
                        type="checkbox"
                        onClick={() => sets('s')}
                      ></InputChek>
                      <Pargraph>S</Pargraph>
                    </CheckboxDiv>
                    <CheckboxDiv>
                      <InputChek
                        type="checkbox"
                        onClick={() => setm('m')}
                      ></InputChek>
                      <Pargraph>M</Pargraph>
                    </CheckboxDiv>
                  </InnerDivSize>
                  <InnerDivSize>
                    <CheckboxDiv>
                      <InputChek
                        type="checkbox"
                        onClick={() => setx('x')}
                      ></InputChek>
                      <Pargraph>L</Pargraph>
                    </CheckboxDiv>
                    <CheckboxDiv>
                      <InputChek
                        type="checkbox"
                        onClick={() => setxl('xl')}
                      ></InputChek>
                      <Pargraph>XL</Pargraph>
                    </CheckboxDiv>
                  </InnerDivSize>
                  <InnerDivSize>
                    <CheckboxDiv>
                      <InputChek
                        type="checkbox"
                        onClick={() => setxxl('xxl')}
                      ></InputChek>
                      <Pargraph>XXL</Pargraph>
                    </CheckboxDiv>
                    <CheckboxDiv>
                      <InputChek
                        type="checkbox"
                        onClick={() => setxxxl('xxxl')}
                      ></InputChek>
                      <Pargraph>XXXL</Pargraph>
                    </CheckboxDiv>
                  </InnerDivSize>
                </DivSize>
              </ProductSize>

              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  marginBlock: '20px',
                }}
              >
                <Label>Product Price</Label>
                <InputNumber
                  type="number"
                  required
                  onChange={(e) => setProductPrice(e.target.value)}
                ></InputNumber>

                <Label>Enter the percentage of the offer</Label>
                <InputNumber
                  type="number"
                  required
                  onChange={(e) => setoffer(e.target.value)}
                ></InputNumber>
              </div>

              <ProductImage>
                <Label>Product Image</Label>
                <div style={{ width: '65%' }}>
                  <label
                    for="file"
                    className="btn btn-info"
                    style={{
                      marginTop: '10px',
                      color: '#6b7aa1',
                      background: '#f5cb59',
                      padding: '1px',
                      width: '35%',
                    }}
                  >
                    Choose Photo
                  </label>
                  <input
                    type="file"
                    required
                    id="file"
                    onChange={onFileChange}
                    className="filetype"
                    style={{ marginLeft: '10px', display: 'none' }}
                    
                  />

                  <img
                    src={file}
                    alt="preview image"
                    style={{
                      height: '150px',
                      width: '50%',
                      borderRadius: '20px',
                      marginLeft: '20px',
                    }}
                  />
                </div>
              </ProductImage>
              <DivButton>
                <Button2 >Add Product</Button2>
              </DivButton>
            </Section>
          </Form>
        </Content>
      </InnerContainer>
    </Container>
  );
}
export default AddProduct;
