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
import { useNavigate } from "react-router-dom";
import LowerNav from "./LowerNav";

function CartSection() {
  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const dispatch = useDispatch();
  const [AddedIds, setAddedIds] = useState([]);
  const [SubTotal, setSubTotal] = useState(0);
  const [promocode, setPromocode] = useState("");
  const [discountCode, setdiscountCode] = useState("");
  const [CorrectCode, setCorrectCode] = useState(false);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  document.title = "Cart section"

  useEffect(() => {
    const newSubtotal = CartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubTotal(newSubtotal);
  }, [CartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Update the added ids whenever the list items change
    const ids = ListItems.map((item) => item.id);
    setAddedIds(ids);
  }, [ListItems]);

  const isAdded = (itemId) => {
    // Check if the item id is in the added ids
    return AddedIds.includes(itemId);
  };

  const DiscountPrice = (SubTotal * 0.2).toFixed(2);
  const TaxPrice = (SubTotal * 0.05).toFixed(2);

  const handlePromocode = (event) => {
    const value = event.target.value.replace(/\s+/g, "");
    setPromocode(value);
  };

  const totalPrice1 = (
    parseFloat(SubTotal) +
    parseFloat(TaxPrice) -
    parseFloat(DiscountPrice)
  ).toFixed(2);
  const totalPrice2 = (parseFloat(SubTotal) + parseFloat(TaxPrice)).toFixed(2);

  const totalAmount = localStorage.getItem("TotalAmount");
  const TotalValue = (data) => {
    setTotal(data);
    localStorage.setItem("TotalAmount", data);
  };

  return (
    <>
      <Navbar />

      <div className="entire-section">
        <p
          style={{ margin: 0 }}
          className={CartItems ? `cart-head animate` : `cart-head`}
        >
          Your Cart
        </p>
        <div
          style={
            CartItems && CartItems.length === 0
              ? { height: "40vh" }
              : { height: "100%" }
          }
          className={CartItems ? `cart-section animate` : `cart-section`}
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
                    <img
                      onClick={() => navigate(`/product/${item.id}`)}
                      src={item.image}
                      alt=""
                      className="cart-item-img"
                    />
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
                          <div className="save-btn">
                            <img
                              onClick={() => {
                                if (!isAdded(item.id)) {
                                  dispatch(AddToList(item));
                                } else {
                                  dispatch(RemoveList(item.id));
                                }
                              }}
                              src={isAdded(item.id) ? saved : save}
                              className="save-img"
                            />
                            <p>Save</p>
                          </div>
                          <div className="delete-btn">
                            <img
                              onClick={() => dispatch(RemoveCart(item.id))}
                              src={Delete}
                              className="delete-img"
                            />
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
                <p style={{ marginTop: "5px", marginBottom: "0px" }}>
                  Use code <b>SHUBHO20</b> for 20% discount.
                </p>
              </p>
            </div>
            <hr className="horizontal" />
            <div className="promocode">
              <input
                type="text"
                placeholder="Promocode"
                onChange={handlePromocode}
                value={promocode}
              />
              <button
                onClick={() => {
                  if (promocode === "SHUBHO20") {
                    TotalValue(totalPrice1);
                    setdiscountCode(promocode);
                    setCorrectCode(true);
                  } else if (promocode !== "SHUBHO20") {
                    setdiscountCode(promocode);
                    TotalValue(totalPrice2);
                    setCorrectCode(false);
                  }
                }}
                className="promocode-btn"
              >
                Apply
              </button>
            </div>
            <p
              style={
                CorrectCode === true
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="applied"
            >
              <b>SHUBHO20</b> has been applied!
            </p>
            <p
              style={
                CorrectCode === false && discountCode !== ""
                  ? { display: "block" }
                  : { display: "none" }
              }
              className="applied2"
            >
              Enter a valid promocode.
            </p>
            <hr className="horizontal" />

            <div className="money-data">
              <div className="money-1">
                <p className="total">Sub-Total</p>
                <p className="total-price">${SubTotal.toFixed(2)}</p>
              </div>
              <div
                style={
                  CorrectCode === true
                    ? { display: "flex" }
                    : { display: "none" }
                }
                className="money-2"
              >
                <p className="item-discount">Discount</p>
                <p className="item-discount2">(20%) - ${DiscountPrice}</p>
              </div>
              <div className="money-3">
                <p className="item-delivery">Delivery</p>
                <p className="item-delivery2">$0.00</p>
              </div>
              <div className="money-4">
                <p className="item-tax">Tax</p>
                <p className="item-tax2">(5%) + ${TaxPrice}</p>
              </div>
            </div>
            <hr className="horizontal" />
            <div className="money-5">
              <p className="total">Total</p>
              <p
                style={
                  CorrectCode === true
                    ? { display: "block" }
                    : { display: "none" }
                }
                className="total-price"
              >
                ${totalPrice1}
              </p>
              <p
                style={
                  CorrectCode !== true
                    ? { display: "block" }
                    : { display: "none" }
                }
                className="total-price2"
              >
                ${totalPrice2}
              </p>
            </div>
            <div className="payment-btn">
              <button
                onClick={() => {
                  navigate("/payment");
                  if (CorrectCode === true) {
                    TotalValue(totalPrice1);
                  } else {
                    TotalValue(totalPrice2);
                  }
                }}
                className="payment"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lowerNav">
        <LowerNav />
      </div>
      <Footer />
    </>
  );
}

export default CartSection;
