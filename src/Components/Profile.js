import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./profile.css";
import { app } from "../Firebase";
import Default from "../imgs/default.png";
import USER from "../imgs/user.png";
import contact from "../imgs/contact.png";
import LowerNav from "./LowerNav";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  document.title = "Profile section"

  const checkDP = () => {
    if (user && user.photoURL && user.photoURL.includes("https")) {
      setImage(user.photoURL);
    } else if (user && user.photoURL && user.photoURL.includes("http")) {
      const newImage = user.photoURL.replace(/^http:\/\//i, "https://");
      setImage(newImage);
    } else {
      setImage(Default);
    }
  };

  useEffect(() => {
    checkDP();
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={user ? { height: "fit-content" } : { height: "70vh" }}
        className="profile-section"
      >
        <div className={user ? `account-section animate` : `account-section`}>
          <div className="top-section">
            <p className="welcome-mssg">
              {user ? `Welcome, ${user.displayName}` : ""}
            </p>
          </div>
          <div className="account-section2">
            <div className="left-account-section">
              <img src={image} className="profile-img" />
              <p className="profile-name">
                {user ? `${user.displayName}` : ""}
              </p>
              <p className="profile-email">{user ? `${user.email}` : ""}</p>
              <button
                onClick={() => {
                  signOut(auth);
                  setTimeout(() => {
                    navigate("/signup"); 
                  }, 700);
                }}
                className="signout-btn"
              >
                Sign out
              </button>
            </div>
            <div className="right-account-section">
              <p className="personal-info-head">Personal Information</p>
              <p className="personal-info-desc">
                Manage your personal information, including your contact
                details.
              </p>
              <div className="personal-user-data">
                <div className="personal-name">
                  <div className="name-section">
                    <p className="name-data">Name</p>
                    <img src={USER} className="user-photo" />
                  </div>
                  <p className="users-name">
                    {user ? `${user.displayName}` : ""}
                  </p>
                </div>
                <div className="personal-mail">
                  <div className="mail-section">
                    <p className="mail-data">Contact</p>
                    <img src={contact} className="mail-photo" />
                  </div>
                  <p className="users-mail">{user ? `${user.email.slice(0,15) + "..."}` : ""}</p>
                </div>
              </div>
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

export default Profile;
