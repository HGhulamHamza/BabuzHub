import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiMail } from "react-icons/fi";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails, cartItems, total } = location.state || {};

  return (
    <div className="success-container">
      <div className="success-box">
        <FiCheckCircle className="success-icon" />
        <h2>Order Placed Successfully!</h2>
        <p>
          Thank you <strong>{userDetails?.name}</strong>! Your order details have
          been sent to <strong>moizkhanal82@gmail.com</strong>
        </p>

        <div className="order-info">
          <h3>Order Summary</h3>
          {cartItems?.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.img} alt={item.title} />
              <p>
                {item.title} × {item.quantity}
              </p>
            </div>
          ))}
          <h4>Total: Rs {total}</h4>
        </div>

        <button onClick={() => navigate("/product")} className="continue-btn">
          Continue Shopping
        </button>
      </div>

      <style>{`
        .success-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f9fdfd;
          font-family: "Poppins", sans-serif;
        }
        .success-box {
          background: white;
          padding: 40px 60px;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 500px;
        }
        .success-icon {
          color: #00a9a5;
          font-size: 70px;
          margin-bottom: 10px;
        }
        .order-info {
          margin-top: 20px;
          border-top: 1px solid #eee;
          padding-top: 15px;
          text-align: left;
        }
        .order-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          margin: 5px 0;
        }
        .order-item img {
          width: 50px;
          border-radius: 8px;
        }
        .continue-btn {
          margin-top: 20px;
          background: #00a9a5;
          border: none;
          color: white;
          padding: 12px 25px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }
        .continue-btn:hover {
          background: #008f8b;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;
