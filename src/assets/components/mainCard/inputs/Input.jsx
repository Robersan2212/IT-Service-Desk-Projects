import React from "react";
import styled from "styled-components";

const Input = ({ question, value, onChange }) => {
  return (
    <StyledWrapper>
      <input
        placeholder={question}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

  .input {
    border: 2px solid transparent;
    width: 100%; 
    min-width: 300px; 
    height: 3em; 
    padding: 0.5em 0.8em; 
    outline: none;
    overflow: hidden;
    background-color: white;
    border-radius: 10px;
    transition: all 0.5s;
    font-size: 1em; 
    line-height: 1.5; 
    padding: 20px;
    font-family: 'Inter', sans-serif;
  
    &::placeholder {
      color: #616161;
      font-family: 'Inter', sans-serif;
      font-size: 1em;
      font-weight: 400;
    }

    @media (max-width: 768px) {
      font-size: 0.9em;
      &::placeholder {
        font-size: 0.9em;
      }
    }

    @media (max-width: 480px) {
      font-size: 0.8em;
      &::placeholder {
        font-size: 0.8em;
      }
    }
  }

  .input:hover,
  .input:focus {
    border: 2px solid #4A9DEC;
    box-shadow: 0px 0px 0px 7px rgb(74, 157, 236, 20%);
    background-color: white;
  }
`;

export default Input;