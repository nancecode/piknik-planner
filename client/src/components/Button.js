import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick, type = "button", bg = "#f3c530", color = "#000" }) => {
  return (
    <StyledButton onClick={onClick} type={type} $bg={bg} $color={color}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  background-color: ${(props) => props.$bg};
  color: ${(props) => props.$color};
  border: none;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e0b720;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.15);
  }
`;
