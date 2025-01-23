import React from 'react';
import OrderSummary from './OrderSummary';
import PaymentSection from './PymentSection';
import './checkOutPage.css';
import useCartData from '../../hooks/useCartData';


const CheckOutPage = () => {
  const {cartItem, setCartItem, cartTotal, setCartTotal, fetchCart} = useCartData();
  return (
    <div className="checkout-page">
        <div className='topLeft'>
      <OrderSummary cartItem={cartItem} cartTotal={cartTotal}/>
      </div>
      <div className='topRight'>
      <PaymentSection/>
      </div>
    </div>
  )
}

export default CheckOutPage;
