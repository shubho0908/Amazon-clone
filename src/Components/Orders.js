import React from "react";
import Navbar from "./Navbar";
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
                      <p className="order-quantity">{item.quantity}</p>
                    </div>
                  </div>
                );
              });
            })}
        </div>
      </div>
    </>
  );
}

export default Orders;
