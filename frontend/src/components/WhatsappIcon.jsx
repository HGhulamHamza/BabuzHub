import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  const phoneNumber = "923136672464"; // 👈 client number WITHOUT + or spaces
  const message = "Hello! I have a question about a product.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="whatsapp-container" onClick={handleClick}>
      <FaWhatsapp className="whatsapp-icon" />
      <span className="whatsapp-tooltip">Chat with us</span>
      <style>
        {`
        .whatsapp-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25D366;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: transform 0.2s ease;
}

.whatsapp-container:hover {
  transform: scale(1.1);
}

.whatsapp-icon {
  color: white;
  font-size: 32px;
}

.whatsapp-tooltip {
  position: absolute;
  right: 70px;
  background: #333;
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.whatsapp-container:hover .whatsapp-tooltip {
  opacity: 1;
}
`}
      </style>
    </div>
    
  );
 
}

export default WhatsAppButton;
