import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; 
import logoBlack from "../assets/piknik-logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  const handleLogout = () => {
    logoutUser("You have been logged out."); // 
    navigate("/"); 
  };

  return (
    <FooterWrapper>
      <Logo
        src={logoBlack}
        alt="Piknik Logo"
        onClick={() => navigate("/home")}
      />
      <NavColumn>
        <a href="/faq">FAQ</a>
        <a href="/how-it-works">How it works</a>
        <button onClick={handleLogout}>Log out</button>
      </NavColumn>
    </FooterWrapper>
  );
};

export default Footer;

// Styled Components
const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f3c530;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
  z-index: 1000;

  @media (max-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px 24px;
  }
`;

const Logo = styled.img`
  width: 50px;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 100px;
  }
`;

const NavColumn = styled.div`
  display: flex;
  gap: 24px;

  a,
  button {
    all: unset;
    font-weight: 900;
    color: #000;
    cursor: pointer;
    font-size: 1rem;
    transition: color 0.2s ease;

    &:hover {
      color: rgb(255, 0, 0);
      text-decoration: none;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-end;
    text-align: right;
  }
`;
