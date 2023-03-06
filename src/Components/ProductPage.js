import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./productpage.css";
import Rating from "../imgs/rating.png";
import added from "../imgs/added.png";
import add from "../imgs/not-added.png";
import free from "../imgs/free.png";
import Add from "../imgs/heart.png";
import tick from "../imgs/tick.png";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [Size, setSize] = useState("");
  const [cart, setCart] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pinDisplay, setpinDisplay] = useState("none");
  const [invalidDisplay, setinvalidDisplay] = useState("none");
  const [reviews, setReviews] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetch(`https://fakestoreapi.com/products/${id}`);
      const new_data = await data.json();
      setProduct(new_data);
      const data2 = await fetch(
        `https://fakestoreapi.com/products/category/${new_data.category}`
      );
      const new_data2 = await data2.json();
      const slicedData = new_data2.slice(0, 3);
      setSimilar(slicedData);
    };

    const randomNumber = Math.floor(Math.random() * 81) + 20;
    setReviews(randomNumber);

    getProducts();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePincode = (e) => {
    setPincode(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-dataa">
          <div className="item-image">
            <img
              src={product.image}
              className={`item-img ${product.image ? "img-style" : ""}`}
            />
          </div>
          <div className="product-details">
            <p className="item-title">{product.title}</p>
            <p className="item-desc">{product.description}</p>
            <div className="item-rating">
              <img src={product && Rating} className="rating-img" />
              <img src={product && Rating} className="rating-img" />
              <img src={product && Rating} className="rating-img" />
              <img src={product && Rating} className="rating-img" />
              <img src={product && Rating} className="rating-img" />
              <p className="rating-no">{product ? `(${reviews})` : ""}</p>
            </div>
            {product ? <hr className="horizontal" /> : ""}
            <div
              style={
                product.category === "men's clothing" ||
                product.category === "women's clothing"
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="cloth-size"
            >
              <p className="choose">Choose a size</p>
              <div className="options">
                <p
                  onClick={() => setSize("small")}
                  className={`size ${Size === "small" ? "size-clicked" : ""}`}
                >
                  S
                </p>
                <p
                  onClick={() => setSize("medium")}
                  className={`size ${Size === "medium" ? "size-clicked" : ""}`}
                >
                  M
                </p>
                <p
                  onClick={() => setSize("large")}
                  className={`size ${Size === "large" ? "size-clicked" : ""}`}
                >
                  L
                </p>
                <p
                  onClick={() => setSize("x-large")}
                  className={`size ${Size === "x-large" ? "size-clicked" : ""}`}
                >
                  XL
                </p>
                <p
                  onClick={() => setSize("xx-large")}
                  className={`size ${
                    Size === "xx-large" ? "size-clicked" : ""
                  }`}
                >
                  XXL
                </p>
              </div>
            </div>
            {(product && product.category === "men's clothing") ||
            product.category === "women's clothing" ? (
              <hr className="horizontal" />
            ) : (
              ""
            )}
            <div
              style={product ? { display: "flex" } : { display: "none" }}
              className="buying-buttons"
            >
              <button className="buy-btn">Buy Now</button>
              <button
                onClick={() => {
                  setCart(true);
                  if (cart === true) {
                    setCart(false);
                  } else {
                  }
                }}
                className="add-cart-btn"
              >
                <img src={cart === true ? added : add} className="cart-img" />
                <p style={{ marginLeft: "8px" }} className="cart-text">
                  {cart === true ? "Added" : "Add"}
                </p>
              </button>
            </div>
            <div
              style={product ? { display: "block" } : { display: "none" }}
              className="extra-features"
            >
              <div className="free-delivery">
                <img src={free} className="free" />
                <p className="free-head">Free Delivery</p>
              </div>
              <div className="free-data">
                <input
                  type="text"
                  className="pincode"
                  placeholder="Pincode"
                  onChange={handlePincode}
                  maxLength="6"
                  value={pincode}
                />
                <button
                  onClick={() => {
                    if (pincode && pincode.length === 6) {
                      setpinDisplay("flex");
                      setinvalidDisplay("none");
                    } else {
                      setpinDisplay("none");
                      setinvalidDisplay("block");
                    }
                  }}
                  className="pin-check"
                >
                  Check
                </button>
              </div>
              <div style={{ display: pinDisplay }} className="free-check">
                <img src={tick} className="tick" />
                <p className="available">
                  <b>Free Delivery</b> is available at your location.
                </p>
              </div>
              <p style={{ display: invalidDisplay }} className="invalid">
                Please enter a valid pincode.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="similar-items">
        <p className="similar-head">Similar Items you might like</p>
        <div className="lists-items">
          {similar &&
            similar.map((items) => {
              return (
                <div className="card" key={items.id}>
                  <div className="card-img-data">
                    <img src={items.image} className="card-img" />
                    <img onClick={() => {}} src={Add} className="add-list3" />
                    <NavLink to={`/product/${items.id}`} key={items.id}>
                      <button className="view">View product</button>
                    </NavLink>
                  </div>
                  <div className="card-data">
                    <p className="card-title">
                      {items.title.length >= 32
                        ? items.title.slice(0, 32) + ".."
                        : items.title}
                    </p>
                    <div className="category-rating">
                      <p className="card-category">{items.category}</p>
                      <div className="rating">
                        <img src={Rating} className="rating-img" />
                        <img src={Rating} className="rating-img" />
                        <img src={Rating} className="rating-img" />
                        <img src={Rating} className="rating-img" />
                        <img src={Rating} className="rating-img" />
                        <p className="rating-text">5</p>
                      </div>
                    </div>
                    <div className="card-price">
                      <p className="discount">${items.price}</p>
                      <p className="mrp">${Math.round(items.price * 1.66)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
