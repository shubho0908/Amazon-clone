import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from './Footer'
import './productpage.css'

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetch(`https://fakestoreapi.com/products/${id}`);
      const new_data = await data.json();
      setProduct(new_data);
      console.log(product);
    };
    getProducts();
  }, []);

  return (
    <>
    <Navbar/>
      <div className="product-page">
        <div className="product-data">
          <div className="item-image">
          <img src={product.image} className={`item-img ${product.image ? 'img-style' : ''}`} />

          </div>
          <div className="product-details">
            <p className="item-title">{product.title}</p>
            <p className="item-desc">{product.description}</p>
          </div>
        </div>
      </div>
        <Footer/>
    </>
  );
}

export default ProductPage;
