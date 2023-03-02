import { React, useEffect, useState } from "react";
import "./deals.css";

function Deals() {
  const [AllProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const GetProducts = async () => {
      const data = await fetch("https://fakestoreapi.com/products");
      const new_data = await data.json();
      setAllProducts(new_data);
    };

    GetProducts();
  }, []);

  return (
    <div className="Deals">
      <p className="deals-head">Hot Deals</p>
      <div className="deal-items">
        {AllProducts &&
          AllProducts.map((items) => {
            return (
              <div className="card" key={items.id}>
                <img src={items.image} className="card-img" />

                <p className="card-title">{items.title.slice(0, 50) + "..."}</p>
                <p className="card-category">{items.category}</p>
                <div className="card-price">
                  <p className="discount">{items.price}</p>
                  <p className="mrp">{Math.round(items.price*1.66)}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Deals;
