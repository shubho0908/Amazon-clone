import React from "react";
import "./home.css";
import Delivery from "../imgs/delivery.png";
import Popular from "./Category/Popular";

function Home() {
  return (
    <>
        <div className="content">
        <div className="poster-area">
          <div className="poster-data">
            <p className="poster-head">Free Delivery!</p>
            <p className="poster-desc">
              Don't miss it out! Only today, get free <b style={{fontSize:"22px"}}>Next Day</b> delivery on all
              your orders.
            </p>
          </div>
          <button className="browse-btn">Browse products</button>
        </div>
        <img src={Delivery} className="delivery" />
        <Popular/>
        </div>
    </>
  );
}

export default Home;
