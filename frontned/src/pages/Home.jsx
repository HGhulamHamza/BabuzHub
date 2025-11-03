import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import WhyUs from "./WhyUs";

function Home() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -800, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 800, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="home-container">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          <FiChevronLeft />
        </button>

        <div className="scroll-wrapper" ref={scrollRef}>
          <div className="scroll-area">
            <img
              src="/two.png"
              alt="Banner 1"
            />
            <img
              src="/BABY.png"
              alt="Banner 2"
            />
          </div>
        </div>

        <button className="scroll-btn right" onClick={() => scroll("right")}>
          <FiChevronRight />
        </button>
      </div>

      {/* ===== CSS IN SAME FILE ===== */}
      <style>{`
  .home-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .scroll-wrapper {
    width: 100%;
    overflow-x: auto;
    scroll-behavior: smooth;
    display: flex;
    /* FIX: remove center squeezing */
    justify-content: flex-start;
    scrollbar-width: none;
  }
  .scroll-wrapper::-webkit-scrollbar {
    display: none;
  }

  .scroll-area {
    display: flex;
    transition: 0.5s;
  }

  .scroll-area img {
    /* FIX: force image to full width */
    width: 100vw;
    flex-shrink: 0;
    object-fit: cover;
    overflow:hidden;
  }

  .scroll-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.9);
    border: none;
    border-radius: 50%;
    font-size: 36px;
    color: #00a9a5;
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    z-index: 10;
  }
  .scroll-btn:hover {
    background: #00a9a5;
    color: white;
  }
  .scroll-btn.left {
    left: 20px;
  }
  .scroll-btn.right {
    right: 20px;
  }

  @media (max-width: 768px) {
    .scroll-btn {
      width: 40px;
      height: 40px;
      font-size: 28px;
    }
  }
`}</style>

    </>
  );
}

export default Home;
