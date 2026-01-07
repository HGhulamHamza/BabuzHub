import React, { useState } from "react";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSideMsg, setShowSideMsg] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, logout } = useAuth();

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      setShowSideMsg(true);
      setTimeout(() => setShowSideMsg(false), 3000);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/why-us" className="nav-link">Why Us?</Link>
          <Link to="/product" className="nav-link">Products</Link>
        </div>

        <div className="nav-center">
          <img src="/logo.png" alt="Logo" className="nav-logo" />
        </div>

        <div className="nav-right">
          <FiSearch className="nav-icon" />

          {isLoggedIn ? (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/auth">
              <FiUser className="nav-icon" />
            </Link>
          )}

          <FiShoppingBag className="nav-icon" onClick={handleCartClick} />

          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-link">Home</Link>
            <Link to="/why-us" className="mobile-link">Why Us?</Link>
            <Link to="/product" className="mobile-link">Products</Link>
          </div>
        )}
      </nav>

      {showSideMsg && (
        <div className="side-msg">
          <p>First create an account to view cart!</p>
        </div>
      )}
 



      <style>{`
        .navbar {
          width: 100%;
          height: 120px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 50px;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid #eee;
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        .nav-left { display: flex; gap: 25px; }
        .nav-link { text-decoration: none; font-size: 16px; color: #333; font-weight: 500; transition: 0.3s; }
        .nav-link.active { background: black; color: white; padding: 6px 14px; border-radius: 6px; }
        .nav-link:hover { color: #00a9a5; }
        .nav-center .nav-logo { width: 120px; }
        .nav-right { display: flex; align-items: center; gap: 20px; font-size: 22px; }
        .nav-icon { cursor: pointer; color: #333; transition: 0.3s; }
        .nav-icon:hover { color: #00a9a5; }
        .logout-btn { background: #00a9a5; color: white; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 15px; font-weight: 500; transition: all 0.3s; }
        .logout-btn:hover { background: #008f8b; }
        .menu-icon { display: none; font-size: 26px; cursor: pointer; }
        .mobile-menu { display: none; flex-direction: column; background: white; position: absolute; top: 100%; left: 0; width: 100%; border-top: 1px solid #eee; padding: 15px 0; }
        .mobile-link { padding: 12px 25px; text-decoration: none; color: #333; font-weight: 500; transition: 0.3s; }
        .mobile-link:hover { background: #f4f4f4; color: #00a9a5; }

        /* ✅ Side Message Style */
        .side-msg {
          position: fixed;
          right: 20px;
          top: 100px;
          background: #00a9a5;
          color: white;
          padding: 14px 20px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: fadeInOut 3s ease forwards;
          font-family: 'Poppins', sans-serif;
          z-index: 2000;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateX(50px); }
          10% { opacity: 1; transform: translateX(0); }
          90% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(50px); }
        }

        @media (max-width: 900px) {
          .nav-left { display: none; }
          .menu-icon { display: block; }
          .mobile-menu { display: flex; }
        }
        @media (max-width: 500px) {
          .navbar { padding: 12px 20px; }
          .nav-center .nav-logo { width: 90px; }
        }
      `}</style>

    </>
  );
}

export default Navbar;



 