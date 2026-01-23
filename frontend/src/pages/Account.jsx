// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Account() {
//   const navigate = useNavigate();
//   const storedUser = sessionStorage.getItem("user");
//   let user = null;

//   if (storedUser && storedUser !== "undefined") {
//     try { user = JSON.parse(storedUser); } 
//     catch (err) { console.error(err); user = null; }
//   }

//   useEffect(() => { if (!user) navigate("/auth"); }, []);

//   const name = user?.fullName || "Guest";

//   const handleLogout = () => {
//     sessionStorage.removeItem("user");
//     navigate("/auth");
//   };

//   return (
//     <div className="account-container">
//       <div className="account-box">
//         <h2>Account</h2>
//         <p className="welcome">Welcome, <span>{name}</span> 👋</p>
//         <div className="account-actions">
//           <button className="shop-btn" onClick={() => navigate("/product")}>🛒 Shop Now</button>
//           <button className="logout-btn" onClick={handleLogout}>Log Out</button>
//         </div>
//       </div>

//       <style>{`
//         .account-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 80vh;
//           background: #f9f9f9;
//           font-family: 'Poppins', sans-serif;
//         }

//         .account-box {
//           background: #fff;
//           padding: 50px 70px;
//           border-radius: 12px;
//           box-shadow: 0 6px 20px rgba(0,0,0,0.08);
//           text-align: center;
//         }

//         h2 {
//           font-size: 30px;
//           font-weight: 700;
//           color: #00a9a5;
//           margin-bottom: 20px;
//         }

//         .welcome {
//           font-size: 18px;
//           color: #333;
//           margin-bottom: 40px;
//         }

//         .welcome span { color: #00a9a5; font-weight: 600; }

//         .account-actions { display: flex; flex-direction: column; gap: 20px; }

//         .shop-btn {
//           background: #00a9a5; color: white; border: none; padding: 12px 20px;
//           border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 16px; transition: 0.3s;
//         }
//         .shop-btn:hover { background: #008f8b; }

//         .logout-btn {
//           background: transparent; color: #00a9a5; border: 2px solid #00a9a5;
//           padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 16px;
//           transition: 0.3s;
//         }
//         .logout-btn:hover { background: #00a9a5; color: white; }

//         @media (max-width: 480px) {
//           .account-box { width: 90%; padding: 40px 25px; }
//           h2 { font-size: 24px; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Account;
