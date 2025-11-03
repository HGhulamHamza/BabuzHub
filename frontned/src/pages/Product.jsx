import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Product() {
  const [products, setProducts] = useState([]);

  // Backend URL
  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="product-container">
        <h2 className="section-title">All Products</h2>
        <div className="product-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">
              <img
                src={p.img} // image path from DB
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
          margin-bottom: 40px;
          color: #222;
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
