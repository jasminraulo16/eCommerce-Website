// import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar/navbar';
import HomeScreen from './Screen/HomeScreen/homeScreen';
import { Routes,Route } from 'react-router-dom';
import Products from './Screen/Products/products';
import Footer from './Component/Footer/footer';
import Cart from './Screen/Cart/cart';
import PageNotFound from './Screen/PageNotFound/pageNotFound';
import { useState,useEffect } from 'react';
import api from "./api";
import CheckOutPage from './Component/checkout/CheckOutPage';
import LoginPage from './Component/user/LoginPage';
import ProtectedRoute from './Component/ui/ProtectedRoute';
import UserProfile from './Component/UserAccount/UserProfile';
import OrderHistory from './Component/UserAccount/OrderHistory';
import PaymentStatus from './Component/payment/PaymentStatus';


const App = () => {

  const[numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code")
  useEffect(function(){
    if(cart_code){
      api.get(`get_cart_stat?cart_code=${cart_code}`)
      .then(res => {
        console.log(res.data)
        setNumberCartItems(res.data.num_of_items)
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  })

  return (
    <div className="App">
      <Navbar numCartItems={numCartItems} />
     
      <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/products' element={<Products setNumberCartItems={setNumberCartItems}/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element= {<ProtectedRoute><CheckOutPage/></ProtectedRoute>}/>
        <Route path='login' element={<LoginPage/>} />
        <Route path='/profile' element={<UserProfile/>} />
        <Route path='/history' element={<OrderHistory/>} />
        <Route path='payment-status' element={<PaymentStatus setNumberCartItems={setNumberCartItems}/>} />
        <Route path="*" element={<PageNotFound />} /> {/* Catch-all route */}
      </Routes>
      
      <Footer />

      
    </div>
  );
}

export default App;
