import React, { useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import WhyUs from "./WhyUs";

function Home() {
  const scrollRef = useRef(null);

  // ===== AUTO SLIDER AFTER EVERY 3 SECONDS =====
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: window.innerWidth,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="home-container">

        {/* REMOVED THE BUTTONS */}

        <div className="scroll-wrapper" ref={scrollRef}>
          <div className="scroll-area">
            <img src="/two.png" alt="Banner 1" />
            <img src="/BABY.png" alt="Banner 2" />
          </div>
        </div>
      </div>

      {/* ===== CSS IN SAME FILE (UNCHANGED EXCEPT BUTTON REMOVED) ===== */}
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
    width: 100vw;
    flex-shrink: 0;
    object-fit: cover;
    overflow:hidden;
  }
`}</style>

    </>
  );
}

export default Home;
