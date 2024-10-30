import React from "react";
import styled from "styled-components";

//Component Imports for Header 
import LogoContainer from './LogoContainer';
import TitleContainer from './TitleContainer';

const HeaderContainer = () => {
    return(
        <Header>
            <LogoContainer />
            <TitleContainer />
        </Header>
    );
}

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    align-items: center;
    margin-bottom: 15px;
  }
`;

export default HeaderContainer;