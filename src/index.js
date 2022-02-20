import React from "react";
import ReactDOM from "react-dom";
import "./styles/reset.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation"
import Home from "./Home"
import Mint from "./Mint"
import Roadmap from "./Roadmap"
import Footer from "./Footer"

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Mint" element={<Mint />} />
      <Route path="/Roadmap" element={<Roadmap />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
)