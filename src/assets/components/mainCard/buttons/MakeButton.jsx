import React, { useState, useEffect } from "react";

const MakeButton = ({ onClick, isGenerating, generatedPassword, isPasswordGenerated }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [maskedPassword, setMaskedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    if (generatedPassword) {
      const length = generatedPassword.length;
      if (length > 2) {
        setMaskedPassword(
          generatedPassword[0] + 
          '•'.repeat(length - 2) + 
          generatedPassword[length - 1]
        );
      } else {
        setMaskedPassword(generatedPassword);
      }
    }
  }, [generatedPassword]);

  const clearClipboardAfterDelay = () => {
    setTimeout(() => {
      try {
        const tempInput = document.createElement('textarea');
        tempInput.value = '';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      } catch (err) {
        console.error('Failed to clear clipboard');
      }
    }, 60000);
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent form submission
    if (isPasswordGenerated && generatedPassword) {
      try {
        const tempInput = document.createElement('textarea');
        tempInput.value = generatedPassword;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopySuccess(true);
        clearClipboardAfterDelay();
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy');
      }
    } else if (!isGenerating) {
      onClick(e);
    }
  };

  const handleRegenerate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isGenerating) {
      onClick(e);
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Add this line
    e.stopPropagation(); // Keep this line
    setShowPassword(prev => !prev);
    if (!showPassword) {
      setTimeout(() => setShowPassword(false), 5000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className={`font-sans flex justify-center items-center mx-auto shadow-xl text-sm lg:text-base bg-gray-50 text-byu-blue hover:text-white backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 relative overflow-hidden border-2 rounded-full group px-4 py-2 lg:px-6 lg:py-3 transition-all duration-300 ${
          isGenerating ? 'opacity-70 cursor-wait' : 'cursor-pointer'
        } ${
          isPasswordGenerated ? 'min-w-[250px]' : 'min-w-[150px]'
        }`}
        type="button" // Make sure this is "button"
        onClick={handleClick}
        disabled={isGenerating}
      >
        <span className="relative z-10 flex flex-row items-center gap-3">
          {isPasswordGenerated ? (
            <>
              <span className="font-mono text-base">
                {showPassword ? generatedPassword : maskedPassword}
              </span>
              <span className="text-xs opacity-80">
                {copySuccess ? '✓ Copied!' : '(Click to copy)'}
              </span>
              <button
                type="button" // Add this line
                onClick={togglePasswordVisibility}
                className="ml-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
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

      {/* Regenerate Button */}
      {isPasswordGenerated && (
        <button
          type="button" // Add this line
          onClick={handleRegenerate}
          disabled={isGenerating}
          className={`flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
            isGenerating ? 'opacity-70 cursor-wait' : 'cursor-pointer'
          }`}
        >
          <RefreshIcon className="h-4 w-4" />
          Regenerate Password
        </button>
      )}
    </div>
  );
};

// Icon components stay the same...
const EyeIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const RefreshIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

export default MakeButton;