import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {  useState } from 'react'
import Home from "./components/Home";
import Header from "./components/Header";
import Ladder from "./components/Ladder";
import Analysis from "./components/Analysis";
import "./App.css";

function App() {

  return (
    <Router>
      <Header />
      <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ladder" element={<Ladder />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
