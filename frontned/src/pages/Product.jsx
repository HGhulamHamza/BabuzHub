import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // NEW

  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false); // Stop loader
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="product-container">
        <h2 className="section-title">All Products</h2>

        {/* 🔥 Loader UI */}
        {loading ? (
          <div className="loader-wrapper">
            <div className="loader"></div>
            <p className="loader-text">Loading products...</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <div key={p._id} className="product-card">
                <img
                  src={p.img}
                  alt={p.title}
                  className="product-img"
                />
                <h3 className="product-title">{p.title}</h3>
                <p className="product-price">Rs {p.price}</p>
                <Link to={`/product/${p._id}`}>
                  <button className="product-btn">Choose Options</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .product-container {
          padding: 60px 80px;
          font-family: 'Poppins', sans-serif;
          text-align: center;
          background: #fff;
        }

        .section-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 30px;
          color: #222;
        }

        /* 🔥 Loader Styling */
        .loader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 40px;
        }

        .loader {
          width: 60px;
          height: 60px;
          border: 6px solid #e0f5f5;
          border-top-color: #00a9a5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loader-text {
          margin-top: 12px;
          color: #00a9a5;
          font-weight: 600;
          font-size: 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          justify-content: center;
        }

        .product-card {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          padding: 20px;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .product-img {
          width: 100%;
          height: 230px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .product-title {
          font-size: 17px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }

        .product-price {
          color: #00a9a5;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .product-btn {
          background: #00a9a5;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: 0.3s;
        }

        .product-btn:hover {
          background: #008f8b;
        }

        @media (max-width: 600px) {
          .product-container {
            padding: 30px 20px;
          }
        }
      `}</style>
    </>
  );
}

export default Product;
