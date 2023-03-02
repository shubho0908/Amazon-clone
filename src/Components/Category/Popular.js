import React, { useState } from "react";
import "./popular.css";
import Deals from "../Deals";

// IMAGES

import Men from "./Img/men.png";
import Women from "./Img/women.png";
import Jwellery from "./Img/jwelery.png";
import Electronics from "./Img/pc.png";
import MenWhite from "./Img/men-white.png";
import WomenWhite from "./Img/women-white.png";
import JwelleryWhite from "./Img/jwelery-white.png";
import ElectronicsWhite from "./Img/pc-white.png";

function Popular() {
  return (
    <>
      <div className="popular">
        <div className="popular-data">
          <p className="popular-head">Popular categories 🌟</p>
        </div>
        <div className="popular-items">
          <img src={Electronics} className="electronics" />
          <img src={Jwellery} className="jwellery" />
          <img src={Men} className="men" />
          <img src={Women} className="women" />
        </div>
      </div>
      <Deals/>
    </>
  );
}

export default Popular;
