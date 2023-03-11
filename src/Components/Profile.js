import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./profile.css";
import { app } from "../Firebase";
import Default from "../imgs/default.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

function Profile() {
  const [user, setUser] = useState(null);

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
      <div className="profile-section">
        <div className="account-section">
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
              <p className="profile-name">{user ? `${user.displayName}` : ""}</p>
              <p className="profile-email">{user ? `${user.email}` : ""}</p>
              <button className="signout-btn">Sign out</button>
            </div>
            <div className="right-account-section"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
