import { React, useEffect, useState, useRef } from "react";
import Logo from "../imgs/logo.png";
import search from "../imgs/search.png";
import wishlist from "../imgs/wishlist.png";
import cart from "../imgs/cart.png";
import notify from "../imgs/notify.png";
import Default from "../imgs/default.png";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { app } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

function Navbar() {
  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [Products, setProducts] = useState([]);

  const searchResultsRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    const GetProducts = async () => {
      const data = await fetch("https://fakestoreapi.com/products");
      const new_data = await data.json();
      setProducts(new_data);
    };

    GetProducts();

    const handleClick = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchText("");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const searchResults = Products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <>
      <div className="navbar">
        <div className="left-section">
          <Link to="/home">
            <img src={Logo} className="logo" />
          </Link>
          <div className="search-bar">
            <input
              type="text"
              className="search-box"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
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
          <img
            src={user && user.photoURL ? user.photoURL : Default}
            className="default"
          />
        </div>
      </div>
      {searchText !== "" && (
        <div
          ref={searchResultsRef}
          className={`search-results ${searchResults.length ? "show" : ""}`}
        >
          {searchResults.length > 0 &&
            searchResults.map((product) => (
              <NavLink
                to={`/product/${product.id}`}
                key={product.id}
                className="nav-link"
              >
                <div className="search-results2" key={product.id}>
                  <div className="product-img">
                    <img src={product.image} className="product-image" />
                  </div>
                  <div className="product-data">
                    <p className="product-title">
                      {product.title.length > 50
                        ? product.title.slice(0, 50) + "..."
                        : product.title}
                    </p>
                    <p className="product-desc">
                      {product.description.length > 50
                        ? product.description.slice(0, 50) + "..."
                        : product.description}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
