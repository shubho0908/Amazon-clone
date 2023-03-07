import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./cart.css";
import { IncreaseQuantity, DecreaseQuantity } from "../action/Cart";
import { RemoveCart } from "../action/Cart";
import { useSelector, useDispatch } from "react-redux";

function CartSection() {
  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const dispatch = useDispatch();
  const [SubTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = CartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubTotal(newSubtotal);
  }, [CartItems]);

  return (
    <>
      <Navbar />
      <div className="entire-section">
        <p style={{ margin: 0 }} className="cart-head">
          Your Cart
        </p>
        <div
          style={
            CartItems && CartItems.length === 0
              ? { height: "35vh" }
              : { height: "100%" }
          }
          className="cart-section"
        >
          <div className="cart-details">
            <div className="cart-item">
              {CartItems.map((item) => {
                return (
                  <div className="cart-data" key={item.id}>
                    <img src={item.image} alt="" className="cart-item-img" />
                    <div className="cart-all-data">
                      <p className="cart-title">{item.title}</p>
                      <div className="cart-price">
                        <p className="cart-discount">
                          ${(item.price * item.quantity).toFixed(1)}
                        </p>
                        <p className="cart-size">
                          Size: {item.size ? item.size : "Not choosen"}
                        </p>
                        <div className="quantity-section">
                          <button
                            onClick={() => dispatch(IncreaseQuantity(item.id))}
                            className="increase"
                          >
                            +
                          </button>
                          <p className="total-items">{item.quantity}</p>
                          <button
                            onClick={() => dispatch(DecreaseQuantity(item.id))}
                            className="decrease"
                            disabled={
                              item && item.quantity === 1 ? true : false
                            }
                          >
                            -
                          </button>
                          <button onClick={() => dispatch(RemoveCart(item.id))}> DELETE</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={
              CartItems && CartItems.length === 0
                ? { display: "none" }
                : { display: "block" }
            }
            className="checkout-section"
          >
            Total: ${SubTotal}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartSection;
