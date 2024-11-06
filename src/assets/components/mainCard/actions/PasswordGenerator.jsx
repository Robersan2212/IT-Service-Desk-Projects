import React, { useState } from 'react';

const PasswordGenerator = ({ answers, selectedLength, selectedQuestions }) => {
  const [generatingPassword, setIsGeneratingPassword] = useState(false);

  const getPasswordLength = () => {
    switch (selectedLength) {
      case 'option-1':
        return 12;
      case 'option-2':
        return 16;
      case 'option-3':
        return 18;
      default:
        return 12; // Default length if no option selected
    }
  };

  const createPassword = () => {
    const passwordLength = getPasswordLength();
    
    const getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const removeSpaces = (str) => str.replace(/\s+/g, '');
    
    // Calculate the base length for each answer-derived part
    const basePartLength = Math.floor((passwordLength - 4) / answers.length); // Reserve 4 chars for special/numbers
    
    // Process answers to create password components with controlled lengths
    const processedParts = answers.map((answer, index) => {
      const question = selectedQuestions[index].toLowerCase();
      const cleanAnswer = removeSpaces(answer);
      
      if (question.includes('favorite')) {
        if (question.includes('number')) {
          return cleanAnswer.replace(/\D/g, '').substring(0, basePartLength);
        } else if (question.includes('song') || question.includes('movie')) {
          return cleanAnswer.split(' ').map(word => word[0]).join('').substring(0, basePartLength);
        }
      }
      return cleanAnswer.substring(0, basePartLength);
    });

    // Add special characters and numbers
    const specialChars = '!@#$%^&*?';
    const specialChar1 = specialChars[getRandomNumber(0, specialChars.length - 1)];
    const specialChar2 = specialChars[getRandomNumber(0, specialChars.length - 1)];
    const randomNum1 = getRandomNumber(0, 9);
    const randomNum2 = getRandomNumber(0, 9);

    // Combine all parts
    let parts = [
      ...processedParts,
      specialChar1,
      specialChar2,
      randomNum1.toString(),
      randomNum2.toString()
    ];

    // Shuffle parts
    for (let i = parts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [parts[i], parts[j]] = [parts[j], parts[i]];
    }

    // Join and ensure exact length
    let newPassword = parts.join('');
    
    // If the password is too long, trim it
    if (newPassword.length > passwordLength) {
      newPassword = newPassword.substring(0, passwordLength);
    }
    
    // If the password is too short, pad it with random characters
    while (newPassword.length < passwordLength) {
      const padChar = Math.random() > 0.5 
        ? getRandomNumber(0, 9).toString()
        : specialChars[getRandomNumber(0, specialChars.length - 1)];
      newPassword += padChar;
    }

    // Ensure password complexity requirements
    let finalPassword = newPassword;
    
    // Ensure at least one special character
    if (!/[!@#$%^&*?]/.test(finalPassword)) {
      const pos = getRandomNumber(0, finalPassword.length - 1);
      finalPassword = finalPassword.substring(0, pos) + 
                     specialChars[getRandomNumber(0, specialChars.length - 1)] + 
                     finalPassword.substring(pos + 1);
    }
    
    // Ensure at least one number
    if (!/\d/.test(finalPassword)) {
      const pos = getRandomNumber(0, finalPassword.length - 1);
      finalPassword = finalPassword.substring(0, pos) + 
                     getRandomNumber(0, 9) + 
                     finalPassword.substring(pos + 1);
    }

    // Ensure at least one uppercase letter
    if (!/[A-Z]/.test(finalPassword)) {
      const pos = getRandomNumber(0, finalPassword.length - 1);
      finalPassword = finalPassword.substring(0, pos) + 
                     finalPassword.charAt(pos).toUpperCase() + 
                     finalPassword.substring(pos + 1);
    }

    // Final length check
    return finalPassword.substring(0, passwordLength);
  };

  const generatePassword = () => {
    if (answers.some(answer => answer.trim() === '')) {
      return null;
    }

    setIsGeneratingPassword(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPassword = createPassword();
        setIsGeneratingPassword(false);
        resolve(newPassword);
      }, 2000);
    });
  };

  return {
    generatePassword,
    generatingPassword
  };
};

export default PasswordGenerator;