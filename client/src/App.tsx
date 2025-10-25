import { useState } from "react";

import "./App.css";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/Signup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Utils/Auth";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
        <Route element={<Auth />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
