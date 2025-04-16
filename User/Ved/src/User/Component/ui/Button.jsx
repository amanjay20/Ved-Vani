import React from "react";

const Button = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-brightColor to-backgroundColor text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition duration-300 text-sm"
    >
      {title}
    </button>
  );
};

export default Button;