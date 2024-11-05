import React from 'react';
import styled from 'styled-components';

const WarningModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <Overlay />
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Warning!</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>
              Please ensure to copy or write down the generated password using the copy button or by manually transcribing it from this form. This password is not stored by BYUI and cannot be retrieved after the page is quit or refreshed. Thank you!
            </p>
          </ModalBody>
          <ModalFooter>
            <UnderstandButton onClick={onClose}>
              I Understand
            </UnderstandButton>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

const ModalContainer = styled.div`
  position: relative;
  z-index: 10000;
  padding: 1rem;
  width: 100%;
  max-width: 28rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ModalHeader = styled.div`
  padding: 1.5rem 1.5rem 0.5rem;
`;

const ModalTitle = styled.h2`
  color: #FFC400;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const ModalBody = styled.div`
  padding: 1rem 1.5rem;
  color: #4A5568;
  font-size: 1rem;
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  justify-content: center;
`;

const UnderstandButton = styled.button`
  background-color: #006eb6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #005a94;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 110, 182, 0.3);
  }
`;

export default WarningModal;