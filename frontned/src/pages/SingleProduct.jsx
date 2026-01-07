import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiCreditCard,
  FiPlus,
  FiMinus,
  FiClock,
  FiTag,
} from "react-icons/fi";
import { BsStarFill, BsEyeFill, BsGraphUpArrow } from "react-icons/bs";
import axios from "axios";

function SingleProduct({ cartItems, setCartItems, user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showSideMsg, setShowSideMsg] = useState(false);

  // 🔥 marketing
  const [marketing, setMarketing] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  // ================= USER =================
  // const getStoredUser = () => {
  //   try {
  //     const user = sessionStorage.getItem("user");
  //     if (!user || user === "undefined") return null;
  //     return JSON.parse(user);
  //   } catch {
  //     return null;
  //   }
  // };
const handleBuyNow = () => {
  if (!checkUserLogin()) return;
  handleAddToCart();
  navigate("/buy-now");
};



  // ================= PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products/${id}`);
        const data = res.data;

        const normalizedOptions =
          data.options?.length
            ? data.options
            : data.variants?.length
            ? data.variants
            : [];

        setProduct({
          ...data,
          normalizedOptions,
        });

        setMainImage(data.images?.[0] || data.img);

        if (normalizedOptions.length > 0) {
          setSelectedOption(normalizedOptions[0]);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // ================= MARKETING =================
const SALE_DURATION = 10 * 60 * 60 * 1000;


  const getMarketingStats = (pid) => {
    const key = `marketing_${pid}`;
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);

    const data = {
      rating: (Math.random() * (5 - 4.4) + 4.4).toFixed(1),
      reviews: Math.floor(Math.random() * 40) + 20,
      watching: Math.floor(Math.random() * 30) + 10,
      sold: Math.floor(Math.random() * 120) + 30,
      discount: 40,
    };

    localStorage.setItem(key, JSON.stringify(data));
    return data;
  };

  const getSaleEndTime = (pid) => {
  const key = `sale_end_${pid}`;
  const now = Date.now();

  const end = now + SALE_DURATION;
  localStorage.setItem(key, end);
  return end;
};


  useEffect(() => {
    if (!product) return;

    setMarketing(getMarketingStats(product._id));
    const endTime = getSaleEndTime(product._id);

    const timer = setInterval(() => {
      const diff = endTime - Date.now();
      setTimeLeft({
        hours: Math.max(0, Math.floor(diff / (1000 * 60 * 60))),
        mins: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
        secs: Math.max(0, Math.floor((diff / 1000) % 60)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [product]);

  if (!product) return <p>Loading product...</p>;

  // ================= PRICE =================
  const REAL_PRICE = selectedOption ? selectedOption.price : product.price;
const DISCOUNT_PERCENT = 40;
const OLD_PRICE = Math.round(REAL_PRICE / (1 - DISCOUNT_PERCENT / 100));


  // ================= AUTH =================
const checkUserLogin = () => {
  if (!user) {
    setShowSideMsg(true);
    setTimeout(() => {
      setShowSideMsg(false);
      navigate("/auth");
    }, 1200);
    return false;
  }
  return true;
};


  // ================= CART =================
  const handleAddToCart = () => {
    // const user = checkUserLogin();
   if (!user) {
    navigate("/auth");
    return;
  }

    const newItem = {
      id: product._id,
      title: product.title,
      img: mainImage,
      price: REAL_PRICE,
      selectedOption,
      quantity,
    };

    setCartItems((prev) => {
      const exists = prev.find(
        (p) =>
          p.id === newItem.id &&
          p.selectedOption?._id === newItem.selectedOption?._id
      );

    const updated = exists
  ? prev.map((p) =>
      p.id === newItem.id &&
      p.selectedOption?._id === newItem.selectedOption?._id
        ? { ...p, quantity: p.quantity + quantity }
        : p
    )
  : [...prev, newItem];


      localStorage.setItem(
        `cartItems_${user._id || user.email}`,
        JSON.stringify(updated)
      );
      return updated;
    });

    navigate("/cart");
  };

  // ================= UI =================
  return (
    <>
      <div className="single-container">
        <div className="single-image">
          <img src={mainImage} alt={product.title} />
        </div>

        <div className="single-details">
          <h2>{product.title}</h2>
              {/* Variants */}
          {product.normalizedOptions?.length > 0 && (
            <div className="options">
              {product.normalizedOptions.map((opt) => (
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

          {/* ⭐ Rating */}
          {marketing && (
            <div className="rating-row">
              <BsStarFill /> {marketing.rating}
              <span>({marketing.reviews} reviews)</span>
            </div>
          )}

          {/* 💰 Price */}
          {marketing && (
            <div className="price-box">
              <span className="old-price">Rs {OLD_PRICE}</span>
              <span className="new-price">Rs {REAL_PRICE}</span>
              <span className="discount">
  <FiTag /> {DISCOUNT_PERCENT}% OFF
</span>

            </div>
          )}

          {/* 👀 Social Proof */}
          {marketing && (
            <div className="social-proof">
              <p>
                <BsEyeFill /> {marketing.watching} viewing now
              </p>
              <p>
                <BsGraphUpArrow /> {marketing.sold} sold recently
              </p>
            </div>
          )}

          {/* ⏰ Countdown */}
          <div className="countdown">
            <FiClock /> <b>Hurry Up ! </b>Sale ends in{" "}
            <b>
              {timeLeft.hours}h {timeLeft.mins}m {timeLeft.secs}s
            </b>
          </div>

      

          <p className="desc">{product.description}</p>

          {/* Quantity */}
          <div className="quantity-box">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
              <FiMinus />
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>
              <FiPlus />
            </button>
          </div>

          {/* Buttons */}
          <div className="action-btns">
            <button className="cart-btn" onClick={handleAddToCart}>
              <FiShoppingCart /> Add to Cart
            </button>

            <button className="buy-btn" onClick={handleBuyNow}>
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

      {/* ===== STYLES (OLD + MARKETING) ===== */}
      <style>{`
      .single-container {
        display: flex;
        justify-content: center;
        gap: 70px;
        padding: 70px 90px;
        font-family: 'Poppins', sans-serif;
      }
      .single-image img {
        width: 450px;
        border-radius: 16px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.1);
      }
      .rating-row {
        display: flex;
        gap: 6px;
        color: #f4b400;
        font-weight: 600;
      }
      .price-box {
        display: flex;
        gap: 12px;
        margin: 12px 0;
      }
      .old-price {
        text-decoration: line-through;
        color: #999;
      }
      .new-price {
        font-size: 22px;
        font-weight: 700;
        color: #00a9a5;
      }
      .discount {
        background: #e63946;
        color: #fff;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
      }
      .quantity-box {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;
      }
      .quantity-box button {
        width: 35px;
        height: 35px;
        border-radius: 8px;
        border: 1px solid #ccc;
        background: #fff;
      }
      .action-btns {
        display: flex;
        gap: 20px;
      }
        .options {
  display: flex;
  gap: 12px;
  margin: 15px 0;
  flex-wrap: wrap;
}

.option-btn {
  border: 1px solid #ccc;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  background: #fff;
  font-size: 14px;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.option-btn:hover {
  border-color: #00a9a5;
  color: #00a9a5;
}

.option-btn.active {
  background: #00a9a5;
  color: #fff;
  border-color: #00a9a5;
}

      .cart-btn {
        background: #00a9a5;
        color: #fff;
        padding: 12px 20px;
        border-radius: 10px;
        border: none;
        font-weight: 600;
      }
      .buy-btn {
        background: #333;
        color: #fff;
        padding: 12px 20px;
        border-radius: 10px;
        border: none;
        font-weight: 600;
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
    padding: 0 10px;     `}</style>
    </>
  );
};


export default SingleProduct;
