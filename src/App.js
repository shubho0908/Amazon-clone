import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Men from "./Components/Category/Men";
import Women from "./Components/Category/Women";
import Kids from "./Components/Category/Electronics";
import Lists from "./Components/Lists";
import Signin from "./Components/Signin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/men" element={<Men />} />
          <Route exact path="/women" element={<Women />} />
          <Route exact path="/kids" element={<Kids />} />
          <Route exact path="/wishlists" element={<Lists />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
