import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) navigate("/auth");
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);

    const key = `cartItems_${user._id || user.email}`;
    localStorage.setItem(key, JSON.stringify(updated));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.map((item, i) => (
        <div key={i} className="cart-item">
          <img src={item.img} alt={item.title} />
          <div>
            <h4>{item.title}</h4>
            <p>Qty: {item.quantity}</p>
            <p>Rs {item.price * item.quantity}</p>
          </div>
          <button onClick={() => removeItem(i)}>Remove</button>
        </div>
      ))}

      <h3>Total: Rs {total}</h3>
      <button onClick={() => navigate("/buy-now")}>Proceed to Buy</button>
       <style>{`
          .empty-cart {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 70vh;
            background: #f9f9f9;
            font-family: "Poppins", sans-serif;
          }

          .empty-card {
            text-align: center;
            background: #fff;
            padding: 50px 40px;
            border-radius: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            max-width: 400px;
            width: 90%;
          }

          .empty-card h2 {
            color: #00a9a5;
            margin-top: 20px;
            font-size: 22px;
            font-weight: 600;
          }

          .empty-card p {
            color: #555;
            margin-top: 6px;
            font-size: 15px;
          }

          .continue-btn {
            margin-top: 25px;
            background: #00a9a5;
            color: #fff;
            border: none;
            border-radius: 10px;
            padding: 12px 28px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
          }

          .continue-btn:hover {
            background: #008f8b;
          }
        `}</style>
    </div>

    
  );
}

export default Cart;
