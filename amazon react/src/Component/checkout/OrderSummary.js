import React from 'react';
import './OrderSummary.css';
import OrderItem from './Orderitem';
import { colors } from '@mui/material';

const OrderSummary = ( {cartItem, cartTotal}) => {
  // const grandTotal = total + tax - discount;

  return (
    <div className="order-summary">
      <h3 className="summary-title">Order Summary</h3>
      <div className="order-items-list">
        {cartItem.map(cartitem => <OrderItem key={cartitem.id} cartitem={cartitem}/>)}
       
      </div>
      <p>{`Total:  Rs.${cartTotal}`}</p>
    </div>
  );
};

export default OrderSummary;
