import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiCreditCard, FiPlus, FiMinus } from "react-icons/fi";
import axios from "axios";

function SingleProduct({ cartItems, setCartItems }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [mainImage, setMainImage] = useState("");
  const [showSideMsg, setShowSideMsg] = useState(false);

  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  // ✅ SAFE user reader
  const getStoredUser = () => {
    try {
      const user = sessionStorage.getItem("user");
      if (!user || user === "undefined") return null;
      return JSON.parse(user);
    } catch {
      return null;
    }
  };

  // ✅ Sync user state
  const syncUser = () => {
    const user = getStoredUser();
    setLoggedInUser(user);
  };

  useEffect(() => {
    syncUser();
    window.addEventListener("authChange", syncUser);
    return () => window.removeEventListener("authChange", syncUser);
  }, []);

  // ✅ Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products/${id}`);
        setProduct(res.data);

        if (res.data.images?.length) setMainImage(res.data.images[0]);
        else setMainImage(res.data.img);

        if (res.data.options?.length) setSelectedOption(res.data.options[0]);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  // ✅ Login check
  const checkUserLogin = () => {
    const user = getStoredUser();
    if (!user) {
      setShowSideMsg(true);
      setTimeout(() => {
        setShowSideMsg(false);
        navigate("/auth");
      }, 1500);
      return null;
    }
    return user;
  };

  // ✅ Add to cart
  const handleAddToCart = () => {
    const user = checkUserLogin();
    if (!user) return;

    const newItem = {
      id: product._id,
      title: product.title,
      img: mainImage,
      price: selectedOption ? selectedOption.price : product.price,
      selectedOption: selectedOption ? { ...selectedOption } : null,
      quantity,
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

      const key = `cartItems_${user._id || user.email}`;
      localStorage.setItem(key, JSON.stringify(updated));

      return updated;
    });

    navigate("/cart");
  };

  return (
    <>
      <div className="single-container">
        <div className="single-image">
          <img src={mainImage} alt={product.title} />
        </div>

        <div className="single-details">
          <h2>{product.title}</h2>

          {product.images && (
            <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
              {product.images.map((img, i) => (
                <img
                  key={i}
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

          {product.options?.length > 0 && (
            <div className="options">
              {product.options.map((opt) => (
                <button
                  key={opt._id}
                  className={`option-btn ${selectedOption?._id === opt._id ? "active" : ""}`}
                  onClick={() => setSelectedOption(opt)}
                >
                  {opt.name} - Rs {opt.price}
                </button>
              ))}
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

          <div className="action-btns">
            <button className="cart-btn" onClick={handleAddToCart}>
              <FiShoppingCart /> Add to Cart
            </button>

            <button
              className="buy-btn"
              onClick={() => {
                const user = checkUserLogin();
                if (!user) return;

                navigate("/buy-now", {
                  state: {
                    product: {
                      id: product._id,
                      title: product.title,
                      img: mainImage,
                      price: selectedOption ? selectedOption.price : product.price,
                      selectedOption,
                      quantity,
                      selectedSize,
                    },
                  },
                });
              }}
            >
              <FiCreditCard /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {showSideMsg && (
        <div className="side-msg">
          <p>First create an account to view cart!</p>
        </div>
      )}

      <style>{ `
      
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

  .quantity-box {
    justify-content: center;
  }

  .desc {
    text-align: left;
    padding: 0 10px;`
  }</style>
    </>
  );
}

export default SingleProduct;
