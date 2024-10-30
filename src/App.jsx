// App.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

//Component Imports//
import ResponsiveModalCard from './assets/components/mainCard/ResponsiveModalCard';
import LoaderContainer from './assets/components/mainCard/loader/LoaderContainer';
import PasswordAnalyzerCard from './assets/components/analyzerCard/PasswordAnalyzerCard';

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const timer = setTimeout(() => {
       setLoading(false);
       setTimeout(() => setFormVisible(true), 100);
     }, 3000);
     return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoaderContainer />
    );
  }

  //Main structure.
  return (
    <AppContainer>
      <PasswordAnalyzerCard />
      <StyledModalCard formVisible={formVisible} />
    </AppContainer>
  );
}

/////////////CSS styling//////////////////

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0B6DA2;
  padding: 10px;
`;

const StyledModalCard = styled(ResponsiveModalCard) `
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${props => props.formVisible ? '0s' : '0.3s'};
`

export default App;

///////////// END CSS styling//////////////////