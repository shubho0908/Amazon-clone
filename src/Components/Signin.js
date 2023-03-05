import { React, useState } from "react";
import "./signin.css";
import Logo from "../imgs/logo2.png";
import BG1 from "../imgs/login-BG.png";
import BG2 from "../imgs/login-BG2.png";
import google from "../imgs/google.png";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailBlur = (event) => {
    if (event.target.value === "" || !event.target.value.includes("@") || !event.target.value.includes(".com")) {
      setEmailError("Please enter a valid email address.");
      document.querySelector(".email-inp").style.borderBottom =
        "2px solid darkorange";
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = (event) => {
    if (event.target.value === "") {
      setPasswordError(
        "Please enter your password."
      );
      document.querySelector(".password-inp").style.borderBottom =
        "2px solid darkorange";
    }else if (event.target.value.length < 4) {
        setPasswordError(
            "Password is too small."
          );
    }
     else {
      setPasswordError("");
    }
  };

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
              <input
                type="email"
                placeholder="Enter Email"
                className="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                required
              />
              {emailError && (
                    <div className="error-message">{emailError}</div>
                  )}
              <input
                type="password"
                placeholder="Passcode"
                className="password"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                required
              />
              {PasswordError && (
                    <div className="error-message">{PasswordError}</div>
                  )}
              <button className="signin-btn">Sign in</button>
              <div className="extra-buttons">
                <p className="or">&#x2015; Or &#x2015;</p>
                <button className="google">
                  <p>Sign in with</p>
                  <img src={google} className="google-img" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
