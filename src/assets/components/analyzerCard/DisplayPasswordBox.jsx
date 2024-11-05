import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PasswordStrengthAnalyzer from './PasswordStrengthAnalyzer';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const DisplayPasswordBox = ({ password }) => {
  const [displayPassword, setDisplayPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setDisplayPassword(password || '');
  }, [password]);

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setShowPassword(prev => !prev);
  };
  
  return (
    <StyledWrapper> 
      <h2>Your password: </h2>
      <div className='display-box'>
        <span className="password-text">
          {displayPassword ? (showPassword ? displayPassword : '•'.repeat(displayPassword.length)) : '\u00A0'}
        </span>
        {displayPassword && (
          <button 
            className="visibility-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      <div className="analyzer-container">
        <PasswordStrengthAnalyzer password={displayPassword} />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:wght@100;400;500&display=swap');
  
  .display-box {
    display: flex; 
    align-items: center;
    border-radius: 57px;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 23px 23px 46px #989898, -23px -23px 46px #ffffff;
    margin-top: 20px;
    min-height: 5vh;
    width: 100%;
    padding: 0 20px;
  }

  .password-text {
    margin-left: 46px;
    font-family: 'Roboto Mono', monospace;
    font-size: 1.1rem;
    color: #333;

    @media (min-width: 1024px) and (max-width: 1440px) {
    margin-left: 25px;
    
    }
  }
  
  .visibility-toggle {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: #666;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
      color: #333;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 110, 182, 0.2);
    }
  }

  h2 {
    margin-top: 15px;
    margin-bottom: -8px;
    padding: 3px;
    font-family: 'Roboto', sans-serif;
  }
    
  h3 {
    font-family: 'Roboto', sans-serif;
    padding: 3px;
    margin-top: 20px;
  }

  .analyzer-container {
    margin-top: 25px;
    background: #f8f9fa;
    border-radius: 12px;
    padding: 16px;
    
  }

  @media (max-width: 768px) {
    .display-box {
      padding: 0 15px;
    }
    
    .password-text {
      font-size: 1rem;
    }
  }
`;

export default DisplayPasswordBox;