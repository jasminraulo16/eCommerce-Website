import { useState, useEffect } from "react";    
import api from '../api';

function useCartData(){
    const [cartItem, setCartItem] = useState([]);
        const [cartTotal, setCartTotal] = useState(0);
        const cart_code = localStorage.getItem("cart_code");

        useEffect(() => {
            fetchCart();
        }, [cart_code]);
    
        const fetchCart = () => {
            api.get(`get_cart?cart_code=${cart_code}`)
                .then((res) => {
                    setCartItem(res.data.items);
                    setCartTotal(res.data.sum_total);
                })
                .catch((err) => {
                    console.error("Error fetching cart:", err.message);
                });
        };

        return{cartItem, setCartItem, cartTotal, setCartTotal, fetchCart}
}

export default useCartData;