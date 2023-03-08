import React from "react";
import Navbar from "./Navbar";
import "./payment.css";
function Payment() {
  return (
    <>
      <Navbar />
      <div className="payment-page">
        <div className="more-data">
          <div className="shipping-data">
            <div className="shipping-head">Shipping details</div>
            <div className="user-data-form">
              <div className="country">
                <p className="country-name">Country</p>
                <input type="text" placeholder="Ex: India" />
              </div>
              <div className="user-name">
                <p className="user-fullname">Name</p>
                <input type="text" placeholder="Full name" />
              </div>
            </div>
          </div>
          <div className="payment-data">PAYMENT</div>
        </div>
      </div>
    </>
  );
}

export default Payment;
