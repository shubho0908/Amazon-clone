import React from "react";
import Navbar from "./Navbar";
import Footer from './Footer'
import './orders.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Orders() {
  const OrderItems = useSelector((state) => state.OrderAdded.OrderItems);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="orders-section">
        <div className="ordered-data">
          {OrderItems &&
            OrderItems.map((order) => {
              return order.map((item) => {
                return (
                  <div className="order">
                    <img src={item.image} className="order-img" />
                    <div className="order-text">
                      <p className="order-head">{item.title}</p>
                      <p className="order-quantity">Number of items: {item.quantity}</p>
                      {item.category === "men's clothing" || item.category === "women's clothing" ? (<p className="order-size">Size: {item.size}</p>) : ""}
                      <p className="order-price">Price: {item.price}</p>
                      <p className="order-dispatch">Soon to be dispatch!</p>
                    </div>
                  </div>
                );
              });
            })}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Orders;
