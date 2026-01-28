import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from "react-icons/fi";


function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateStorage = (updated) => {
    localStorage.setItem("cartItems_guest", JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    updateStorage(updated);
  };

  const increaseQty = (i) => {
    const updated = [...cartItems];
    updated[i].quantity++;
    setCartItems(updated);
    updateStorage(updated);
  };

  const decreaseQty = (i) => {
    const updated = [...cartItems];
    if (updated[i].quantity > 1) updated[i].quantity--;
    setCartItems(updated);
    updateStorage(updated);
  };
    const emptyStateStyles = `
.empty-state-wrapper {
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  padding: 20px;
}

.empty-state-box {
  background: #fff;
  padding: 40px 35px;
  border-radius: 18px;
  text-align: center;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  animation: fadeUp 0.4s ease;
}

.empty-icon {
  font-size: 52px;
  color: #00a9a5;
  margin-bottom: 15px;
}

.empty-state-box h2 {
  font-size: 22px;
  margin-bottom: 8px;
  color: #222;
  font:Poppins;
}

.empty-state-box p {
  font-size: 14px;
  color: #666;
  margin-bottom: 22px;
}

.empty-state-box button {
  background: linear-gradient(135deg, #00a9a5, #00c9c4);
  color: #fff;
  border: none;
  padding: 14px 36px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 18px rgba(0,169,165,0.35);
}

.empty-state-box button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(0,169,165,0.45);
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 📱 Mobile */
@media (max-width: 600px) {
  .empty-state-box {
    padding: 30px 22px;
  }

  .empty-icon {
    font-size: 44px;
  }

  .empty-state-box h2 {
    font-size: 20px;
  }

  .empty-state-box button {
    width: 100%;
    padding: 14px;
  }
}
`;

 if (!cartItems.length) {
  return (
    <div className="empty-state-wrapper">
      <div className="empty-state-box">
        <FiShoppingBag className="empty-icon" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven’t added anything yet.</p>
        <button onClick={() => navigate("/product")}>
          Shop Now
        </button>
      </div>

      <style>{emptyStateStyles}</style>
    </div>
  );
}

const removeAll = () => {
  setCartItems([]);
  localStorage.removeItem("cartItems_guest");
};

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      <div className="cart-table-wrapper">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item, i) => (
              <tr key={i}>
                <td>
                  <img src={item.img} alt={item.title} />
                </td>
                <td className="product-info">
                 <h4>
  {item.title}
  {item.selectedSize && (
    <span className="variant-text"> - {item.selectedSize}</span>
  )}
  

</h4>

                </td>
                <td className="price">
                  Rs {item.price * item.quantity}
                </td>
                <td>
                <div className="qty-box">
  <FiMinus onClick={() => decreaseQty(i)} />
  <span>{item.quantity}</span>
  <FiPlus onClick={() => increaseQty(i)} />
</div>

                </td>
                <td>
                  <FiTrash2
                    className="delete-icon"
                    onClick={() => removeItem(i)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cart-footer">
        <p className="total">Total: <span>Rs {total}</span></p>

        <div className="cart-actions">
          <span className="remove-all" onClick={removeAll}>
            Remove All
          </span>
          <span
            className="add-more"
            onClick={() => navigate("/product")}
          >
            Add More
          </span>
        </div>
        <button
  className="pay-btn"
  onClick={() => navigate("/buy-now")}
>
  Proceed to Pay
</button>

      </div>

      <style>{`
        .cart-page {
          max-width: 1100px;
          margin: 40px auto;
          padding: 20px;
          font-family: "Poppins", sans-serif;
        }

        .cart-title {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 25px;
          color: #222;
        }

        .cart-table-wrapper {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .cart-table {
          width: 100%;
          border-collapse: collapse;
        }

        .cart-table thead {
          background: #f4f6f8;
        }

        .cart-table th {
          padding: 16px;
          text-align: left;
          font-size: 14px;
          color: #666;
          font-weight: 600;
        }

        .cart-table td {
          padding: 18px 16px;
          border-top: 1px solid #eee;
          vertical-align: middle;
        }

        .cart-table img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 10px;
          background: #f2f2f2;
        }

        .product-info h4 {
          font-size: 15px;
          font-weight: 500;
          color: #222;
        }

        .price {
          font-weight: 600;
          color: #00a9a5;
        }

        .qty-box {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #f6f6f6;
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 14px;
        }

        .qty-box svg {
          cursor: pointer;
          color: #555;
        }

        .delete-icon {
          color: #ff4d4f;
          cursor: pointer;
          font-size: 18px;
        }

        .cart-footer {
          margin-top: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .total {
          font-size: 18px;
          font-weight: 500;
        }

        .total span {
          color: #00a9a5;
          font-weight: 600;
        }

        .cart-actions {
          display: flex;
          gap: 20px;
        }

        .remove-all {
          color: #ff4d4f;
          font-weight: 500;
          cursor: pointer;
        }

        .add-more {
          color: #00a9a5;
          font-weight: 600;
          cursor: pointer;
        }

        .remove-all:hover,
        .add-more:hover {
          text-decoration: underline;
        }

        .empty-cart {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 70vh;
          background: #f9f9f9;
        }

        .empty-cart h2 {
          margin-bottom: 15px;
        }

        .empty-cart button {
          background: #00a9a5;
          color: #fff;
          border: none;
          padding: 12px 30px;
          border-radius: 10px;
          cursor: pointer;
        }
          .pay-btn {
  margin-top: 12px;
  background: linear-gradient(135deg, #00a9a5, #00c9c4);
  color: #fff;
  border: none;
  padding: 14px 40px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 169, 165, 0.35);
  transition: 0.3s ease;
}
  .variant-text {
  font-size: 13px;
  font-weight: 500;
  color: #666;
}


.pay-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 169, 165, 0.45);
}

/* ================= MOBILE RESPONSIVE ================= */

@media (max-width: 768px) {
  .cart-title {
    font-size: 22px;
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
    margin-bottom: 16px;
    border-radius: 16px;
    padding: 14px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  }

  .cart-table td {
    border: none;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cart-table img {
    width: 60px;
    height: 60px;
  }

  .product-info h4 {
    font-size: 14px;
  }

  .price {
    font-size: 14px;
  }

  .qty-box {
    padding: 6px 10px;
    gap: 10px;
  }

  .cart-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .cart-actions {
    justify-content: space-between;
  }

  .pay-btn {
    width: 100%;
    text-align: center;
  }
}

      `}</style>
    </div>
  );
}

export default Cart;
