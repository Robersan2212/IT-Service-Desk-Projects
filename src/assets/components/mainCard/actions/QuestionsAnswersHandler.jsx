import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Input from '../inputs/Input';

// First, define the ChangeButtonStyle
const ChangeButtonStyle = css`
  --primary-color: #0B6DA2;
  --secondary-color: #fff;
  --hover-color: #111;
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;

  border-radius: 20px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  color: var(--secondary-color);
  padding: 1em 1.8em;
  background: var(--primary-color);
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #006eb6;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 200px;
  font-size: 0.8rem;

  .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;

    &::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      border: solid var(--secondary-color);
      border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
      display: inline-block;
      top: -3px;
      right: 3px;
      transition: 0.2s;
      padding: 3px;
      transform: rotate(-45deg);
    }
  }

  &:hover {
    .arrow {
      background: var(--secondary-color);

      &:before {
        right: 0;
      }
    }
  }
`;

// Then define the QuestionContainer that uses it
const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 68px;
  position: relative;
  font-size: large;

  @media (max-width: 480px) {
    margin-bottom: 40px;
    margin-top: 40px;
  }

  button {
    ${ChangeButtonStyle}
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    margin-bottom: 30px;
    margin-top: 40px;
  }
`;
const QuestionsAnswersHandler = ({ onAnswersChange, onQuestionsChange }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState(['', '', '']);

  const questions = [
    //Music//
  "What is your favorite song?",
  "What is your favorite band?",
  "What is your favorite solo artist?",
  "What is your favorite album?",
  "What is your favorite music genre?",
  "What is your favorite musical instrument?",
  "What is your favorite concert?",
  "What is your favorite music video?",
  "What is your favorite song lyric?",
  "What is your favorite music festival?",

  //Hobbies//
  "What is your favorite hobby?",
  "What is your favorite craft?",
  "What is your favorite outdoor activity?",
  "What is your favorite indoor activity?",
  "What is your favorite way to relax?",
  "What is your favorite way to exercise?",
  "What is your favorite thing to collect?",
  "What is your favorite DIY project?",
  "What is your favorite board game?",
  "What is your favorite card game?",

  //Food//
  "What is your favorite type of cuisine?",
  "What is your favorite dish?",
  "What is your favorite dessert?",
  "What is your favorite snack?",
  "What is your favorite fruit?",
  "What is your favorite vegetable?",
  "What is your favorite breakfast food?",
  "What is your favorite lunch food?",
  "What is your favorite dinner food?",
  "What is your favorite pizza topping?",

  //Video Games//
  "What is your favorite video game?",
  "What is your favorite game console?",
  "What is your favorite game genre?",
  "What is your favorite game character?",
  "What is your favorite multiplayer game?",
  "What is your favorite single-player game?",
  "What is your favorite mobile game?",
  "What is your favorite retro game?",
  "What is your favorite game soundtrack?",
  "What is your favorite game developer?",

  //Sports//
  "What is your favorite sport?",
  "What is your favorite team?",
  "What is your favorite athlete?",
  "What is your favorite Olympic sport?",
  "What is your favorite extreme sport?",
  "What is your favorite sport to watch?",
  "What is your favorite sport to play?",
  "What is your favorite sports event?",
  "What is your favorite sports venue?",
  "What is your favorite sports movie?",

  //Movies//
  "What is your favorite movie?",
  "What is your favorite movie genre?",
  "What is your favorite movie quote?",
  "What is your favorite movie character?",
  "What is your favorite movie director?",
  "What is your favorite movie soundtrack?",
  "What is your favorite animated movie?",
  "What is your favorite action movie?",
  "What is your favorite comedy movie?",
  "What is your favorite drama movie?",

  //Shows//
  "What is your favorite TV show?",
  "What is your favorite TV show genre?",
  "What is your favorite TV show character?",
  "What is your favorite TV show quote?",
  "What is your favorite TV show theme song?",
  "What is your favorite reality show?",
  "What is your favorite sitcom?",
  "What is your favorite drama series?",
  "What is your favorite animated series?",
  "What is your favorite documentary series?",

  //Travel//
  "What is your favorite place to travel?",
  "What is your favorite city?",
  "What is your favorite country?",
  "What is your favorite travel activity?",
  "What is your favorite travel destination?",
  "What is your favorite travel memory?",
  "What is your favorite travel companion?",
  "What is your favorite travel season?",
  "What is your favorite travel book?",
  "What is your favorite travel blog?",

  //The Book of Mormon//
  "What is your favorite Book of Mormon verse?",
  "What is your favorite Book of Mormon story?",
  "What is your favorite Book of Mormon prophet?",
  "What is your favorite Book of Mormon chapter?",
  "What is your favorite Book of Mormon book?",
  "What is your favorite Book of Mormon miracle?",
  "What is your favorite Book of Mormon parable?",
  "What is your favorite Book of Mormon teaching?",
  "What is your favorite Book of Mormon chapter?"
  ];

 // Initialize random questions
 useEffect(() => {
  shuffleQuestions();
}, []);

// Shuffle and select random questions
const shuffleQuestions = () => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);
  setSelectedQuestions(selected);
  onQuestionsChange(selected); // Pass questions up to parent
};

// Change a specific question
const changeQuestion = (index) => {
  const newQuestions = [...selectedQuestions];
  const remainingQuestions = questions.filter(q => !selectedQuestions.includes(q));
  newQuestions[index] = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
  setSelectedQuestions(newQuestions);
  onQuestionsChange(newQuestions); // Pass updated questions up
  
  // Reset the answer for changed question
  const newAnswers = [...answers];
  newAnswers[index] = '';
  setAnswers(newAnswers);
  onAnswersChange(newAnswers);
};

// Handle answer changes
const handleInputChange = (index, value) => {
  const newAnswers = [...answers];
  newAnswers[index] = value;
  setAnswers(newAnswers);
  onAnswersChange(newAnswers);
};

return (
  <div>
      {selectedQuestions.map((question, index) => (
        <QuestionContainer key={index}>
          <Input
            question={question}
            value={answers[index]}
            onChange={(value) => handleInputChange(index, value)}
          />
          <button
            type="button"
            className="ChangeButton"
            onClick={() => changeQuestion(index)}
          >
            Change
            <span className="arrow-wrapper">
              <span className="arrow"></span>
            </span>
          </button>
        </QuestionContainer>
      ))}
    </div>
  );
};



export default QuestionsAnswersHandler;