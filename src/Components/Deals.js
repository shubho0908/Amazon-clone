import { React, useEffect, useState } from "react";
import "./deals.css";
import Add from "../imgs/heart.png";
import Added from "../imgs/red-heart.png";

function Deals() {
  const [AllProducts, setAllProducts] = useState([]);
  const [Listadded, setListadded] = useState(false);

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
      <p className="deals-head">Hot Deals 🔥</p>
      <div className="deal-items">
        {AllProducts &&
          AllProducts.map((items) => {
            return (
              <div className="card" key={items.id}>
                <div className="card-img-data">
                  <img src={items.image} className="card-img" />
                  <img onClick={() => {
                    setListadded(!Listadded)
                  }} src={Listadded ? Added : Add} className="add-list" />
                  <button className="view">View product</button>
                </div>
                <div className="card-data">
                  <p className="card-title">
                    {items.title.length >= 32
                      ? items.title.slice(0, 32) + ".."
                      : items.title}
                  </p>
                  <p className="card-category">{items.category}</p>
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
  );
}

export default Deals;
