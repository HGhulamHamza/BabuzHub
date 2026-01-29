import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import WhyUs from "./pages/WhyUs";
import Auth from "./components/Auth";
// import Account from "./pages/Account";
import Cart from "./pages/Cart";
import BuyNow from "./pages/BuyNow";
import OrderSuccess from "./pages/OrderSuccess";
import WhatsAppButton from "./components/WhatsappIcon";

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load user from sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Load cart for specific user
useEffect(() => {
  try {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  } catch {
    setUser(null);
  }
}, []);


  // ✅ Save cart for specific user
  useEffect(() => {
    const key = user ? `cartItems_${user._id || user.email}` : "cartItems_guest";
    localStorage.setItem(key, JSON.stringify(cartItems));
  }, [cartItems, user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Product />
              <WhyUs />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <SingleProduct
              user={user}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/product" element={<Product />} />
        <Route path="/buy-now" element={<BuyNow cartItems={cartItems} user={user} />} />
        <Route path="/order-success" element={<OrderSuccess />} />
          
        {/* <Route path="/auth" element={<Auth setUser={setUser} />} /> */}
        {/* <Route
          path="/account"
          element={user ? <Account /> : <Auth setUser={setUser} />}
        /> */}
        <Route
          path="/cart"
          element={
            <Cart
              user={user}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
      </Routes>
      <WhatsAppButton/>
    </Router>
  );
}

export default App;
