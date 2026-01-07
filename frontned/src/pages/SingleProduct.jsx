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

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [mainImage, setMainImage] = useState("");
  const [showSideMsg, setShowSideMsg] = useState(false);

  // 🔥 marketing states
  const [marketing, setMarketing] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  // ================= USER =================
  const getStoredUser = () => {
    try {
      const user = sessionStorage.getItem("user");
      if (!user || user === "undefined") return null;
      return JSON.parse(user);
    } catch {
      return null;
    }
  };

  // ================= PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products/${id}`);
        setProduct(res.data);
        setMainImage(res.data.images?.[0] || res.data.img);
        if (res.data.options?.length) setSelectedOption(res.data.options[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  // ================= MARKETING =================
  const getMarketingStats = (pid) => {
    const key = `marketing_${pid}`;
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);

    const data = {
      rating: (Math.random() * (5 - 4.4) + 4.4).toFixed(1),
      reviews: Math.floor(Math.random() * 40) + 10,
      watching: Math.floor(Math.random() * 35) + 15,
      sold: Math.floor(Math.random() * 120) + 30,
      discount: 25,
    };

    localStorage.setItem(key, JSON.stringify(data));
    return data;
  };

  const SALE_DURATION = 5 * 60 * 60 * 1000;

  const getSaleEndTime = (pid) => {
    const key = `sale_end_${pid}`;
    const saved = localStorage.getItem(key);
    const now = Date.now();

    if (!saved || now > saved) {
      const end = now + SALE_DURATION;
      localStorage.setItem(key, end);
      return end;
    }
    return Number(saved);
  };

  useEffect(() => {
    if (!product) return;

    setMarketing(getMarketingStats(product._id));
    const endTime = getSaleEndTime(product._id);

    const timer = setInterval(() => {
      const diff = endTime - Date.now();
      setTimeLeft({
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [product]);

  if (!product) return <p>Loading product...</p>;

  const REAL_PRICE = selectedOption ? selectedOption.price : product.price;
  const OLD_PRICE = Math.round(REAL_PRICE * 1.25);


  // ================= AUTH =================
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
            p === exists ? { ...p, quantity: p.quantity + quantity } : p
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

  return (
    <>
      <div className="single-container">
        <div className="single-image">
          <img src={mainImage} alt={product.title} />
        </div>

        <div className="single-details">
          <h2>{product.title}</h2>

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
                <FiTag /> {marketing.discount}% OFF
              </span>
            </div>
          )}

          {/* 👀 Social Proof */}
          {marketing && (
            <div className="social-proof">
              <p>
                <BsEyeFill /> {marketing.watching} people viewing now
              </p>
              <p>
                <BsGraphUpArrow /> {marketing.sold} sold recently
              </p>
            </div>
          )}

          {/* ⏰ Countdown */}
          {marketing && (
            <div className="countdown">
              <FiClock />  <b>Hurry Up! </b>Sale ends in{" "}
              <b>
                {timeLeft.hours || 0}h {timeLeft.mins || 0}m{" "}
                {timeLeft.secs || 0}s
              </b>
            </div>
          )}

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

            <button className="buy-btn" onClick={checkUserLogin}>
              <FiCreditCard /> Buy Now
            </button>
          </div>
        </div>
      </div>

      <style>{`
      /* ===== ORIGINAL STYLES PRESERVED ===== */
      .single-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 70px 90px;
        gap: 70px;
        font-family: 'Poppins', sans-serif;
      }
      .single-image img {
        width: 450px;
        border-radius: 16px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.1);
      }
      .price-box {
        display: flex;
        align-items: center;
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
        color: white;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .rating-row {
        display: flex;
        gap: 6px;
        color: #f4b400;
        font-weight: 600;
      }
      .social-proof p {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
      }
      .countdown {
        background: #f1fdfc;
        padding: 10px;
        border-left: 4px solid #00a9a5;
        margin: 12px 0;
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
          /* ===== FIX QUANTITY ALIGNMENT ===== */
.quantity-box {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 18px 0;
  flex-wrap: nowrap;
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
