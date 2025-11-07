import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Auth({ setUser }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        const res = await axios.post(`${API_BASE}/api/auth/signin`, { email, password });
       sessionStorage.setItem("user", JSON.stringify(res.data.user));
setUser(res.data.user);
window.dispatchEvent(new Event("authChange")); // ✅ notify Navbar
toast.success(res.data.message || "Login successful!");
setTimeout(() => navigate("/"), 1000);

      } else {
        const res = await axios.post(`${API_BASE}/api/auth/signup`, { fullName, email, password });
        toast.success(res.data.message || "Account created!");
        setIsSignIn(true); 
        setFullName(""); 
        setEmail(""); 
        setPassword("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isSignIn ? "Login" : "Create Account"}</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isSignIn && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group password-field">
              <label>Password</label>
              <div className="password-wrapper">
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>
            <button type="submit" className="auth-btn">{isSignIn ? "Sign in" : "Create account"}</button>
          </form>

          <p className="toggle-text">
            {isSignIn ? <>Don’t have an account? <span onClick={() => setIsSignIn(false)}>Create one</span></> 
                       : <>Already have an account? <span onClick={() => setIsSignIn(true)}>Sign in</span></>}
          </p>
        </div>
      </div>

      <ToastContainer />

      <style>{`
        .auth-container { width: 100%; min-height: 100vh; display: flex; justify-content: center; align-items: center; background: #f9f9f9; font-family: 'Poppins', sans-serif; }
        .auth-box { background: #fff; padding: 50px 60px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); text-align: center; width: 400px; }
        .auth-box h2 { font-size: 28px; font-weight: 700; margin-bottom: 30px; color: #00a9a5; }
        .auth-form { display: flex; flex-direction: column; gap: 20px; }
        .form-group { text-align: left; }
        .form-group label { display: block; font-size: 15px; margin-bottom: 6px; color: #333; }
        .form-group input { width: 100%; padding: 12px 15px; border: 1px solid #ccc; border-radius: 8px; font-size: 15px; outline: none; transition: all 0.3s ease; }
        .form-group input:focus { border-color: #00a9a5; box-shadow: 0 0 5px rgba(0,169,165,0.2); }
        .password-wrapper { position: relative; display: flex; align-items: center; }
        .password-wrapper input { width: 100%; padding-right: 45px; }
        .toggle-eye { position: absolute; right: 15px; cursor: pointer; font-size: 20px; color: #00a9a5; transition: color 0.3s; }
        .toggle-eye:hover { color: #008f8b; }
        .auth-btn { background: #00a9a5; color: white; border: none; padding: 12px; font-size: 17px; border-radius: 8px; cursor: pointer; transition: all 0.3s; font-weight: 600; }
        .auth-btn:hover { background: #008f8b; }
        .toggle-text { margin-top: 25px; font-size: 15px; color: #555; }
        .toggle-text span { color: #00a9a5; cursor: pointer; font-weight: 600; }
        .toggle-text span:hover { text-decoration: underline; }
        @media (max-width: 480px) { .auth-box { width: 90%; padding: 40px 25px; } .auth-box h2 { font-size: 24px; } }
      `}</style>
    </>
  );
}

export default Auth;
