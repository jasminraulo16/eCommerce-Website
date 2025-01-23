import React from 'react'
import './navbarBanner.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
const NavbarBanner = () => {
  const options = [
    { "name": "Fresh" },
    { "name": "Amazon miniT" },
    { "name": "Sell" },
    { "name": "Best Sellers" },
    { "name": "Today's Deals" }, { "name": "Mobiles" }, { "name": "Electronics" }, { "name": "Prime" }, { "name": "Customer Service" }, { "name": "Fashion" }, { "name": "Home & Kitchen" }
  ]
  return (
    <div className="navbarBanner">
      <div className="navbarBannerOptionsLeft">

        <div className='optionsNavbarBanner'>
          <MenuIcon sx={{ fontSize: "24px" }} />
          <div className='allOptionsNavbarBanner'>All</div>
        </div>

        {
          options.map((item, ind) => {
            return (
              <Link to={'/products'} className='optionsNavbarBanner' key={ind}>
                <div className='allOptionsNavbarBanner'>{item.name}</div>
              </Link>

            )
          })
        }

        


      </div>
      <div className="navbarBannerRightSide">
        <img src="https://f.media-amazon.com/images/G/31/img19/SiddMiniTV/26MayHero/SWM_400x391._CB557661637_.jpg" alt='amazonPrime Logo' />
      </div>
    </div>
  )
}

export default NavbarBanner