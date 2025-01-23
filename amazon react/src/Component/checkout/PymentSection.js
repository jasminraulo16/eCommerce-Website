import React, { useState } from 'react'
import './PaymentSection.css'
import api from '../../api'

const PaymentSection = ({ onPayPal, onRazorpay }) => {

  const cart_code = localStorage.getItem("cart_code")
  const [loading, setLoading] = useState(false)

  function makePaypalPayment(){
    api.post("initiate_paypal_payment/", {cart_code})
    .then(res => {
      console.log(res.data)
      setLoading(false)
      if(res.data.approval_url){
        window.location.href = res.data.approval_url
      }
    })
    .catch(err => {
      console.log('Error initiating payment',err.message)
    })
  }

  return (
    <div className="payment-section">
      <h3 className="payment-title">Payment Options</h3>
      <div className="payment-options">
        <button className="payment-button paypal-button" onClick={makePaypalPayment}>
          Pay with PayPal
        </button>
        <button className="payment-button razorpay-button" onClick={onRazorpay}>
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default PaymentSection;
