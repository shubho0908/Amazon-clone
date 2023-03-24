import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./productpage.css";
import Rating from "../imgs/rating.png";
import added from "../imgs/added.png";
import add from "../imgs/not-added.png";
import { AddToCart, RemoveCart } from "../action/Cart";
import { useSelector, useDispatch } from "react-redux";
import VanillaTilt from "vanilla-tilt";
import LowerNav from "./LowerNav";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [Size, setSize] = useState("");
  const [AddedIds, setAddedIds] = useState([]);
  const [reviews, setReviews] = useState(null);
  const Quantity = 1;

  const tiltRef = useRef(null);

  document.title = `${product ? product.title : "Amazon"}`

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

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 10,
      speed: 100,
      transition: true,
      easing: "ease-out",
    });
  }, []);

  const handleAddToCart = () => {
    if (!isAdded(product.id)) {
      const item = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: Size,
        category: product.category,
        quantity: Quantity,
      };
      dispatch(AddToCart(item));
    } else {
      dispatch(RemoveCart(product.id));
    }
  };
  const handleAddToCart2 = () => {
    if (!isAdded(product.id)) {
      const item = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: Size,
        category: product.category,
        quantity: Quantity,
      };
      dispatch(AddToCart(item));
    } else {
    }
  };

  const limited = product && product.description;
  // const DescLimited = limited ? limited.slice(0, 200) + "." : "";

  return (
    <>
      <Navbar />
      <div
        style={product ? { height: "100%" } : { height: "100vh" }}
        className="product-page"
      >
        <div className={product ? `product-dataa animate` : `product-dataa`}>
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
            <div className="price-section">
              <div className="item-rating">
                <img src={product && Rating} className="rating-img" />
                <img src={product && Rating} className="rating-img" />
                <img src={product && Rating} className="rating-img" />
                <img src={product && Rating} className="rating-img" />
                <img src={product && Rating} className="rating-img" />
                <p className="rating-no">{product ? `(${reviews})` : ""}</p>
              </div>
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
                  onClick={() => setSize("S")}
                  className={`size ${Size === "S" ? "size-clicked" : ""}`}
                >
                  S
                </p>
                <p
                  onClick={() => setSize("M")}
                  className={`size ${Size === "M" ? "size-clicked" : ""}`}
                >
                  M
                </p>
                <p
                  onClick={() => setSize("L")}
                  className={`size ${Size === "L" ? "size-clicked" : ""}`}
                >
                  L
                </p>
                <p
                  onClick={() => setSize("XL")}
                  className={`size ${Size === "XL" ? "size-clicked" : ""}`}
                >
                  XL
                </p>
                <p
                  onClick={() => setSize("XXL")}
                  className={`size ${Size === "XXL" ? "size-clicked" : ""}`}
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
            {product ? (
              <div className="product-actual-price">
                <p className="price-one">Price:</p>
                <p className="price-two">${product.price}</p>
                <p className="mrp">${Math.round(product.price * 1.66)}</p>
              </div>
            ) : (
              ""
            )}

            <div
              style={product ? { display: "flex" } : { display: "none" }}
              className="buying-buttons"
            >
              <Link to="/cart">
                <button onClick={handleAddToCart2} className="buy-btn">
                  Buy Now
                </button>
              </Link>
              <button
                onClick={() => {
                  handleAddToCart();
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
          </div>
        </div>
      </div>
      <div className="lowerNav">
        <LowerNav />
      </div>
      {product ? <Footer /> : ""}
    </>
  );
}

export default ProductPage;
