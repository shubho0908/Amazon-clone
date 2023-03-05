import React from "react";

function Signin() {
  return (
    <>
      <div className="signin-page">
        <div className="email-section">
          <p className="email">Email address</p>
          <input type="email" />
        </div>
        <div className="password-section">
          <p className="password">Password</p>
          <input type="password" />
        </div>
        <button className="signin-btn">Sign In</button>
      </div>
    </>
  );
}

export default Signin;
