import React, { useState } from 'react';

const PasswordGenerator = ({ answers, onPasswordGenerated }) => {
  const [generatingPassword, setIsGeneratingPassword] = useState(false);

  const createPassword = () => {
    const getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const removeSpaces = (str) => str.replace(/\s+/g, '');

    // Take parts from each answer
    const part1 = removeSpaces(answers[0]).substring(0, 4);
    const part2 = removeSpaces(answers[1]).substring(Math.max(0, removeSpaces(answers[1]).length - 4));
    const part3 = removeSpaces(answers[2]).substring(0, 4);
    
    // Select a random special character
    const specialChars = '!@#$%^&*?';
    const specialChar = specialChars[getRandomNumber(0, specialChars.length - 1)];
    
    // Generate random numbers
    const randomNum1 = getRandomNumber(0, 9);
    const randomNum2 = getRandomNumber(0, 9);

    // Combine all parts
    const parts = [part1, randomNum1.toString(), part2, specialChar, part3, randomNum2.toString()];

    // Shuffle the array
    for (let i = parts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [parts[i], parts[j]] = [parts[j], parts[i]];
    }
    //Combine parts for password
    let newPassword = parts.join('');
    
    // Make one character uppercase
    const randomIndex = Math.floor(Math.random() * newPassword.length);
    newPassword = newPassword.slice(0, randomIndex) + 
                  newPassword[randomIndex].toUpperCase() + 
                  newPassword.slice(randomIndex + 1);
    
    return newPassword;
  };

  const generatePassword = () => {
    if (answers.some(answer => answer.trim() === '')) {
      return null; // Return null if any answer is empty
    }

    setIsGeneratingPassword(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPassword = createPassword();
        setIsGeneratingPassword(false);
        resolve(newPassword);
      }, Math.random() * 3000 + 1000);
    });
  };

  return {
    generatePassword,
    generatingPassword
  };
};

export default PasswordGenerator;