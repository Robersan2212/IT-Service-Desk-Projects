import React, { useState } from 'react';

const PasswordGenerator = ({ answers, selectedLength, selectedQuestions }) => {
  const [generatingPassword, setIsGeneratingPassword] = useState(false);

  const getPasswordLength = () => {
    switch (selectedLength) {
      case 'option-1':
        return 12;
      case 'option-2':
        return 16;
      default:
        return 12; // Default length
    }
  };

  const createPassword = () => {
    const passwordLength = getPasswordLength();
    
    const getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const removeSpaces = (str) => str.replace(/\s+/g, '');
    
    // Process answers to create password components
    const processedParts = answers.map((answer, index) => {
      const question = selectedQuestions[index].toLowerCase();
      const cleanAnswer = removeSpaces(answer);
      
      let partLength = Math.floor(passwordLength / 4);
      
      if (question.includes('favorite')) {
        if (question.includes('number')) {
          return cleanAnswer.replace(/\D/g, '').substring(0, partLength);
        } else if (question.includes('song') || question.includes('movie')) {
          return cleanAnswer.split(' ').map(word => word[0]).join('').substring(0, partLength);
        } else {
          return cleanAnswer.substring(0, partLength);
        }
      }
      
      return cleanAnswer.substring(0, partLength);
    });

    // Addds special characters and numbers
    const specialChars = '!@#$%^&*?';
    const specialChar1 = specialChars[getRandomNumber(0, specialChars.length - 1)];
    const specialChar2 = specialChars[getRandomNumber(0, specialChars.length - 1)];
    const randomNum1 = getRandomNumber(0, 9);
    const randomNum2 = getRandomNumber(0, 9);

    const parts = [
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

    let newPassword = parts.join('');
    newPassword = newPassword.substring(0, passwordLength);

    // Logic to ensure password complexity
    if (!/[!@#$%^&*?]/.test(newPassword)) {
      const randomIndex = getRandomNumber(0, newPassword.length - 1);
      newPassword = newPassword.substring(0, randomIndex) + 
                    specialChars[getRandomNumber(0, specialChars.length - 1)] + 
                    newPassword.substring(randomIndex + 1);
    }
    
    if (!/\d/.test(newPassword)) {
      const randomIndex = getRandomNumber(0, newPassword.length - 1);
      newPassword = newPassword.substring(0, randomIndex) + 
                    getRandomNumber(0, 9) + 
                    newPassword.substring(randomIndex + 1);
    }

    const uppercaseIndex = getRandomNumber(0, newPassword.length - 1);
    newPassword = newPassword.slice(0, uppercaseIndex) + 
                 newPassword[uppercaseIndex].toUpperCase() + 
                 newPassword.slice(uppercaseIndex + 1);

    return newPassword;
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