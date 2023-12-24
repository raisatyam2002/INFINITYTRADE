import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Signup from "./components/signup";
import Login from "./components/login";
import MarketPerformer from "./components/market-view";
import Stock from "./components/Stock";
import About from "./components/About";
import Contact from "./components/Contact";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/market-view" element={<MarketPerformer />} />
        <Route path="/stock/:ticker" element={<Stock />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
