import React from "react";
import styled from "styled-components";
import { ReactComponent as LockLogo } from '../.images/lock-alt.svg';

const TitleContainer = () => {
  return (
    <Title>
      <h1>SafeStudent</h1>
      <h2><LockLogo /> Optimal Password Generation</h2>
    </Title>
  );
}

const Title = styled.div`
  margin-left: 40px;

  h1 {
    font-size: 2.5rem;
    color: #006eb6;
  }

  h2 {
    font-size: 1.3rem;
    color: #333;
    margin: 5px 0 0;
    margin-top: -6px;
    display: flex;
    align-items: center;

    svg {
      width: 18px;
      height: 21px;
      margin-right: 5px;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1rem;
    }
  }

  @media (max-width: 600px) {
    margin-left: 0;
    text-align: center;
  }
  
  @media (min-width: 1024px) and (max-width: 1440px) {
    h1 {
      font-size: 2.4rem;
    }
    h2 {
      font-size: 1.3rem;
    }
  }
`;

export default TitleContainer;