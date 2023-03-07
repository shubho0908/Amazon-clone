import React, { useState, useEffect, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./productpage.css";
import Rating from "../imgs/rating.png";
import added from "../imgs/added.png";
import add from "../imgs/not-added.png";
import free from "../imgs/free.png";
import { AddToCart, RemoveCart } from "../action/Cart";
import { useSelector, useDispatch } from "react-redux";
import tick from "../imgs/tick.png";
import VanillaTilt from "vanilla-tilt";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [Size, setSize] = useState("");
  const [pincode, setPincode] = useState("");
  const [AddedIds, setAddedIds] = useState([]);
  const [pinDisplay, setpinDisplay] = useState("none");
  const [invalidDisplay, setinvalidDisplay] = useState("none");
  const [reviews, setReviews] = useState(null);

  const tiltRef = useRef(null);

  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetch(`https://fakestoreapi.com/products/${id}`);
      const new_data = await data.json();
      setProduct(new_data);
    };

    const randomNumber = Math.floor(Math.random() * 81) + 20;
    setReviews(randomNumber);

    getProducts();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ids = CartItems.map((item) => item.id);
    setAddedIds(ids);
  }, [CartItems]);

  const isAdded = (itemId) => {
    return AddedIds.includes(itemId);
  };

  const handlePincode = (e) => {
    setPincode(e.target.value);
  };

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 10,
      speed: 100,
      transition: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-dataa">
          <div className="item-image">
            <img
              ref={tiltRef}
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
                  if (!isAdded(product.id)) {
                    dispatch(AddToCart(product));
                  } else {
                    dispatch(RemoveCart(product.id));
                  }
                }}
                className="add-cart-btn"
              >
                <img
                  src={isAdded(product.id) ? added : add}
                  className="cart-img"
                />
                <p style={{ marginLeft: "8px" }} className="cart-text">
                  {isAdded(product.id) ? "Added" : "Add"}
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
                  type="number"
                  inputMode="numeric"
                  className="pincode"
                  placeholder="Pincode"
                  onChange={handlePincode}
                  maxlength="6"
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

      <Footer />
    </>
  );
}

export default ProductPage;
