import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./productpage.css";
import Rating from "../imgs/rating.png";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [Size, setSize] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetch(`https://fakestoreapi.com/products/${id}`);
      const new_data = await data.json();
      setProduct(new_data);
    };
    getProducts();
  }, [id]);

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
              <p className="rating-no">{product ? "5" : ""}</p>
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
            <div style={product ? {display:"flex"}:{display:"none"}} className="buying-buttons">
              <button className="buy-btn">Buy Now</button>
              <button className="add-cart-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
