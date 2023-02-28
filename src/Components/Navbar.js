import React from 'react'
import Logo from '../imgs/logo.png'
import search from '../imgs/search.png'
import './navbar.css'

function Navbar() {
  return (
    <>
    <div className="navbar">
      <div className="left-section">
          <img src={Logo} className="logo" />
        <div className="search-bar">
          <input type="text" className="search-box" placeholder='Search...'/>
          <button className="search-btn">
            <img src={search} className="search-img" />
          </button>
        </div>
      </div>
      <div className="right-section"></div>
    </div>
    </>
  )
}

export default Navbar