import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./cart.css";
import { useSelector } from "react-redux";
function CartSection() {
  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);

  const Clear=()=>{
    localStorage.clear('CartItems')
  }

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
                    <img src={item.image} alt="" className="cart-item-img" />
                    <div className="cart-all-data">
                      <p className="cart-title">{item.title}</p>
                      <div className="cart-price">
                        <p className="cart-discount">${item.price}</p>
                        <p className="cart-size">{item.size}</p>
                        <div className="quantity-section">
                          <button className="increase">+</button>
                          <input
                            type="number"
                            disabled
                            className="item-no"
                            value={1}
                          />
                          <button onClick={Clear} className="increase">-</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="checkout-section">Checkout</div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default CartSection;
