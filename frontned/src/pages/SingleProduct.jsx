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
import TrendingProducts from "../components/TrendingProducts";
import ReviewSection from "../components/ReviewSection"

function SingleProduct({ cartItems, setCartItems }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const [marketing, setMarketing] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  const DISCOUNT_PERCENT = 40;


  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`${API_BASE}/api/products/${id}`);
      const data = res.data;

      const normalizedOptions =
        data.options?.length ? data.options : data.variants || [];

      setProduct({ ...data, normalizedOptions });
      setMainImage(data.images?.[0] || data.img);
      if (normalizedOptions.length) setSelectedOption(normalizedOptions[0]);
    };

    fetchProduct();
  }, [id]);

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
    };

    localStorage.setItem(key, JSON.stringify(data));
    return data;
  };

  useEffect(() => {
    if (!product) return;

    setMarketing(getMarketingStats(product._id));
    const end = Date.now() + SALE_DURATION;

    const timer = setInterval(() => {
      const diff = end - Date.now();
      setTimeLeft({
        hours: Math.max(0, Math.floor(diff / 3600000)),
        mins: Math.max(0, Math.floor((diff / 60000) % 60)),
        secs: Math.max(0, Math.floor((diff / 1000) % 60)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [product]);

  if (!product) return <p>Loading product...</p>;

  const REAL_PRICE = selectedOption ? selectedOption.price : product.price;
  const OLD_PRICE = Math.round(REAL_PRICE / 0.6);

  const handleAddToCart = () => {
    const newItem = {
      id: product._id,
      title: product.title,
      img: mainImage,
      price: REAL_PRICE,
      selectedOption,
      quantity,
    };

    const updated = [...cartItems, newItem];
    setCartItems(updated);
    localStorage.setItem("cartItems_guest", JSON.stringify(updated));
    navigate("/cart");
  };

  const handleBuyNow = () => {
    navigate("/buy-now", {
      state: {
        items: [
          {
            id: product._id,
            title: product.title,
            img: mainImage,
            price: REAL_PRICE,
            selectedOption,
            quantity,
          },
        ],
      },
    });
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

      {/* {showSideMsg && (
        <div className="side-msg">
          <p>First create an account to view cart!</p>
        </div>
      )} */}

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
     <TrendingProducts/>
     <ReviewSection/>
    </>
   
  );
};


export default SingleProduct;
