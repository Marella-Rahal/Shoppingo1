import React from 'react';
import j from '../../../Images/Jacket.webp';
import { Favorite, Star } from '@material-ui/icons';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

export const SellerButton = styled.button`
  background: #f4c444;
  color: #11324d;
  border: none;
  border-radius: 12px;
  width: 45%;
  &:hover {
    color: #f4c444;
    background: #11324d;
  }
`;

function ProductCard(props) {
  const route = useNavigate();

  return (
    <div
      className="card"
      style={{
        width: '200px',
        marginInline: '10px',
        marginBottom: '20px',
        paddingBottom: '20px',
        borderRadius: '20px',
        boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.25)',
      }}
    >
      <img
        src={props.imgUrl}
        alt="product img"
        className="card-img-top"
        style={{ borderRadius: '20px' }}
        onClick={() => route('/ProductDetail')}
      />
      <h4 className="text-center" style={{ color: '#0D065E' }}>
        {props.productCateg}
      </h4>
      <h5 className="text-center" style={{ color: '#7D6A06' }}>
        {props.newPrice}{' '}
      </h5>
      if(isOffer)return <h5>Offer</h5>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <SellerButton> Delete </SellerButton>
        <SellerButton> Update </SellerButton>
      </div>
    </div>
  );
}

export default ProductCard;
