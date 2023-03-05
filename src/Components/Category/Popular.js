import React, { useState, useEffect } from "react";
import "./popular.css";
import Deals from "../Deals";
import Men from "./Men";
import Women from "./Women";
import Electronics from "./Electronics";
import Jewelery from "./Jewelery";

import men from "./Img/men.png";
import women from "./Img/women.png";
import jwellery from "./Img/jwelery.png";
import electronics from "./Img/pc.png";
import MenWhite from "./Img/men-white.png";
import WomenWhite from "./Img/women-white.png";
import JwelleryWhite from "./Img/jwelery-white.png";
import ElectronicsWhite from "./Img/pc-white.png";

function Popular() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDeals, setShowDeals] = useState(true);


  const images = [
    {
      src: electronics,
      whiteSrc: ElectronicsWhite,
      className: "electronics",
    },
    {
      src: jwellery,
      whiteSrc: JwelleryWhite,
      className: "jwellery",
    },
    { src: men, whiteSrc: MenWhite, className: "men" },
    { src: women, whiteSrc: WomenWhite, className: "women" },
  ];

  const handleImageClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
      setShowDeals(false);
    }
  };

  return (
    <>
      <div className="popular">
        <div className="popular-data">
          <p className="popular-head">Popular categories 🌟</p>
        </div>
        <div className="popular-items">
          {images.map((image, index) => (
            <img
              key={index}
              onClick={() => handleImageClick(index)}
              src={index === activeIndex ? image.whiteSrc : image.src}
              className={
                index === activeIndex
                  ? image.className + " active"
                  : image.className
              }
              title={image.className}
              style={{
                backgroundColor: index === activeIndex ? "#1c2228" : "white",
              }}
            />
          ))}
        </div>
      </div>
      {showDeals ? (
        <Deals />
      ) : activeIndex === 2 ? (
        <Men />
      ) : activeIndex === 3 ? (
        <Women />
      ) : activeIndex === 1 ? (
        <Jewelery />
      ) : activeIndex === 0 ? (
        <Electronics />
      ) : <Deals/>}
    </>
  );
}

export default Popular;
