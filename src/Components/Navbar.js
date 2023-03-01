import React from "react";
import Logo from "../imgs/logo.png";
import search from "../imgs/search.png";
import wishlist from "../imgs/wishlist.png";
import cart from "../imgs/cart.png";
import notify from "../imgs/notify.png";
import Default from "../imgs/default.png";
import down from "../imgs/down.png";
import "./navbar.css";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="left-section">
          <img src={Logo} className="logo" />
          <div className="search-bar">
            <input type="text" className="search-box" placeholder="Search..." />
            <button className="search-btn">
              <img src={search} className="search-img" />
            </button>
          </div>
        </div>
        <div className="right-section">
          <img src={wishlist} className="wishlist" />
          <img src={cart} className="cart" />
          <img src={notify} className="notify" />
          <img src={Default} className="default" />
          <img src={down} className="down" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
