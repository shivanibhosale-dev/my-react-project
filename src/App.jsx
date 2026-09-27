/*import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Navbar from "./component/Navbar";

//import SignupForm from "./components/SignUpForm";

function App() {
  return (
    <AuthProvider>
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;*/
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Navbar from "./component/Navbar";
import AuthProvider from "./context/AuthContext";
import ProductDetails from "./pages/ProductDetails";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;