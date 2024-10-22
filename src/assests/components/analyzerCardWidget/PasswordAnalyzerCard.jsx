import React from "react";
import styled from "styled-components";

//Components import from analyzerCardWidget folder//
import AnalyzerHeader from "./AnalyzerHeader";

const PasswordAnalyzerCard = () => {
  return (
    <StyledWrapper>
      <div className="modal">
        <form className="form">
          <AnalyzerHeader></AnalyzerHeader>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .modal {
  background: white;
  margin-right: 110px;
  margin-left: -380px;
  margin-top: 40px;
  margin-bottom: 40px;
  max-width: 450px;
  width: 90vh;
  height: 80vh;
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 26px;


 ////////responsive modules/////////
  @media (max-width: 768px) {
    padding: 15px;
    margin-left:0;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin-left:0;
  }
  
  //laptop screen size
  @media (min-width: 1024px) and (max-width: 1440px) {
    max-width: 700px;
    margin-left:-55px;
    margin-right:40px;
    width: 60vh;
    height: 80vh;
  }

}

.form {
  display: flex;
  flex-direction: column;
  justify-content: right;
  gap: 20px;
  margin: 30px;
  padding: 50px;
}
`;

export default PasswordAnalyzerCard;
