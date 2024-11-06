import { ReactComponent as Magnifier } from './images/magnifying-glass-svgrepo-com (1).svg'

import React from "react"
import styled from "styled-components"

const AnalyzerHeader = () =>{
    return (
        <StyledWrapper>
            <header className="card-header">
                <h1><Magnifier />Analyze Your Password</h1>
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
    font-weight: 500;

    //laptop screen size
    @media (min-width: 1024px) and (max-width: 1440px){
        font-size:1.4rem;
        margin-left: 2px;

        svg{
        height: 30px;
        width: 28px;
        margin-right:9px;
        }
    }
}

svg{
height: 40px;
width: 40px;
margin-right:8px;
}
`;

export default AnalyzerHeader;