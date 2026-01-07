import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import WhyUs from "./pages/WhyUs";
import Auth from "./components/Auth";
import Cart from "./pages/Cart";
import BuyNow from "./pages/BuyNow";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <Navbar />

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

        <Route path="/product" element={<Product />} />
        <Route path="/why-us" element={<WhyUs />} />

        <Route
          path="/product/:id"
          element={
            <SingleProduct
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />

        <Route path="/buy-now" element={<BuyNow cartItems={cartItems} />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
