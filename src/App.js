import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Welcome to the Login System</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
