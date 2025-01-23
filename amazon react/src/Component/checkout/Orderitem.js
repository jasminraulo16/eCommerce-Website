import React from 'react';
import './OrderItem.css';
import { BASE_URL } from '../../api';

const Orderitem = ({ cartitem}) => {
  return (
    <div className="order-item">
      <div className='order-item-image-container'>
      <img src={`${BASE_URL}${cartitem.product.image}`} alt={'image'} className="order-item-image" />
      </div>
      <div className="order-item-details">
        <h4 className="order-item-name">{cartitem.product.name}</h4>
        <p className="order-item-quantity">{`Quantity: ${cartitem.quantity}`}</p>
        <p className="order-item-price">{`Price: ₹${cartitem.product.price}`}</p>
      </div>
    </div>
  );
};

export default Orderitem;
