import { useState } from "react";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Ayesha Khan",
      product: "Cotton Bibs Pack",
      text: "The quality is amazing. Very soft and safe for my baby. Delivery was super fast.",
      rating: 5,
    },
    {
      name: "Hassan Ali",
      product: "Baby Feeding Pillow",
      text: "This pillow made feeding so much easier. Highly recommended for new parents.",
      rating: 5,
    },
    {
      name: "Fatima Noor",
      product: "Sleeping Support Pillow",
      text: "My baby sleeps comfortably now. Fabric feels premium and gentle.",
      rating: 4,
    },
    {
      name: "Usman Raza",
      product: "Baby Toddler Walker",
      text: "Very sturdy and safe. My son loves using it every day.",
      rating: 5,
    },
    {
      name: "Sara Ahmed",
      product: "Cloth Diaper Set",
      text: "Eco-friendly and easy to wash. Totally worth the price.",
      rating: 4,
    },
    {
      name: "Bilal Sheikh",
      product: "Feeding Pillow",
      text: "Excellent quality and quick delivery. Customer support was helpful too.",
      rating: 5,
    },
    {
      name: "Hira Malik",
      product: "Cotton Bibs",
      text: "Beautiful colors and very absorbent. Loved the packaging as well.",
      rating: 5,
    },
    {
      name: "Ali Zain",
      product: "Sleeping Pillow",
      text: "Good support and soft fabric. My baby feels relaxed.",
      rating: 4,
    },
  ];

  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  const next = () =>
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <>
      <section className="reviews-section">
        <h2>What Parents Say About BabyzHub</h2>
        <p className="reviews-sub">
          Trusted by parents all across Pakistan 
        </p>

        <div className="review-slider">
          <button className="nav-btn left" onClick={prev}>‹</button>

          <div className="review-card">
            <div className="stars">
              {"★".repeat(reviews[index].rating)}
              {"☆".repeat(5 - reviews[index].rating)}
            </div>

            <p className="review-text">
              “{reviews[index].text}”
            </p>

            <div className="review-footer">
              <strong>{reviews[index].name}</strong>
              <span>{reviews[index].product}</span>
            </div>
          </div>

          <button className="nav-btn right" onClick={next}>›</button>
        </div>
      </section>

      {/* ===== Inline CSS ===== */}
      <style>{`
        .reviews-section {
          padding: 60px 6%;
          background: #ffffff;
          text-align: center;
        }

        .reviews-section h2 {
          font-size: 30px;
          margin-bottom: 8px;
          color: #222;
        }

        .reviews-sub {
          color: #6b6b6b;
          margin-bottom: 36px;
        }

        .review-slider {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .review-card {
          background: #fff;
          border-radius: 16px;
          padding: 32px 28px;
          box-shadow: 0 14px 40px rgba(0,0,0,0.08);
          flex: 1;
          animation: fade 0.4s ease;
        }

        @keyframes fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stars {
          font-size: 20px;
          color: #07B5B8;
          margin-bottom: 14px;
        }

        .review-text {
          font-size: 16px;
          line-height: 1.7;
          color: #444;
          margin-bottom: 20px;
        }

        .review-footer strong {
          display: block;
          color: #111;
        }

        .review-footer span {
          font-size: 13px;
          color: #777;
        }

        .nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #07B5B8;
          color: #fff;
          font-size: 26px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .nav-btn:hover {
          background: #06a4a6;
          transform: scale(1.08);
        }

        /* ===== Mobile ===== */
        @media (max-width: 600px) {
          .reviews-section h2 {
            font-size: 22px;
          }

          .review-slider {
            flex-direction: column;
          }

          .nav-btn {
            width: 38px;
            height: 38px;
            font-size: 22px;
          }

          .review-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </>
  );
};

export default ReviewsSection;
