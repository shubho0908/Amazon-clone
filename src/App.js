import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Men from "./Components/Category/Men";
import Women from "./Components/Category/Women";
import Kids from "./Components/Category/Kids";
import CategorySection from "./Components/CategorySection";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <div className="main-body">
      <CategorySection/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/men" element={<Men />} />
          <Route exact path="/women" element={<Women />} />
          <Route exact path="/kids" element={<Kids />} />
        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
