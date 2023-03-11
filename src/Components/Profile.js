import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./profile.css";
import { app } from "../Firebase";
import Default from "../imgs/default.png";
import USER from "../imgs/user.png";
import contact from "../imgs/contact.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
              <img
                src={
                  user && user.photoURL
                    ? user.photoURL.replace(/^http:\/\//i, "https://") //replaces the http with https
                    : Default
                }
                className="profile-img"
              />
              <p className="profile-name">
                {user ? `${user.displayName}` : ""}
              </p>
              <p className="profile-email">{user ? `${user.email}` : ""}</p>
              <button
                onClick={() => {
                  signOut(auth);
                  navigate("/signup");
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
                  <p className="users-mail">{user ? `${user.email}` : ""}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
