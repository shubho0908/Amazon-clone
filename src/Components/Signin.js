import React from "react";
import "./signin.css";
import Logo from "../imgs/logo2.png";
import BG1 from "../imgs/login-BG.png";
import BG2 from "../imgs/login-BG2.png";
import google from "../imgs/google.png";

function Signin() {
  return (
    <>
      <div className="signin-page">
        <div className="login-navbar">
          <div className="main-logo">
            <img src={Logo} className="amazon-logo" />
          </div>
          <div className="signup">
            <button className="signup-btn">Sign up</button>
          </div>
        </div>
        <div className="background">
          <img src={BG1} className="BG1" />
          <img src={BG2} className="BG2" />
        </div>
        <div className="main-form">
          <div className="login-form">
            <div className="some-text">
              <p className="user">User Login</p>
              <p className="user-desc">
                Hey, Enter your details to get sign in to your account
              </p>
            </div>
            <div className="user-details">
              <input type="email" placeholder="Enter Email" className="email" />
              <input
                type="password"
                placeholder="Passcode"
                className="password"
              />
              <button className="signin-btn">Sign in</button>
            <p className="or">Or Sign in with</p>
            <button className="google">
                <p>Sign in with</p>
                <img src={google} className="google-img" />
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
