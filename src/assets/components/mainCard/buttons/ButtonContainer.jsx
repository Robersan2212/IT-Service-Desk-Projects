import React, { useState } from "react";
import styled from "styled-components";
import MakeButton from "./MakeButton";
import Loader from '../loader/Loader';

const ButtonContainer = ({ answers, selectedLength, selectedQuestions }) => {
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastPattern, setLastPattern] = useState(0); // Track last used pattern

  const generatePassword = async () => {
    const length = selectedLength === 'option-1' ? 12 : selectedLength === 'option-2' ? 16 : 12;
    const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];
    const specialChars = '!@#$%^&*?';
    const numbers = '0123456789';

    // Process each answer to create meaningful parts
    const processAnswer = (answer, question, maxLength) => {
      question = question.toLowerCase();
      let processedPart = '';
      const cleanAnswer = answer.trim().replace(/\s+/g, ' ');

      if (question.includes('number')) {
        processedPart = answer.replace(/\D/g, '');
      } else if (question.includes('movie') || question.includes('show')) {
        const words = cleanAnswer.split(' ');
        if (words.length > 1) {
          processedPart = words[0].substring(0, 3) + words[1].substring(0, 2);
        } else {
          processedPart = words[0].substring(0, 5);
        }
      } else if (question.includes('song')) {
        const words = cleanAnswer.split(' ');
        processedPart = words[0].substring(0, 4);
        if (words.length > 1) {
          processedPart += words[1].substring(0, 2);
        }
      } else {
        processedPart = cleanAnswer.split(' ')[0].substring(0, maxLength);
      }

      return processedPart.charAt(0).toUpperCase() + processedPart.slice(1).toLowerCase();
    };

    const basePartLength = Math.floor((length - 3) / answers.length);
    const processedParts = answers.map((answer, index) => 
      processAnswer(answer, selectedQuestions[index], basePartLength)
    );

    // Define different patterns for password construction
    const patterns = [
      // Pattern 1: parts joined by special chars with number at end
      () => {
        const special1 = getRandomChar(specialChars);
        const special2 = getRandomChar(specialChars.replace(special1, '')); // Different special char
        const num = getRandomChar(numbers);
        return processedParts.join(special1) + special2 + num;
      },
      // Pattern 2: parts alternating with numbers and special chars
      () => {
        const special = getRandomChar(specialChars);
        const num = getRandomChar(numbers);
        return processedParts.map((part, i) => 
          i === processedParts.length - 1 ? part : part + (i % 2 === 0 ? special : num)
        ).join('');
      },
      // Pattern 3: special chars between reversed parts with number in middle
      () => {
        const special = getRandomChar(specialChars);
        const num = getRandomChar(numbers);
        return [...processedParts].reverse().join(special) + num + special;
      },
      // Pattern 4: parts mixed with both special chars and numbers
      () => {
        const special1 = getRandomChar(specialChars);
        const special2 = getRandomChar(specialChars.replace(special1, ''));
        const num1 = getRandomChar(numbers);
        const num2 = getRandomChar(numbers.replace(num1, ''));
        return processedParts[0] + special1 + processedParts[1] + num1 + 
               processedParts[2] + special2 + num2;
      }
    ];

    // Select a different pattern than last time
    let newPatternIndex;
    do {
      newPatternIndex = Math.floor(Math.random() * patterns.length);
    } while (newPatternIndex === lastPattern && patterns.length > 1);
    
    setLastPattern(newPatternIndex);
    
    // Generate password using selected pattern
    let newPassword = patterns[newPatternIndex]();

    // Adjust length if needed
    if (newPassword.length > length) {
      newPassword = newPassword.slice(0, length);
    } else while (newPassword.length < length) {
      newPassword += getRandomChar(numbers + specialChars);
    }

    // Ensure password meets minimum requirements
    if (!/[A-Z]/.test(newPassword)) {
      newPassword = newPassword.charAt(0).toUpperCase() + newPassword.slice(1);
    }
    if (!/[0-9]/.test(newPassword)) {
      const pos = Math.floor(newPassword.length / 2);
      newPassword = newPassword.slice(0, pos) + getRandomChar(numbers) + newPassword.slice(pos + 1);
    }
    if (!/[!@#$%^&*?]/.test(newPassword)) {
      const pos = Math.floor(newPassword.length * 0.75);
      newPassword = newPassword.slice(0, pos) + getRandomChar(specialChars) + newPassword.slice(pos + 1);
    }

    return newPassword;
  };

  const handleGeneratePassword = async () => {
    if (!answers || answers.some(answer => !answer.trim())) {
      alert("Please fill in all answers before generating a password");
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newPassword = await generatePassword();
      setGeneratedPassword(newPassword);
      setIsPasswordGenerated(true);
    } catch (error) {
      console.error("Error generating password:", error);
      alert("There was an error generating your password. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <StyledWrapper isPasswordGenerated={isPasswordGenerated}>
      {isGenerating ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <MakeButton 
          onClick={handleGeneratePassword}
          isGenerating={isGenerating}
          generatedPassword={generatedPassword}
          isPasswordGenerated={isPasswordGenerated}
        />
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.isPasswordGenerated ? '150px' : '90px'};
  margin-bottom: ${props => props.isPasswordGenerated ? '10px' : '0'}
  margin-left: ${props => props.isPasswordGenerated ? '100px' : '100px'};
  margin-left: 55px;
  transition: margin 0.3s ease;

  @media (min-width: 1024px) and (max-width: 1440px) {
    margin-top: ${props => props.isPasswordGenerated ? '60px' : '60px'};
     margin-left: ${props => props.isPasswordGenerated ? '100px' : '0px'};
  }
  
  @media (max-width: 480px) {
    margin-bottom: 5px;
    margin-top: 5px;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`;

export default ButtonContainer;