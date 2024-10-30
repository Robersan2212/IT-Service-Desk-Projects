import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

import HeaderContainer from "./header/HeaderContainer";
import QuestionsAnswersHandler from "./actions/QuestionsAnswersHandler";




const ResponsiveModalCard = () => {
  const [answers, setAnswers] = useState(['', '', '']);

  const handleAnswersChange = (newAnswers) => {
    setAnswers(newAnswers);
    // You can add additional logic here for handling the answers
    console.log('Answers updated:', newAnswers);
  };
  
  return (
    <StyledWrapper>
      <div className="modal">
        <HeaderContainer />
        <form>
          <div id="questions">
            <QuestionsAnswersHandler onAnswersChange={handleAnswersChange}/>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
};



const StyledWrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
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