import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

//Component Imports//
import ResponsiveModalCard from './assests/components/mainCard/ResponsivelModalCard';

function App(){
  
    return (
      <AppContainer>
        <ResponsiveModalCard>
        </ResponsiveModalCard>
      </AppContainer>
    );
}



//Style for App container //
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0B6DA2;
  padding: 10px;
`;

export default App; 
  