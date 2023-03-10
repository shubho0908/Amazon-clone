import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./orders.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Done from "../imgs/order-done.png";
import OrderNow from "../imgs/order-now.gif";

function Orders() {
  const OrderItems = useSelector((state) => state.OrderAdded.OrderItems);
  const navigate = useNavigate();
  const total = localStorage.getItem("TotalAmount");
  return (
    <>
      <Navbar />
      <div className="orders-section">
        <div
          style={
            OrderItems.length === 0
              ? { textAlign: "center" }
              : { textAlign: "unset" }
          }
          className={OrderItems ? `ordered-data animate` : `ordered-data`}
        >
          <p className="order-head-text">Your Orders</p>
          <div
            style={
              OrderItems.length === 0
                ? { display: "block" }
                : { display: "none" }
            }
            className="order-now-section"
          >
            <div className="empty-order">
              <img src={OrderNow} className="no-orders" />
              <div className="no-orders-txt"></div>
            </div>
          </div>
          {OrderItems &&
            OrderItems.map((order) => {
              return order.map((item) => {
                return (
                  <NavLink
                    to={`/product/${item.id}`}
                    key={item.id}
                    className="nav-link2"
                  >
                    <div className="order">
                      <img src={item.image} className="order-img" />
                      <div className="order-text">
                        <p className="order-head">{item.title}</p>
                        <p className="order-category">{item.category}</p>
                        <p className="order-quantity">
                          Number of items: <b>{item.quantity}</b>
                        </p>
                        {item.category === "men's clothing" ||
                        item.category === "women's clothing" ? (
                          <p className="order-size">
                            Size: <b>{item.size}</b>
                          </p>
                        ) : (
                          ""
                        )}
                        <div className="order-success">
                          <img src={Done} className="order-done" />
                          <p
                            style={{
                              marginLeft: "5px",
                              marginTop: 0,
                              marginBottom: 0,
                            }}
                            className="order-dispatch"
                          >
                            Ordered succesfully! Soon to be dispatch!
                          </p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                );
              });
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
