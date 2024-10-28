import React from "react";
import styled from "styled-components";

const PasswordBox = () => {
  return (
    <StyledWrapper>
      <div className="group">
        <textarea className="input" type="password" placeholder="password" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .group {
  display: flex;
  line-height: 30px;
  align-items: center;
  position: relative;
  max-width: 200px;
}

.textarea {
  width: 100%;
  height: 45px;
  line-height: 30px;
  padding: 0 5rem;
  padding-left: 3rem;
  border: 2px solid transparent;
  border-radius: 10px;
  outline: none;
  background-color: #f8fafc;
  color: #0d0c22;
  transition: .5s ease;
}

.textarea::placeholder {
  color: #94a3b8;
}

.input:focus, input:hover {
  outline: none;
  background-color: #fff;
  box-shadow: 0 0 0 5px rgb(129 140 248 / 30%);
}


`;

export default PasswordBox;
