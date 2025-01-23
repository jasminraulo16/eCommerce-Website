import React from 'react';
import './navbarBelt.css';
import amazonLogo from '../../../Assets/amazonLogo.png';
import india from '../../../Assets/india.png';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { useSelector, useDispatch } from 'react-redux';

const NavbarBelt = ({ numCartItems }) => {

    const cartItems = useSelector((state) => state.cart.items);

    return (
        <div className='navbarBelt'>
            <div className="leftNavBelt">
                <Link to={'/'} className="leftNavBeltLogo" >
                    <img className='amazonLogoNavbar' src={amazonLogo} alt='amazonLogo' />
                    <span className='navbar_inLogo'>.in</span>
                </Link>
                <div className='navbarBeltLocation'>
                    <div className='navbarBeltLocationImg'>
                        <LocationOnOutlinedIcon className='navbarBeltLocationImgIcon' sx={{ fontSize: "22px" }} />
                    </div>
                    <div>
                        <div className='navbarBeltLocationTop'>Delivering to Pune 411032</div>
                        <div className='navbarBeltLocationBottom'>Update Location</div>
                    </div>
                </div>

            </div>
            <div className="navbarBeltSearchBox">
                <div className="navbarBeltSearchDiv">
                    <div className="navbarBeltSearchBoxAll">
                        <div className="navbarBeltSearchBoxAllText">All</div>
                        <ArrowDropDownOutlinedIcon sx={{ fontSize: "20px" }} />
                    </div>

                    <input type='text' className='navbarBeltInputSearchBox' placeholder='Search Amazon.in'></input>

                    <div className='searchIconNavbarBelt'>
                        <SearchIcon sx={{ fontSize: "26px" }} className='searchIconNavbarBeltIcon' />
                    </div>


                </div>
            </div>
            <div className="rightSideNavbarBelt">
                <div className="indianFlagCode">
                    <img src={india} className='indiaFlag'></img>
                    <div className='indiaCodeNavbarBelt'>EN <ArrowDropDownOutlinedIcon sx={{ fontSize: 16, margintop: 1, marginLeft: -0.4 }} className='indiaCodeNavbarBeltDrp' /></div>

                </div>
                <div className='helloSignInNavbarBelt'>
                    <Link to={'/profile'} className='navbarBeltLink'>
                    <div className='helloTopNavbarBelt'>Hello, User</div>
                    <div className='indiaCodeNavbarBelt'>Accounts & Lists</div>
                    </Link>
                </div>

                <div className='helloSignInNavbarBelt'>
                    <Link to={'/history'} className='navbarBeltLink'>
                    <div className='helloTopNavbarBelt'>Returns</div>
                    <div className='indiaCodeNavbarBelt'>& Orders</div>
                    </Link>
                </div>


                <Link to={'/cart'} className="helloSignInNavbarBelt">
                    {numCartItems == 0 ||
                        <span className='cartItemNumberNavbarBelt'>{numCartItems}</span>}
                    <div className="helloTopNavbarBelt"><ShoppingCartOutlinedIcon /> <span className='cartTitle'>Cart</span></div>


                </Link>



            </div>

        </div>
    )
}

export default NavbarBelt