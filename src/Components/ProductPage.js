import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetch(`https://fakestoreapi.com/products/${id}`);
      const new_data = await data.json();
      setProduct(new_data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    console.log(product);
  }, [product]);

  return <div>ProductPage</div>;
}

export default ProductPage;
