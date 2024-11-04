import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderContainer from "./header/HeaderContainer";
import QuestionsAnswersHandler from "./actions/QuestionsAnswersHandler";
import ButtonContainer from './buttons/ButtonContainer';
import LengthDropdown from './buttons/LengthDropdown';

const ResponsiveModalCard = ({ formVisible, onPasswordGenerate }) => {
  const [answers, setAnswers] = useState(['', '', '']);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedLength, setSelectedLength] = useState('all');

  const handleAnswersChange = (newAnswers) => {
    setAnswers(newAnswers);
  };

  const handleQuestionsChange = (questions) => {
    setSelectedQuestions(questions);
  };
  
  return (
    <StyledWrapper>
      <div className="modal">
        <HeaderContainer />
        <form>
          <div id="questions">
            <QuestionsAnswersHandler 
              onAnswersChange={handleAnswersChange}
              onQuestionsChange={handleQuestionsChange}
            />
          </div>
          <LengthDropdown onLengthChange={setSelectedLength} />
          <ButtonContainer 
            answers={answers}
            selectedLength={selectedLength}
            selectedQuestions={selectedQuestions}
            onPasswordGenerate={onPasswordGenerate}
          />
        </form>
      </div>
    </StyledWrapper>
  );
};



const StyledWrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-right: -80px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 
              0px 105px 63px rgba(0, 0, 0, 0.05), 
              0px 47px 47px rgba(0, 0, 0, 0.09), 
              0px 12px 26px rgba(0, 0, 0, 0.1), 
              0px 0px 0px rgba(0, 0, 0, 0.1);
  ;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
  
  @media (min-width: 1024px) and (max-width: 1440px) {
    max-width: 700px;
    padding: 25px;
  }
`;


  
export default ResponsiveModalCard;