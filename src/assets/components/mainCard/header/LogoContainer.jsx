import React from "react";
import styled from "styled-components";
import { ReactComponent as BYULogo } from '../.images/byui-logobox-04.svg';

const LogoContainer = () => {
  return (
    <StyledWrapper>
      <BYULogo />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  svg {
    width: 120px;
    height: auto;
  }

  @media (max-width: 600px) {
    margin-bottom: 15px;
  }
  
  @media (min-width: 1024px) and (max-width: 1440px) {
    svg {
      width: 150px;
    }
  }
`;

export default LogoContainer;