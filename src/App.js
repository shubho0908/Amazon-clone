import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Lists from "./Components/Lists";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Load from "./imgs/spin.gif";
import { app } from "./Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProductPage from "./Components/ProductPage";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <>
        <div className="loading">
          <img src={Load} className="loading-img"/>
        </div>
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Signin />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/home" /> : <Signup />}
        />
        {user && (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/wishlists" element={<Lists />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
