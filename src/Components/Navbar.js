import { React, useEffect } from "react";
import Logo from "../imgs/logo.png";
import search from "../imgs/search.png";
import wishlist from "../imgs/wishlist.png";
import cart from "../imgs/cart.png";
import notify from "../imgs/notify.png";
import Default from "../imgs/default.png";
import down from "../imgs/down.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);

  return (
    <>
      <div className="navbar">
        <div className="left-section">
          <Link to="/home">
            <img src={Logo} className="logo" />
          </Link>
          <div className="search-bar">
            <input type="text" className="search-box" placeholder="Search..." />
            <button className="search-btn">
              <img src={search} className="search-img" />
            </button>
          </div>
        </div>
        <div className="right-section">
          <Link to="/wishlists">
            <img src={wishlist} className="wishlist" />
            <p className="list-count">{ListItems.length}</p>
          </Link>
          <img src={cart} className="cart" />
          <img src={notify} className="notify" />
          <img src={Default} className="default" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
