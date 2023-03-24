import { React, useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./payment.css";
import { app } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VanillaTilt from "vanilla-tilt";
import chip from "../imgs/chip.png";
import american from "../imgs/american.png";
import visa from "../imgs/visa2.png";
import master from "../imgs/master.png";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { AddOrder } from "../action/Orders";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import LowerNav from "./LowerNav";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);
const db = getFirestore(app);

function Payment() {
  const [user, setUser] = useState([]);
  const [Country, setCountry] = useState("");
  const [Name, setName] = useState("");
  const [Number, setNumber] = useState(null);
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Pincode, setPincode] = useState(null);
  const [OrderID, setOrderID] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [NumberError, setNumberError] = useState("");
  const [CountryError, setCountryError] = useState("");
  const [NameError, setNameError] = useState("");
  const [AddressError, setAddressError] = useState("");
  const [PincodeError, setPincodeError] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");
  const [cardName, setcardName] = useState("");
  const [cardNumber, setcardNumber] = useState(null);
  const [cardCVV, setcardCVV] = useState(null);
  const [cardEXP, setcardEXP] = useState("");
  const [cardType, setCardType] = useState("");
  const [shippingDisplay, setshippingDisplay] = useState("block");
  const [cardDisplay, setcardDisplay] = useState("none");
  const [currentDateTime, setCurrentDateTime] = useState("");

  document.title = "Payment section"

  const notify1 = () =>
    toast.error("Please fill-up the form correctly!", {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notify2 = () =>
    toast.error("Please fill-up the card details correctly!", {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notify3 = () =>
    toast.error("Card credentials can't be empty!", {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const navigate = useNavigate();

  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const dispatch = useDispatch();

  const tiltRef = useRef(null);

  // SHIPPING DETAILS
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
  const handlePincode = (event) => {
    setPincode(event.target.value);
  };
  const radioChange = (event) => {
    setPaymentMode(event.target.value);
  };

  // VALIDATION

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

  const handleNumberBlur = (event) => {
    if (event.target.value === "") {
      setNumberError("Please enter a valid contact number.");
    } else if (event.target.value.includes("+")) {
      setNumberError("Country code isn't required.");
    } else if (event.target.value.length !== 10) {
      setNumberError("Please enter a 10-digit valid contact number.");
    } else {
      setNumberError("");
    }
  };

  const handleCountryBlur = (event) => {
    if (event.target.value === "") {
      setCountryError("Please enter your Country's name.");
    } else {
      setCountryError("");
    }
  };

  const handleNameBlur = (event) => {
    if (event.target.value === "") {
      setNameError("Please enter your name.");
    } else {
      setNameError("");
    }
  };

  const handleAddressBlur = (event) => {
    if (event.target.value === "") {
      setAddressError("Please enter your address.");
    } else {
      setAddressError("");
    }
  };

  const handlePincodeBlur = (event) => {
    if (event.target.value === "") {
      setPincodeError("Please enter your pincode.");
    } else if (Pincode.length !== 6) {
      setPincodeError("Please enter a valid pincode.");
    } else {
      setPincodeError("");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentDate = `${now.getDate().toString().padStart(2, "0")}-${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${now.getFullYear()}`;
      const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      setCurrentDateTime(`Date: ${currentDate} and time: ${currentTime}`);
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    const storedID = parseInt(localStorage.getItem("OrderID"), 10) || 126244;
    const updateID = storedID + 2;
    setOrderID(updateID);
    localStorage.setItem("OrderID", updateID.toString());
  }, []);

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 10,
      speed: 100,
      glare: true,
      "max-glare": 0.3,
      transition: true,
      easing: "ease-out",
    });
  }, []);

  const TotalAmount = localStorage.getItem("TotalAmount");
  const CartData = localStorage.getItem("CartItems");

  useEffect(() => {
    if (CartItems.length === 0) {
      localStorage.setItem("TotalAmount", 0);
    }
  }, []);

  const AddUserData = async () => {
    try {
      await addDoc(collection(db, "Users"), {
        name: Name,
        mail: Email,
        number: Number,
        country: Country,
        address: Address,
        pincode: Pincode,
        amount: TotalAmount,
        paymethod: paymentMode,
        orderID: OrderID,
        order: CartItems,
        transaction_time: currentDateTime,
      });
    } catch (e) {
      console.error(e);
    }
  };

  function detectCreditCardType(cardNumber) {
    // Visa
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
      setCardType("Visa");
    }
    // Mastercard
    else if (/^5[1-5][0-9]{14}$/.test(cardNumber)) {
      setCardType("Mastercard");
    }
    // American Express
    else if (/^3[47][0-9]{13}$/.test(cardNumber)) {
      setCardType("American");
    } else {
      // Unknown card type
      setCardType("");
    }
  }

  useEffect(() => {
    detectCreditCardType(cardNumber && cardNumber.slice(0, 16));
  }, [cardNumber]);

  // CARD DETAILS
  const accName = (event) => {
    setcardName(event.target.value);
  };

  const accNumber = (event) => {
    setcardNumber(event.target.value);
  };

  const accCVV = (event) => {
    setcardCVV(event.target.value);
  };

  const accEXP = (event) => {
    setcardEXP(event.target.value);
  };

  // VALIDATING CARD DETAILS

  const [CardNumberError, setCardNumberError] = useState("");
  const [CardNameError, setCardNameError] = useState("");
  const [CardCVVError, setCardCVVError] = useState("");
  const [CardEXPError, setCardEXPError] = useState("");

  const handleCardNumber = (event) => {
    if (event.target.value === "") {
      setCardNumberError("Please enter your card details.");
    } else if (cardType === "American" && event.target.value.length !== 15) {
      console.log("Not an american");
      setCardNumberError("Please enter valid card number.");
    } else if (
      (cardType === "Visa" && event.target.value.length !== 16) ||
      (cardType === "Mastercard" && event.target.value.length !== 16)
    ) {
      console.log("Not an visa or master");
      setCardNumberError("Please enter valid card number.");
    } else if (cardType === "") {
      setCardNumberError("Please enter valid card number.");
    } else {
      setCardNumberError("");
    }
  };

  const handleCardName = (event) => {
    if (event.target.value === "") {
      setCardNameError("Please enter Card Holder's name.");
    } else {
      setCardNameError("");
    }
  };

  const handleCardCVV = (event) => {
    if (event.target.value === "") {
      setCardCVVError("Please enter Card's CVV number.");
    } else if (event.target.value.length !== 3) {
      setCardCVVError("Please enter a valid CVV number.");
    } else {
      setCardCVVError("");
    }
  };

  const handleCardEXP = (event) => {
    const month = event.target.value.slice(0, 2);
    const year = event.target.value.slice(2, 4);
    if (event.target.value === "") {
      setCardEXPError("Please enter Card's expiry date.");
    } else if (
      month < 1 ||
      month > 12 ||
      year < 23 ||
      event.target.value.length !== 4
    ) {
      setCardEXPError("Please enter a valid expiry date.");
    } else {
      setCardEXPError("");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="payment-page">
        <div className="more-data">
          <div
            style={{ display: shippingDisplay }}
            className="shipping-data animate"
          >
            <div className="shipping-head">Shipping details</div>
            <div className="user-data-form">
              <p className="order-id">Order ID: {OrderID}</p>
              <div className="all-data-of-user">
                <div className="user-data1">
                  <div className="country">
                    <p className="country-name">Country*</p>
                    <input
                      type="text"
                      placeholder="India"
                      onChange={handleCountry}
                      onBlur={handleCountryBlur}
                      value={Country}
                      disabled={isDisabled}
                      required
                    />
                    {CountryError && (
                      <div className="error-message">{CountryError}</div>
                    )}
                  </div>
                  <div className="user-name">
                    <p className="user-fullname">Name*</p>
                    <input
                      type="text"
                      placeholder="Full name"
                      onChange={handleName}
                      onBlur={handleNameBlur}
                      value={Name}
                      disabled={isDisabled}
                      required
                    />
                    {NameError && (
                      <div className="error-message">{NameError}</div>
                    )}
                  </div>
                  <div className="user-contact">
                    <p className="user-number">Contact Number*</p>
                    <input
                      type="number"
                      placeholder="Number"
                      onChange={handleNumber}
                      onBlur={handleNumberBlur}
                      value={Number}
                      disabled={isDisabled}
                      required
                    />
                    {NumberError && (
                      <div className="error-message">{NumberError}</div>
                    )}
                  </div>
                </div>
                <div className="user-data2">
                  <div className="user-email">
                    <p className="user-fullname">Email address*</p>
                    <input
                      type="text"
                      placeholder="Email"
                      onChange={handleEmail}
                      onBlur={handleEmailBlur}
                      value={Email}
                      disabled={isDisabled}
                      required
                    />
                    {emailError && (
                      <div className="error-message">{emailError}</div>
                    )}
                  </div>
                  <div className="user-address">
                    <p className="user-fulladdress">Home Address*</p>
                    <input
                      type="text"
                      placeholder="Address"
                      onBlur={handleAddressBlur}
                      onChange={handleAddress}
                      value={Address}
                      disabled={isDisabled}
                      required
                    />
                    {AddressError && (
                      <div className="error-message">{AddressError}</div>
                    )}
                  </div>
                  <div className="user-pincode">
                    <p className="user-pin-number">Pincode*</p>
                    <input
                      type="number"
                      placeholder="Pincode"
                      onBlur={handlePincodeBlur}
                      onChange={handlePincode}
                      value={Pincode}
                      disabled={isDisabled}
                      required
                    />
                    {PincodeError && (
                      <div className="error-message">{PincodeError}</div>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (
                    Name.length !== 0 &&
                    Address.length !== 0 &&
                    Country.length !== 0 &&
                    Pincode !== null &&
                    Number !== null &&
                    Email.length !== 0 &&
                    NameError.length === 0 &&
                    AddressError.length === 0 &&
                    CountryError.length === 0 &&
                    PincodeError.length === 0 &&
                    NumberError.length === 0 &&
                    emailError.length === 0
                  ) {
                    setDisabled(true);
                    setshippingDisplay("none");
                    setcardDisplay("block");
                  } else {
                    notify1();
                  }
                }}
                className="save-address"
              >
                Save
              </button>
            </div>
          </div>
          <div
            style={{ display: cardDisplay }}
            className="payment-data animate"
          >
            <div className="payment-option">
              <p className="payment-method">Choose your payment method</p>
              <div className="choose-option">
                <div className="cod">
                  <input
                    type="radio"
                    name="payment-method"
                    onChange={radioChange}
                    value="COD"
                    defaultChecked
                  />
                  Cash on delivery (COD)
                </div>
                <div className="credit">
                  <input
                    type="radio"
                    name="payment-method"
                    onChange={radioChange}
                    value="Credit"
                  />
                  Credit/Debit card
                </div>
              </div>
              <div
                style={
                  paymentMode === "Credit"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                className="online-card-section"
              >
                <div ref={tiltRef} className="credit-body">
                  <div className="first-layer">
                    <img src={chip} className="credit-chip" />
                    <img
                      src={
                        cardType === "Visa"
                          ? visa
                          : cardType === "Mastercard"
                          ? master
                          : cardType === "American"
                          ? american
                          : ""
                      }
                      className={
                        cardType !== ""
                          ? `card-company animation`
                          : `card-company`
                      }
                    />
                  </div>
                  <div className="middle-layer">
                    <p className="account-number">
                      {cardNumber &&
                        cardNumber.slice(0, 4) +
                          " " +
                          cardNumber.slice(4, 8) +
                          " " +
                          cardNumber.slice(8, 12) +
                          " " +
                          cardNumber.slice(12, 16)}
                    </p>
                  </div>
                  <div className="last-layer">
                    <p className="holder-name">
                      {cardName.toUpperCase().slice(0, 19)}
                    </p>
                    <p className="cvv-number">
                      {cardCVV && cardCVV.slice(0, 3) + ""}
                    </p>
                    <p className="exp-date">
                      {cardEXP &&
                        cardEXP.slice(0, 2) + "/" + cardEXP.slice(2, 4)}
                    </p>
                  </div>
                </div>
                <div className="online-card-form">
                  <p className="card-head-details">Card Details</p>
                  <div className="all-data-of-card">
                    <div className="card-data1">
                      <div className="acc-number">
                        <p className="acc-number-head">Account Number*</p>
                        <input
                          type="number"
                          className="acc-number-inp"
                          onChange={accNumber}
                          onBlur={handleCardNumber}
                          placeholder="1234-4567-8901-2345"
                          value={cardNumber}
                          maxLength="16"
                        />
                        {CardNumberError && (
                          <div className="error-message">{CardNumberError}</div>
                        )}
                      </div>
                      <div className="acc-name">
                        <p className="acc-name-head">Card Holder's Name*</p>
                        <input
                          type="text"
                          className="acc-name-inp"
                          onChange={accName}
                          onBlur={handleCardName}
                          value={cardName}
                          placeholder="Ex: John Doe"
                        />
                        {CardNameError && (
                          <div className="error-message">{CardNameError}</div>
                        )}
                      </div>
                    </div>
                    <div className="card-data2">
                      <div className="acc-cvv">
                        <p className="acc-cvv-head">CVV Number*</p>
                        <input
                          type="number"
                          className="acc-cvv-inp"
                          onChange={accCVV}
                          onBlur={handleCardCVV}
                          placeholder="123"
                          maxLength="3"
                          value={cardCVV}
                        />
                        {CardCVVError && (
                          <div className="error-message">{CardCVVError}</div>
                        )}
                      </div>
                      <div className="acc-exp">
                        <p className="acc-exp-head">Expiry Date*</p>
                        <input
                          type="number"
                          className="acc-exp-inp"
                          onChange={accEXP}
                          onBlur={handleCardEXP}
                          placeholder="Ex: 0120 (01/20)"
                          value={cardEXP}
                        />
                        {CardEXPError && (
                          <div className="error-message">{CardEXPError}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="paying-data"></div>
              <div className="total-amount">
                <p className="subtotal-amount">Total Amount :</p>
                <p className="main-amount">${TotalAmount}</p>
              </div>
              <div className="order-place-btn">
                <button
                  onClick={() => {
                    if (paymentMode === "Credit") {
                      if (
                        cardNumber === null ||
                        cardName.length === 0 ||
                        cardCVV === null ||
                        cardEXP.length === 0
                      ) {
                        notify3();
                      } else if (
                        CardNameError.length !== 0 ||
                        CardNumberError.length !== 0 ||
                        CardCVVError.length !== 0 ||
                        CardCVVError.length !== 0 ||
                        CardEXPError.length !== 0
                      ) {
                        notify2();
                      } else {
                        dispatch(AddOrder(JSON.parse(CartData)));
                        AddUserData();
                        swal({
                          title: "Transaction successful!",
                          text: `Thanks for shopping with us.`,
                          icon: "success",
                          buttons: "Ok",
                        }).then((willNavigate) => {
                          if (willNavigate) {
                            localStorage.removeItem("CartItems");
                            navigate("/orders");
                            window.location.reload();
                          }
                        });
                      }
                    } else {
                      dispatch(AddOrder(JSON.parse(CartData)));
                      AddUserData();
                      swal({
                        title: "Purchase successful!",
                        text: `Thanks for shopping with us.`,
                        icon: "success",
                        buttons: "Ok",
                      }).then((willNavigate) => {
                        if (willNavigate) {
                          navigate("/orders");
                          localStorage.removeItem("CartItems");
                          window.location.reload();
                        }
                      });
                    }
                  }}
                  className="confirm-btn"
                >
                  Place Order
                </button>
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

export default Payment;
