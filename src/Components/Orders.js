import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="orders-section"></div>
    </>
  );
}

export default Orders;
