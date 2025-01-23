import React, { useEffect, useState } from "react";
import "./PaymentStatus.css"; // Import the external CSS file
import { Link, useLocation } from 'react-router-dom'
import api from '../../api'

const PaymentStatus = ({setNumberCartItems}) => {
    const [statusMessage, setStatusMessage] = useState('Verifying your payment')
    const [statusSubMessage, setSubStatusMessage] = useState('Wait a moment, your payment is being verified!')
    const location = useLocation();

    useEffect(function(){
        const queryParams = new URLSearchParams(location.search);
        const paymentId = queryParams.get("paymentId")
        const payId = queryParams.get('PayerID')
        const ref = queryParams.get("ref")
        if(paymentId && payId && ref){
            api.post(`paypal_payment_callback/?paymentId=${paymentId}&PayerID=${payId}&ref=${ref}`)
            .then(res => {
                setStatusMessage(res.data.message);
                setSubStatusMessage(res.data.subMessage)
                localStorage.removeItem("cart_code")
                setNumberCartItems(0)
            })
            .catch(err => console.log(err.message))
        }
    }, [])

    return (
        <div className="container">
            <div className="text">
                <h2>{statusMessage}</h2>
                <p>{statusSubMessage}</p>
            </div>
            <div className="button-container">
                <span>
                    <Link to={'/'} className="button" >
                        Continue Shopping
                    </Link>
                    <Link to={'shop'} className="button" >
                        View Order Details
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default PaymentStatus;

