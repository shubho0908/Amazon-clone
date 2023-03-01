import React from "react";
import "./home.css";
import Delivery from "../imgs/delivery.png";

function Home() {
  return (
    <>
      <div className="App">
        <div className="poster-area">
          <div className="poster-data">
            <p className="poster-head">Free Delivery!</p>
            <p className="poster-desc">
              Don't miss it out! Only today, get free Next Day delivery on all
              your orders.
            </p>
          </div>
          <button className="browse-btn">Browse products</button>
        </div>
        <img src={Delivery} className="delivery" />
      </div>
    </>
  );
}

export default Home;
