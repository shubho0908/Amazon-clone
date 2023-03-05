import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"; // Import the Navigate component from react-router-dom
import Home from "./Components/Home";
import Men from "./Components/Category/Men";
import Women from "./Components/Category/Women";
import Kids from "./Components/Category/Electronics";
import Lists from "./Components/Lists";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import { app } from "./Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

function App() {
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
    <BrowserRouter>
      <Routes>
        {user === null ? (
          <>
            <Route exact path="/" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
          </>
        ) : (
          <>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/men" element={<Men />} />
            <Route exact path="/women" element={<Women />} />
            <Route exact path="/kids" element={<Kids />} />
            <Route exact path="/wishlists" element={<Lists />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
