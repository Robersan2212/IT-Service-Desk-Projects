import React from 'react';
import styled from 'styled-components';

//This component includes "Your password" text and "estimate time to crack your password"
const DisplayPasswordBox = () =>{
    return(
        <StyledWrapper> 
            <h2>Your password: </h2>
            <div className='display-box'>
                {/* You can add text or leave it empty with dimensions */}
                &nbsp; {/* This is for empty box */}
            </div>
            <h3>estimate time to crack your password: </h3>
        </StyledWrapper>
    )    
}

const StyledWrapper = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:wght@100;400;500&display=swap');
    .display-box{
        display: flex; 
        background-color: #d7dbdd;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin-top: 20px;
        height: 10vh;
        width: 100%;
    }

    h2{
        margin-top: 15px;
        margin-bottom: -8px;
        padding: 3px;
        font-family: 'Roboto', sans-seriff; 

    }
    
    h3{
    font-family: 'Roboto', sans-seriff;
    padding: 3px;
    margin-top: 20px
    }
`







export default DisplayPasswordBox;