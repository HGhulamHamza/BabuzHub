import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiCreditCard, FiPlus, FiMinus } from "react-icons/fi";
import axios from "axios";

function SingleProduct({ user, cartItems, setCartItems }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [mainImage, setMainImage] = useState("");

  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products/${id}`);
        setProduct(res.data);

        if (res.data.images && res.data.images.length > 0) {
          setMainImage(res.data.images[0]);
        } else {
          setMainImage(res.data.img);
        }

        if (res.data.options && res.data.options.length > 0) {
          setSelectedOption(res.data.options[0]);
        }
      } catch (err) {
        console.error("❌ Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return <p style={{ textAlign: "center", marginTop: "80px" }}>Loading product...</p>;

  const handleAddToCart = () => {
    const newItem = {
      id: product._id,
      title: product.title,
      img: mainImage,
      price: selectedOption ? selectedOption.price : product.price,
      selectedOption: selectedOption ? { ...selectedOption } : null,
      quantity: Number(quantity),
      selectedSize,
    };

    setCartItems((prev) => {
      const exists = prev.find(
        (p) =>
          p.id === newItem.id &&
          p.selectedOption?._id === newItem.selectedOption?._id &&
          p.selectedSize === newItem.selectedSize
      );

      const updated = exists
        ? prev.map((p) =>
            p.id === newItem.id &&
            p.selectedOption?._id === newItem.selectedOption?._id &&
            p.selectedSize === newItem.selectedSize
              ? { ...p, quantity: p.quantity + newItem.quantity }
              : p
          )
        : [...prev, newItem];

      const key = user ? `cartItems_${user._id || user.email}` : "cartItems_guest";
      localStorage.setItem(key, JSON.stringify(updated));

      return updated;
    });

    setTimeout(() => navigate("/cart"), 100);
  };

  return (
    <>
      <div className="single-container">
        {/* MAIN IMAGE */}
        <div className="single-image">
          <img src={mainImage} alt={product.title} />
        </div>

        <div className="single-details">
          <h2>{product.title}</h2>

          {/* SUB IMAGES (only for this product) */}
          {product.images && (
            <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setMainImage(img)}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: img === mainImage ? "2px solid #00a9a5" : "1px solid #ccc",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          )}

          {/* OPTIONS BUTTONS (unchanged styling) */}
          {product.options && product.options.length > 0 && (
            <div className="options">
              {product.options.map((opt) => (
                <button
                  key={opt._id}
                  className={`option-btn ${
                    selectedOption?._id === opt._id ? "active" : ""
                  }`}
                  onClick={() => setSelectedOption(opt)}
                >
                  {opt.name} - Rs {opt.price}
                </button>
              ))}
            </div>
          )}

          {/* SIZE DROPDOWN ONLY FOR DIAPER PRODUCT */}
          {product.title === "Adjustable Washable Cloth Diaper + Inner" && (
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontWeight: "600", marginRight: "10px" }}>
                Size:
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          )}

          <p className="price">
            Rs {selectedOption ? selectedOption.price : product.price}
          </p>

          <p className="desc">{product.description}</p>

          <div className="quantity-box">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
              <FiMinus />
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>
              <FiPlus />
            </button>
          </div>

          {/* ADD TO CART + BUY NOW (unchanged styling) */}
          <div className="action-btns">
            <button className="cart-btn" onClick={handleAddToCart}>
              <FiShoppingCart /> Add to Cart
            </button>

            <button
              className="buy-btn"
              onClick={() =>
                navigate("/buy-now", {
                  state: {
                    product: {
                      id: product._id,
                      title: product.title,
                      img: mainImage,
                      price: selectedOption ? selectedOption.price : product.price,
                      selectedOption: selectedOption || null,
                      quantity,
                      selectedSize,
                    },
                  },
                })
              }
            >
              <FiCreditCard /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* EXISTING CSS (unchanged) */}
      <style>{`
        .single-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 70px 90px;
          gap: 70px;
          background: #fff;
          font-family: 'Poppins', sans-serif;
        }
        .single-image img {
          width: 450px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }
        .single-details h2 {
          font-size: 28px;
          font-weight: 700;
          color: #222;
          margin-bottom: 10px;
        }
        .options {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }
        .option-btn {
          border: 1px solid #ccc;
          padding: 8px 15px;
          border-radius: 8px;
          cursor: pointer;
          background: #fff;
          transition: 0.3s;
        }
        .option-btn.active {
          background: #00a9a5;
          color: #fff;
          border-color: #00a9a5;
        }
        .price {
          font-size: 20px;
          font-weight: 600;
          color: #00a9a5;
          margin-bottom: 20px;
        }
        .desc {
          font-size: 15px;
          color: #555;
          margin-bottom: 25px;
          line-height: 1.6;
        }
        .quantity-box {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }
        .quantity-box button {
          border: 1px solid #ccc;
          background: #fff;
          border-radius: 8px;
          width: 35px;
          height: 35px;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .action-btns {
          display: flex;
          gap: 20px;
        }
        .cart-btn,
        .buy-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          font-size: 15px;
          transition: 0.3s;
        }
        .cart-btn {
          background: #00a9a5;
          color: white;
        }
        .cart-btn:hover {
          background: #008f8b;
        }
        .buy-btn {
          background: #333;
          color: white;
        }
        .buy-btn:hover {
          background: #000;
        }
          /* 📱 MOBILE RESPONSIVE STYLING */
@media (max-width: 768px) {
  .single-container {
    flex-direction: column;
    padding: 30px 20px;
    gap: 30px;
    text-align: center;
  }

  .single-image img {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 14px;
  }

  /* Sub images row */
  .single-details > div:nth-child(2) {
    justify-content: center;
  }

  .single-details {
    width: 100%;
    padding: 0 10px;
  }

  .options {
    justify-content: center;
  }

  .option-btn {
    width: 100%;
    max-width: 250px;
  }

  /* Make buttons full width */
  .action-btns {
    flex-direction: column;
    width: 100%;
  }

  .cart-btn,
  .buy-btn {
    width: 100%;
    justify-content: center;
    padding: 14px;
    font-size: 16px;
  }

  /* Quantity box centered */
  .quantity-box {
    justify-content: center;
  }

  .desc {
    text-align: left;
    padding: 0 10px;
  }
}

      `}</style>
    </>
  );
}

export default SingleProduct;
