import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import { BASE_URL } from "../../api";
import api from '../../api';
import {FormatDate} from '../../FormatDate'

const OrderHistory = ({ orders }) => {
  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(function(){
    setLoading(true)
    api.get("user_info")
    .then(res => {
      setOrderItems(res.data.items)
      setLoading(false)
    })
    .catch(err => {
      console.log(err.message)
      setLoading(false)
    })
  })

  return (
    <div className="order-history">
      <h2>Order History</h2>
       {orderItems.map((item) => (
        <div className="order-item"> 
          <img src={`${BASE_URL} ${item.products.image}`} alt="image" className="product-image" />
          <div className="order-details">
            <p>{item.products.name}</p>
            <p>{`Order Date:${FormatDate(item.order_date)}`}</p>
            <p>{`Order ID:${item.order_id}`}</p>
            <p>{`Quantity:${item.quantity}`}</p>
            <p>{`Price: Rs.${item.products.price}`}</p>
          </div>
        </div>
       ))} 
     </div>
  );
};

export default OrderHistory;
