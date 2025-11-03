import React, { useEffect, useState } from "react";
import { FiPlus, FiMinus, FiTrash2, FiCreditCard, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Cart({ user, cartItems, setCartItems }) {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

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

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/buy-now");
      return;
    }
    navigate("/checkout");
  };

  // ✅ Empty Cart
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-card">
          <FiShoppingCart size={60} color="#00a9a5" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven’t added anything yet.</p>
          <button onClick={() => navigate("/product")} className="continue-btn">
            Continue Shopping
          </button>
        </div>

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

  return (
    <div className="cart-container">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Option</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className="product-info">
                <img src={item.img} alt={item.title} />
                <span>{item.title}</span>
              </td>
              <td>{item.selectedOption ? item.selectedOption.name : "-"}</td>
              <td>
                Rs {item.selectedOption ? item.selectedOption.price : item.price}
              </td>
              <td>
                <div className="qty-box">
                  <button onClick={() => decreaseQty(item.id)}>
                    <FiMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>
                    <FiPlus />
                  </button>
                </div>
              </td>
              <td>
                <button onClick={() => removeItem(item.id)}>
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <div className="cart-links">
          <span className="clear-link" onClick={clearCart}>
            Clear Cart
          </span>
          <span className="add-more" onClick={() => navigate("/product")}>
            Add More →
          </span>
        </div>

        <div className="total-section">
          <h3>Total: Rs {total}</h3>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            <FiCreditCard /> Buy Now
          </button>
        </div>
      </div>

      <style>{`
        .cart-container {
          padding: 50px 90px;
          font-family: 'Poppins', sans-serif;
        }

        .cart-table {
          width: 100%;
          border-collapse: collapse;
        }

        .cart-table th, .cart-table td {
          padding: 15px;
          border-bottom: 1px solid #ddd;
          text-align: center;
        }

        .product-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .product-info img {
          width: 80px;
          border-radius: 10px;
        }

        .qty-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .qty-box button {
          background: #00a9a5;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qty-box span {
          font-weight: 600;
          font-size: 15px;
        }

        .cart-table button:hover {
          background: red;
        }

        .cart-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .cart-links {
          display: flex;
          gap: 25px;
          align-items: center;
        }

        .clear-link {
          color: #d32f2f;
          cursor: pointer;
          text-decoration: underline;
          font-weight: 500;
        }

        .clear-link:hover {
          color: #b71c1c;
        }

        .add-more {
          color: #00a85a;
          cursor: pointer;
          text-decoration: underline;
          font-weight: 500;
        }

        .add-more:hover {
          color: #008f49;
        }

        .total-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .total-section h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #222;
        }

        .buy-now-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #00a9a5;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s;
        }

        .buy-now-btn:hover {
          background: #008f8b;
        }

        @media (max-width: 768px) {
          .cart-container {
            padding: 30px 20px;
          }
          .cart-summary {
            flex-direction: column;
            align-items: flex-start;
          }
          .total-section {
            flex-direction: column;
            align-items: flex-start;
          }
        }
          /* ✅ Enhanced Mobile Styling */
@media (max-width: 768px) {
  /* Navbar full width + alignment */
  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px !important;
    box-sizing: border-box;
  }

  nav .logo {
    flex: 1;
    text-align: left;
  }

  nav .menu {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
  }

  /* Cart layout adjustments */
  .cart-container {
    padding: 20px 10px;
  }

  .cart-table thead {
    display: none;
  }

  .cart-table,
  .cart-table tbody,
  .cart-table tr,
  .cart-table td {
    display: block;
    width: 100%;
  }

  .cart-table tr {
    background: #fff;
    margin-bottom: 22px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 18px 15px;
  }

  .cart-table td {
    border: none;
    text-align: left;
    padding: 8px 0;
  }

  .product-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .product-info img {
    width: 100%;
    max-width: 180px;
    border-radius: 10px;
    margin-bottom: 8px;
  }

  .product-info span {
    display: block;
    margin-top: 5px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .qty-box {
    justify-content: flex-start;
    gap: 10px;
  }

  .cart-summary {
    flex-direction: column;
    align-items: stretch;
    margin-top: 20px;
  }

  .cart-links {
    justify-content: space-between;
    width: 100%;
    display: flex;
  }

  .total-section {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    margin-top: 15px;
  }

  .buy-now-btn {
    width: 100%;
    justify-content: center;
  }
}

      `}</style>
    </div>
  );
}

export default Cart;
