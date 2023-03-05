import { React, useState } from "react";
import "./signin.css";
import Logo from "../imgs/logo2.png";
import BG1 from "../imgs/login-BG.png";
import BG2 from "../imgs/login-BG2.png";
import google from "../imgs/google.png";
import { app } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup
} from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailBlur = (event) => {
    if (
      event.target.value === "" ||
      !event.target.value.includes("@") ||
      !event.target.value.includes(".com")
    ) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = (event) => {
    if (event.target.value === "") {
      setPasswordError("Please enter your password.");
    } else if (event.target.value.length < 4) {
      setPasswordError("Password is too small.");
    } else {
      setPasswordError("");
    }
  };

  const CreateUser = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GoogleAuth = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="signin-page">
        <div className="login-navbar">
          <div className="main-logo">
            <img src={Logo} className="amazon-logo" />
          </div>
          <div className="signup">
            <Link to="/">
              <button className="signup-btn">Sign in</button>
            </Link>
          </div>
        </div>
        <div className="background">
          <img src={BG1} className="BG1" />
          <img src={BG2} className="BG2" />
        </div>
        <div className="main-form">
          <div className="login-form">
            <div className="some-text">
              <p className="user">User Registration</p>
              <p className="user-desc">
                Hey, Enter your details to create a new account
              </p>
            </div>
            <div className="user-details">
              <input
                type="text"
                placeholder="Name"
                className="name"
                value={name}
                onChange={handleNameChange}
                required
              />
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
              {emailError && <div className="error-message">{emailError}</div>}
              <input
                type="password"
                placeholder="Passcode"
                className="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                required
              />
              {PasswordError && (
                <div className="error-message">{PasswordError}</div>
              )}
              <button onClick={CreateUser} className="signin-btn">
                Sign up
              </button>
              <div className="extra-buttons">
                <p className="or">&#x2015; Or &#x2015;</p>
                <button onClick={GoogleAuth} className="google">
                  <p>Sign up with</p>
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

export default Signup;
