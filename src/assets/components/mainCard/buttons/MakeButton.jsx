import React from "react";

const MakeButton = ({ onClick, isGenerating, generatedPassword, isPasswordGenerated }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent form submission
    if (isGenerating) return;

    if (isPasswordGenerated && generatedPassword) {
      if (e.target.closest('.regenerate-btn')) {
        onClick(e);
      } else {
        navigator.clipboard.writeText(generatedPassword);
      }
    } else {
      onClick(e);
    }
  };

  return (
    <button
      className={`font-sans flex justify-center items-center mx-auto shadow-xl text-sm lg:text-base bg-gray-50 text-byu-blue hover:text-white backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 relative overflow-hidden border-2 rounded-full group px-4 py-2 lg:px-6 lg:py-3 transition-all duration-300 ${
        isGenerating ? 'opacity-70 cursor-wait' : 'cursor-pointer'
      } ${
        isPasswordGenerated ? 'min-w-[250px]' : 'min-w-[150px]'
      }`}
      type="button"
      onClick={handleClick}
      disabled={isGenerating}
    >
      <span className="relative z-10 flex flex-row items-center gap-3">
        {isPasswordGenerated ? (
          <>
            <span className="font-mono text-base">{generatedPassword}</span>
            <span className="text-xs opacity-80">(Click to copy)</span>
            <button 
              className="regenerate-btn ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              onClick={handleClick}
            >
              Regenerate
            </button>
          </>
        ) : (
          <>
            <span>Generate Password</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 19"
              className="w-6 h-6 lg:w-7 lg:h-7 group-hover:rotate-90 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-white p-1.5 lg:p-2 rotate-45 relative z-10"
            >
              <path
                className="fill-gray-800 group-hover:fill-white"
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              />
            </svg>
          </>
        )}
      </span>
      <div className="absolute inset-0 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </button>
  );
};

export default MakeButton;