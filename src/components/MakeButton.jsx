import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-base lg:text-lg bg-gray-50 text-byu-blue hover:text-white backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 relative overflow-hidden border-2 rounded-full group px-3 py-2 lg:px-4 lg:py-2"
      type="button"
      onClick={onClick}
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 19"
        className="w-6 h-6 lg:w-8 lg:h-8 justify-end group-hover:rotate-90 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-white p-1 lg:p-2 rotate-45 relative z-10"
      >
        <path
          className="fill-gray-800 group-hover:fill-white"
          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
        />
      </svg>
    </button>
  );
}

export default Button;
