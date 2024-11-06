import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

//Component Imports//
import ResponsiveModalCard from './assets/components/mainCard/ResponsiveModalCard';
import LoaderContainer from './assets/components/mainCard/loader/LoaderContainer';
import PasswordAnalyzerCard from './assets/components/analyzerCard/PasswordAnalyzerCard';
import WarningModal from './assets/components/mainCard/prompts/WarningModal';

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setFormVisible(true);
        setShowWarning(true);
      }, 100);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseWarning = () => {
    setShowWarning(false);
  };

  const handlePasswordGenerate = (password) => {
    setGeneratedPassword(password);
    setTimeout(() => setShowAnalyzer(true), 100);
  };

  if (loading) {
    return <LoaderContainer />;
  }

  return (
    <>
      <AppContainer isBlocked={showWarning}>
        {showAnalyzer && (
          <AnalyzerWrapper>
            <PasswordAnalyzerCard password={generatedPassword} />
          </AnalyzerWrapper>
        )}
        <ResponsiveModalCard 
          formVisible={formVisible} 
          onPasswordGenerate={handlePasswordGenerate}
        />
      </AppContainer>
      {showWarning && <WarningModal isOpen={showWarning} onClose={handleCloseWarning} />}
    </>
  );
}



const expandIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) translateX(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateX(0);
  }
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0B6DA2;
  padding: 10px;
  ${props => props.isBlocked && `
    pointer-events: none;
    filter: blur(2px);
  `}
`;

const AnalyzerWrapper = styled.div`
  animation: ${expandIn} 0.5s ease-out forwards;
  transform-origin: center left;
`;

export default App;