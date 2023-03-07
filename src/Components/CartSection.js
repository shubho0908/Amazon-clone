import React from "react";
import Navbar from "./Navbar";
import "./cart.css";
import { useSelector } from "react-redux";
function CartSection() {
  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);

  return (
    <>
      <Navbar />
      <div className="entire-section">
          <p style={{ margin: 0 }} className="cart-head">
            Your Cart
          </p>
        <div className="cart-section">
          <div className="cart-details">
            <div className="cart-item">
              {CartItems.map((item) => {
                return (
                  <div className="cart-data" key={item.id}>
                    <img src={item.image} alt="" className="cart-img" />
                    <div className="cart-all-data">
                      <p className="cart-title">{item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="checkout-section">Checkout</div>
        </div>
      </div>
    </>
  );
}

export default CartSection;
