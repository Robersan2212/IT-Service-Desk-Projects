import React from "react";
import styled from 'styled-components';

//Component Imports
import Loader from './Loader'

const LoaderContainer = () => {
    return(
        <Load>
            <Loader />
        </Load>
    )
}

const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0B6DA2;
`;

export default LoaderContainer;