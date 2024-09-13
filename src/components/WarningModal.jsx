import React from 'react';
import styled from 'styled-components';

const WarningModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h1>Warning!</h1>
        <p>
          Please ensure you copy or write down the generated password using the copy button or by manually transcribing it from this form. This Password is not store by BYUI and cannot be retrieve after the page is quit of refresh. Thank you!
        </p>
        <Button onClick={onClose}>I Understand</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;

  h1 {
    color: #FFD600;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
    color: #333;
  }
`;

const Button = styled.button`
  background-color: #006eb6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005a94;
  }
`;

export default WarningModal;