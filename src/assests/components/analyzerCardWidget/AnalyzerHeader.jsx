import React from "react"
import styled from "styled-components"

const AnalyzerHeader = () =>{
    return (
        <StyledWrapper>
            <header className="card-header">
                <h1>Analyze Your Password</h1>
            </header>
        </StyledWrapper>
    )

}

const StyledWrapper = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:wght@100;400;500&display=swap');

.card-header h1{
display: flex;
align-items: flex-start;
color: #006eb6;
font-size: 1.6rem;
font-family:'Roboto', sans-serif;
font-weight: 500;
}
`;

export default AnalyzerHeader;