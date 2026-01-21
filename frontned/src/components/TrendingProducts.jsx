import React from "react";
import { Link } from "react-router-dom";

const TrendingProducts = () => {
  const products = [
    {
      id: "old-1",
      title: "Baby Toddler Walker",
      img: "src/assets/first.jpeg",
    },
    {
      id: "old-2",
      title: "Adjustable Cloth Diaper + Inner",
      img: "src/assets/second.png",
    },
    {
      id: "new-1",
      title: "Premium Fabric Baby Diaper",
      img: "/src/assets/forth.png",
      badge: "New",
    },
    {
      id: "new-2",
      title: "Soft Baby Liners",
      img: "/src/assets/fifth.jpeg",
      badge: "New",
    },
  ];

  return (
    <>
      <section className="trending-section">
        <div className="trending-header">
          <div>
            <h2> Parent’s Top Picks</h2>
            <p>Loved essentials parents are choosing right now</p>
          </div>

          <Link to="/product" className="explore-link">
            Explore more <span>→</span>
          </Link>
        </div>

        <div className="trending-grid">
          {products.map((p) => (
            <Link key={p.id} to="/product" className="trending-card">
              {p.badge && <span className="badge">{p.badge}</span>}

              <img src={p.img} alt={p.title} />

              <div className="card-info">
                <h3 className="product-title">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .trending-section {
          padding: 70px 6%;
          background: #f8fafa;
          font-family: 'Poppins', sans-serif;
        }

        .trending-header {
          max-width: 1200px;
          margin: 0 auto 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
        }

        .trending-header h2 {
          font-size: 28px;
          font-weight: 700;
          color: #222;
          margin-bottom: 6px;
        }

        .trending-header p {
          color: #666;
          font-size: 15px;
        }

        .explore-link {
          font-weight: 900;
          color: #00a9a5;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: 0.3s;
        }

        .explore-link:hover {
          color: #008f8b;
          gap: 10px;
        }

        .trending-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        .trending-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          overflow: hidden;
          position: relative;
          text-decoration: none;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .trending-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.12);
        }

        .trending-card img {
          width: 100%;
          height: 240px;
          object-fit: cover;
        }

        .badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #00a9a5;
          color: #fff;
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 600;
        }

        .card-info {
          padding: 22px;
          text-align: center;
        }

        /* 🔥 Modern Product Name Styling */
        .product-title {
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(90deg, #00a9a5, #007f7c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.3px;
          transition: transform 0.3s ease, letter-spacing 0.3s ease;
        }

        .trending-card:hover .product-title {
          transform: translateY(-3px);
          letter-spacing: 0.6px;
        }

        /* ===== Responsive ===== */
        @media (max-width: 1024px) {
          .trending-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .trending-section {
            padding: 50px 20px;
          }

          .trending-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .trending-grid {
            grid-template-columns: 1fr;
          }

          .trending-card img {
            height: 220px;
          }
        }
      `}</style>
    </>
  );
};

export default TrendingProducts;
