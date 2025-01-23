import React from 'react'
import NavbarBelt from './NavbarBelt/navbarBelt'
import NavbarBanner from './NavbarBanner/navbarBanner'

const Navbar = ({numCartItems}) => {
  return (
    <div className='navbar'>
        <NavbarBelt numCartItems={numCartItems}/>
        <NavbarBanner/>
    </div>
  )
}

export default Navbar