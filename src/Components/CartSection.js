import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./cart.css";
import { AddToList, RemoveList } from "../action/List";
import { IncreaseQuantity, DecreaseQuantity } from "../action/Cart";
import { RemoveCart } from "../action/Cart";
import save from "../imgs/save.png";
import saved from "../imgs/saved.png";
import Delete from "../imgs/delete.png";
import Empty from "../imgs/cart-empty.png";
import { useSelector, useDispatch } from "react-redux";

function CartSection() {
  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const dispatch = useDispatch();
  const [AddedIds, setAddedIds] = useState([]);
  const [SubTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = CartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubTotal(newSubtotal);
  }, [CartItems]);

  const totalQuantity = CartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    // Update the added ids whenever the list items change
    const ids = ListItems.map((item) => item.id);
    setAddedIds(ids);
  }, [ListItems]);

  const isAdded = (itemId) => {
    // Check if the item id is in the added ids
    return AddedIds.includes(itemId);
  };

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
              ? { height: "40vh" }
              : { height: "100%" }
          }
          className="cart-section"
        >
          <div className="cart-details">
            <div
              style={
                CartItems && CartItems.length === 0
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="empty-cart"
            >
              <img src={Empty} className="empty-cart-img" />
            </div>
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
                        <p
                          style={
                            (item && item.category === "men's clothing") ||
                            item.category === "women's clothing"
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          className="cart-size"
                        >
                          Size: {item.size ? item.size : "Not choosen"}
                        </p>
                      </div>
                      <div className="more-buttons">
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
                        </div>
                        <div className="right-btns">
                          <div
                            onClick={() => {
                              if (!isAdded(item.id)) {
                                dispatch(AddToList(item));
                              } else {
                                dispatch(RemoveList(item.id));
                              }
                            }}
                            className="save-btn"
                          >
                            <img
                              src={isAdded(item.id) ? saved : save}
                              className="save-img"
                            />
                            <p>Save</p>
                          </div>
                          <div
                            onClick={() => dispatch(RemoveCart(item.id))}
                            className="delete-btn"
                          >
                            <img src={Delete} className="delete-img" />
                            <p>Delete</p>
                          </div>
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
            <div className="congrats">
              <p>
                Congrats! You're eligible for <b>Free Delivery</b>.
              </p>
            </div>
            <div className="total">Sub-Total: ${SubTotal.toFixed(1)}</div>
            <p className="total-items">Number of items: {totalQuantity}</p>
            <button className="payment">Payment</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartSection;
