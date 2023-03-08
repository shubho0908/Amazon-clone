import { React, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./payment.css";
import { app } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

function Payment() {
  const [user, setUser] = useState([]);
  const [Country, setCountry] = useState("");
  const [Name, setName] = useState("");
  const [Number, setNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleNumber = (event) => {
    setNumber(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
  }, []);

  const TotalAmount = localStorage.getItem("TotalAmount");

  const AddUserData = async () => {
    try {
      await addDoc(collection(db, "Users"), {
        name: Name,
        mail: Email,
        number: Number,
        country: Country,
        address: Address,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="payment-page">
        <div className="more-data">
          <div className="shipping-data">
            <div className="shipping-head">Shipping details</div>
            <div className="user-data-form">
              <div className="country">
                <p className="country-name">Country</p>
                <input
                  type="text"
                  placeholder="India"
                  onChange={handleCountry}
                  value={Country}
                  disabled={isDisabled}
                />
              </div>
              <div className="user-name">
                <p className="user-fullname">Name</p>
                <input
                  type="text"
                  placeholder="Full name"
                  onChange={handleName}
                  value={Name}
                  disabled={isDisabled}
                />
              </div>
              <div className="user-contact">
                <p className="user-number">Contact Number with Country code</p>
                <input
                  type="text"
                  placeholder="Ex: (+91)"
                  onChange={handleNumber}
                  value={Number}
                  disabled={isDisabled}
                />
              </div>
              <div className="user-email">
                <p className="user-fullname">Email address</p>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={handleEmail}
                  value={Email}
                  disabled={isDisabled}
                />
              </div>
              <div className="user-address">
                <p className="user-fulladdress">Home Address</p>
                <input
                  type="text"
                  placeholder="Address"
                  onChange={handleAddress}
                  value={Address}
                  disabled={isDisabled}
                />
              </div>
              <button
                onClick={() => {
                  AddUserData();
                  setDisabled(true)
                }}
                className="save-address" disabled={isDisabled}
              >
                Save
              </button>
            </div>
          </div>
          <div className="payment-data">TOTAL: ${TotalAmount}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
