import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PasswordStrengthAnalyzer from './PasswordStrengthAnalyzer';

const DisplayPasswordBox = ({ password }) => {
  const [displayPassword, setDisplayPassword] = useState('');

  useEffect(() => {
    setDisplayPassword(password || '');
  }, [password]);

  return (
    <StyledWrapper> 
      <h2>Your password: </h2>
      <div className='display-box'>
        <span className="password-text">
          {displayPassword || '\u00A0'}
        </span>
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
    font-family: 'Roboto Mono', monospace;
    font-size: 1.1rem;
    color: #333;
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