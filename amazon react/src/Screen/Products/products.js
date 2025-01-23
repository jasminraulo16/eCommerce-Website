import React, { useState, useEffect } from 'react';
import './products.css';
import api from '../../api';
import { BASE_URL } from '../../api';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/actions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { randomValue } from '../../GenerateCartCode';


const Products = ({setNumberCartItems}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const cart_code = localStorage.getItem("cart_code")


    // useEffect(function(product_id){
    //     api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product_id}`)
    //     .then(res => {
    //         console.log(res.data)
    //         setAddedToCart(res.data.product_in_cart)
    //     })
    //     .catch(err => {
    //         console.log(err.message)
    //     })
    // })


    // useEffect(() => {
    //     const storedCart = JSON.parse(localStorage.getItem('cart_items')) || [];
    //     const cartState = {};
    //     storedCart.forEach(itemId => {
    //         cartState[itemId] = true;
    //     });
    //     setAddedToCart(cartState);
    // }, []);

//function to add item to the cart
    function add_item(productId) {
        const updatedCart = [...(JSON.parse(localStorage.getItem('cart_items')) || []), productId];
        localStorage.setItem('cart_items', JSON.stringify(updatedCart));
        const newItem = { cart_code: cart_code, product_id: productId };
    
        api.post("add_item/", newItem)
            .then((res) => {
                console.log(res.data);
                setAddedToCart((prevState) => ({
                    ...prevState,
                    [productId]: true,
                }));
                setNumberCartItems(curr => curr + 1)
                toast.success("Added To Cart", {
                             position: "bottom-right"
                         });
            })
            .catch((err) => {
                console.error("Error adding item:", err.message);
            });
    
        }

    // const add_item = (productId) => {
    //     // Update localStorage with the new cart item
    //     const updatedCart = [...(JSON.parse(localStorage.getItem('cart_items')) || []), productId];
    //     localStorage.setItem('cart_items', JSON.stringify(updatedCart));

    //     // Update state to reflect the change
    //     setAddedToCart((prevState) => ({
    //         ...prevState,
    //         [productId]: true,
    //     }));
    

    useEffect(() => {
        if (products.length > 0) {
            const productIds = products.map((product) => product.id);
        }
    }, [products]);
    


    useEffect(function() {
        if(localStorage.getItem('cart_code') === null) {
            localStorage.setItem('cart_code', randomValue);
        }
    }, [])


    // Fetch products from Django API when component mounts
    useEffect(() => {
        setLoading(true)
            api.get('products')  // Update this URL to your Django endpoint

                .then((response) => {
                    setProducts(response.data);
                    console.log(response.data) // Store the fetched products in state
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    setLoading(false);
                });
    }, []);  // Empty dependency array to fetch data only once on component mount

    // const handleAddToCart = (item) => {
    //     toast.success("Added To Cart", {
    //         position: "bottom-right"
    //     });

    //     dispatch(addToCart(item));  // Dispatch addToCart action
    // };


    const SkeletonCard = () => (
        <div className="itemsImageProductPageOne">
            <div className="imgBloCkitemsImageProductPageOne">
                <Skeleton height={150} width={150} />
            </div>
            <div className="productNameProduc">
                <Skeleton height={20} width={120} />
                <div className="productNameProductRating">
                    <Skeleton height={20} width={80} />
                </div>
                <div className="priceProductDetailPage">
                    <Skeleton height={20} width={100} />
                </div>
                <div className="offProductPage">
                    <Skeleton height={20} width={140} />
                </div>
                <div className="freeDeliveryHomepage">
                    <Skeleton height={20} width={100} />
                </div>
            </div>
        </div>
    );


    return (
        <div className="productPage">
            <div className="productTopBanner">
                <div className="productTopBannerItems">Electronics</div>
                <div className="productTopBannerItemsSubMenu">Mobiles & Accessories</div>
                <div className="productTopBannerItemsSubMenu">Laptops & Accessories</div>
                <div className="productTopBannerItemsSubMenu">TV & Home Entertainment</div>
                <div className="productTopBannerItemsSubMenu">Audio</div>
                <div className="productTopBannerItemsSubMenu">Cameras</div>
                <div className="productTopBannerItemsSubMenu">Computer Peripherals</div>
                <div className="productTopBannerItemsSubMenu">Smart Technology</div>
                <div className="productTopBannerItemsSubMenu">Musical Instruments</div>
                <div className="productTopBannerItemsSubMenu">Office & Stationary</div>
            </div>

            <div className="productsPageMain">
                <div className="productsPageMainLeftCategory">
                    <div className="productsPageMainLeftCategoryTitle">Category</div>
                    <div className="productsPageMainLeftCategoryContent">
                        <div className="productsPageMainLeftCategoryTitleContent">Computers & Accessories</div>
                        <div className="productsPageMainLeftCategoryContentSub">Macbooks</div>
                        <div className="productsPageMainLeftCategoryContentSub">Amazon Prime</div>
                        <div className="productsPageMainLeftCategoryContentSub">Average Customer Review</div>

                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />

                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <div className="andUp"> & Up</div>
                        </div>

                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />

                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <div className="andUp"> & Up</div>
                        </div>

                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <div className="andUp"> & Up</div>
                        </div>

                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />

                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <div className="andUp"> & Up</div>
                        </div>

                        <div className="productsPageMainLeftCategoryContentSub">Amazon Prime</div>
                        <div className="productsPageMainLeftCategoryContentSub">Average Customer Review</div>

                        <div className="productsPageMainLeftCategoryContentSub">Amazon Prime</div>
                        <div className="productsPageMainLeftCategoryContentSub">Average Customer Review</div>

                        <div className="productsPageMainLeftCategoryContentSub">Amazon Prime</div>
                        <div className="productsPageMainLeftCategoryContentSub">Average Customer Review</div>

                        <div className="productsPageMainLeftCategoryContentSub">Amazon Prime</div>
                        <div className="productsPageMainLeftCategoryContentSub">Average Customer Review</div>

                        <div className="productsPageMainLeftCategoryContentSub">Amazon Prime</div>
                        <div className="productsPageMainLeftCategoryContentSub">Average Customer Review</div>



                    </div>
                </div>

                <div className="productsPageMainRight">
                    <div className="productsPageMainRightTopBanner">
                        1-5 of {products.length} results
                    </div>

                    <div className="itemsImageProductPage">
                        {loading ? (
                            // Show Skeleton Loader
                            Array.from({ length: products.length }).map((_, index) => (
                                <div className="itemsImageProductPageOne" key={index}>
                                    <Skeleton height={150} width={150} />
                                    <Skeleton height={20} width={120} style={{ marginTop: 10 }} />
                                    <Skeleton height={20} width={100} style={{ marginTop: 5 }} />
                                </div>
                            ))
                        ) :
                            products.length > 0 ? (
                                products.map((item) => (
                                    <div className="itemsImageProductPageOne" key={item.id}>
                                        <div className="imgBloCkitemsImageProductPageOne">
                                            <img
                                                src={`${BASE_URL}${item.image}`}
                                                className="productImageProduct"
                                                alt="Product Image"
                                            />
                                        </div>
                                        <div className="productNameProduc">
                                            <div>{item.name}</div>
                                            <div className="productNameProductRating">
                                                {/* Displaying Rating */}
                                                <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                                                <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                                                <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                                                <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                                                <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                                            </div>
                                            <div className="priceProductDetailPage">
                                                <div className="currencyText"></div>
                                                <div className="rateHomeDetail">
                                                    <div className="rateHomeDetailsPrice">{item.price}</div>
                                                    <div className="addtobasketBtn"  onClick={() => add_item(item.id)}>
                                                     Add to cart
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="offProductPage">Upto 10% Off on select cards</div>
                                            <div className="freeDeliveryHomepage">Free Delivery By Amazon</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No Product Found</p>
                            )}
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Products;


