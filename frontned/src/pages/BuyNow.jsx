import React, { useState, useEffect } from "react";
import { FiShoppingBag, FiCreditCard, FiMapPin, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BuyNow = ({ cartItems, user }) => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const totalPrice = cartItems.reduce((sum, item) => {
      return (
        sum +
        item.quantity *
          (item.selectedOption ? item.selectedOption.price : item.price)
      );
    }, 0);
    setTotal(totalPrice);
  }, [cartItems]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("https://babuz-hub.vercel.app/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userDetails: formData,
          cartItems,
          total,
        }),
      });

      if (response.ok) {
        alert("✅ Order placed successfully! Confirmation sent to store.");
        navigate("/order-success", {
          state: { userDetails: formData, cartItems, total },
        });
      } else {
        alert("❌ Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("❌ Error sending order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>No items in your cart!</h2>
        <button onClick={() => navigate("/products")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">
        <FiShoppingBag size={28} /> Checkout
      </h2>

      <div className="checkout-content">
        {/* LEFT SIDE */}
        <div className="checkout-left">
          {/* Customer Info */}
          <div className="checkout-section">
            <h3>
              <FiMapPin /> Customer Details
            </h3>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Muhammad Ali"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="+92 300 1234567"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            {/* ✅ New Address Field */}
            <div className="form-group">
              <label>Address / Location</label>
              <textarea
                placeholder="House no, Street, Area, City"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              ></textarea>
              {errors.address && <p className="error">{errors.address}</p>}
            </div>
          </div>

          {/* Fixed Store Address */}
          <div className="checkout-section">
            <h3>
              <FiHome /> Store Address
            </h3>
            <p className="fixed-address">
              44/216, Darkhshan Society, Kalaboard, Malir
            </p>
          </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <h3>
              <FiCreditCard /> Payment Method
            </h3>

            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery (COD)
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                Bank Account Transfer
              </label>

              {paymentMethod === "bank" && (
                <div className="bank-details">
                  <p>
                    <strong>Account Title:</strong> MUHAMMAD MOIZ KHAN
                  </p>
                  <p>
                    <strong>Bank:</strong> Meezan Bank
                  </p>
                  <p>
                    <strong>Account Number:</strong> 01750106482578
                  </p>
                  <p>
                    <strong>IBAN:</strong> PK18MEZN0001750106482578
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">
          <h3>Order Summary</h3>

          <div className="order-list">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.img} alt={item.title} />
                <div>
                  <p className="item-title">{item.title}</p>
                  <p className="item-option">
                    {item.selectedOption ? item.selectedOption.name : ""}
                  </p>
                  <p className="item-price">
                    Rs{" "}
                    {item.selectedOption
                      ? item.selectedOption.price
                      : item.price}{" "}
                    × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <p>
              <strong>Total:</strong>
              <span>Rs {total}</span>
            </p>
          </div>

          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .checkout-container {
          padding: 60px 90px;
          font-family: "Poppins", sans-serif;
          background: #fff;
          color: #333;
        }

        .checkout-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 26px;
          color: #00a9a5;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .checkout-content {
          display: flex;
          gap: 50px;
          align-items: flex-start;
        }

        .checkout-left {
          flex: 2;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .checkout-section h3 {
          font-size: 18px;
          color: #00a9a5;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .fixed-address {
          background: #f1f9f9;
          border: 1px solid #d6efef;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
        }

        .form-group input,
        .form-group textarea {
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          resize: none;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #00a9a5;
          box-shadow: 0 0 5px rgba(0,169,165,0.3);
        }

        .error {
          color: red;
          font-size: 13px;
          margin-top: 3px;
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .bank-details {
          margin-top: 10px;
          padding: 12px;
          background: #f8f8f8;
          border-radius: 8px;
          font-size: 14px;
          color: #444;
        }

        .checkout-right {
          flex: 1;
          background: #f9f9f9;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .order-item {
          display: flex;
          align-items: center;
          gap: 15px;
          border-bottom: 1px solid #eee;
          padding: 10px 0;
        }

        .order-item img {
          width: 70px;
          border-radius: 10px;
        }

        .order-total {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 600;
          margin-top: 15px;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }

        .place-order-btn {
          width: 100%;
          background: #00a9a5;
          color: white;
          border: none;
          padding: 14px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 20px;
          transition: 0.3s;
        }

        .place-order-btn:hover {
          background: #008f8b;
        }

        .place-order-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .checkout-empty {
          text-align: center;
          padding: 100px 20px;
        }

        .checkout-empty button {
          margin-top: 20px;
          padding: 12px 25px;
          background: #00a9a5;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .checkout-content {
            flex-direction: column;
          }
          .checkout-container {
            padding: 40px 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default BuyNow;
