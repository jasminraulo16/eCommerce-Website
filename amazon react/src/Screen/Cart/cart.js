import React, { useState, useEffect } from 'react'
import './cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/actions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api';
import api from '../../api';
import { Link } from 'react-router-dom';
import useCartData from '../../hooks/useCartData';


const Cart = (item) => {
    // const [cartItem, setCartItem] = useState([]);
    // const [cartTotal, setCartTotal] = useState(0);
    // const cart_code = localStorage.getItem("cart_code");

    // const dispatch = useDispatch();
    // const cartItems = useSelector((state) => state.cart.items);
    // const cart_code = localStorage.getItem("cart_code");
    

    // useEffect(function(){
    //     api.get(`get_cart?cart_code=${cart_code}`)
    //     .then(res => {
    //         console.log(res.data)
    //         setCartItem(res.data.items)
    //         setCartTotal(res.data.sum_total)
    //     })
    //     .catch(err => {
    //         console.log(err.message)
    //     })
    // },[])


    // let a = 0;
    // let cost = cartItems.map((item) => { return a = a + item.price })

    // useEffect(() => {
    //     setCartItem(cartItems);
    // }, [cartItems])

    // const RemoveFromCart = (id) => {
    //     toast.error("Item Removed From Cart", {
    //         position: "bottom-right"
    //     })
    //     dispatch(removeFromCart(id));
    // }


    const {cartItem, setCartItem, cartTotal, setCartTotal, fetchCart} = useCartData();



    // useEffect(() => {
    //     fetchCart();
    // }, []);

    // const fetchCart = () => {
    //     api.get(`get_cart?cart_code=${cart_code}`)
    //         .then((res) => {
    //             setCartItem(res.data.items);
    //             setCartTotal(res.data.sum_total);
    //         })
    //         .catch((err) => {
    //             console.error("Error fetching cart:", err.message);
    //         });
    // };

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) {
            toast.error("Quantity cannot be less than 1", { position: "bottom-right" });
            return;
        }

        api.patch('update_quantity/', { "item.id": id, quantity })
            .then((res) => {
                toast.success("Quantity updated successfully!", { position: "bottom-right" });
                fetchCart(); // Refresh cart data
            })
            .catch((err) => {
                console.error("Error updating quantity:", err.message);
                toast.error("Failed to update quantity", { position: "bottom-right" });
            });
    };


    const handleRemoveFromCart = (id) => {
        api.delete('delete_cartitem/', { data: { item_id: id } }) // Pass data as payload
            .then(() => {
                toast.success("Item removed from cart", { position: "bottom-right" });
                fetchCart(); // Refresh cart to show updated data
            })
            .catch((err) => {
                console.error("Error deleting cart item:", err.message);
                toast.error("Failed to remove item", { position: "bottom-right" });
            });
    };
    

   

    if(cartItem.length < 1){
        return(<div className='alert alert-primary my-5' role='alert'>
            You haven't added any item to the cart
        </div>)
    }




    return (
        <div className="cart">

            <div className="topLeftCart">
                <div className="topLeftCartTitle">Shopping Cart</div>
                <div className="desellectAllCart">Deselect all items</div>
                <div className="cartPriceTextDivider">Price</div>

                <div className="cartItemsDiv">
                    {
                        cartItem.map((item, ind) => {
                            return (
                                <div className="cartItemBlock" key={ind}>
                                    <div className="cartItemLeftBlock">
                                        <div className='cartItemLeftBlockImage'>
                                            <img className='cartItemLeftBlockImg' src={`${BASE_URL}${item.product.image}`}></img>
                                        </div>
                                        <div className='cartItemLeftBlockDetails'>
                                            <div className='cartItemProductName'>{item.product.name}</div>
                                            <div className='inStockCart'>In stock</div>
                                            <div className='elgFreeShp'>Elligible for FREE Shopping</div>
                                            <div className='amazonFullFilledImage'><img className='fullfillImg' src='https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png'></img></div>
                                            <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            style={{ width: '50px' }}
                                            onChange={(e) =>
                                                handleQuantityChange(item.id, e.target.value)
                                            }/>
                                            <div className='removeFromCart' onClick={()=>{handleRemoveFromCart(item.id)}}>Remove From Basket</div>
                                        </div>
                                    </div>

                                    <div className="cartItemRightBlock">
                                        {`Rs ${item.product.price}`}
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>

            </div>

     
            <div className="topRightCart">
                <div className="subTotalTitle">Subtotal ({cartItem.length} items) : <span className='subTotalTitleSpan'>Rs {cartTotal}</span></div>
                <div className="giftAddto">
                    <input type='checkbox' />
                    <div>This Order Contains a gift</div>
                </div>
                <Link to={'/checkout'}>
                <div className="proceedToBuy">Proceed To Buy</div>
                </Link>

            </div>
            <ToastContainer />
            
        </div>
    )
}

export default Cart