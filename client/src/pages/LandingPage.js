import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import backgroundImg from "../assets/Landingpagebackground-BW.jpg";
import sideImage from "../assets/Landingpagedesign.jpg";
import logoImg from "../assets/piknik logo-white.png";
import Button from "../components/Button";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Overlay />
      <Content>
        <LeftContent>
          <LogoWrapper>
            <LogoImage src={logoImg} alt="Piknik Logo" />
          </LogoWrapper>

          <Tagline>Where great weather meets great company.</Tagline>
          <SunIcon>☀️</SunIcon>

          <ButtonGroup>
            <Button onClick={() => navigate("/signup")} bg="#f3c530" color="#000">
              GET STARTED!
            </Button>
            <Button onClick={() => navigate("/login")} bg="#ffffff" color="#000">
              I have an account
            </Button>
          </ButtonGroup>

          <FeatureBox>
            <h2>
              Why use <Highlight>Piknik?</Highlight>
            </h2>
            <ul>
              <li>✔ Plan your event based on accurate weather</li>
              <li>✔ Invite friends easily and coordinate</li>
              <li>✔ Discover top-rated parks across Montreal</li>
              <li>✔ No more rained-out plans</li>
              <li>✔ Made for locals who love the outdoors</li>
            </ul>
          </FeatureBox>
        </LeftContent>

        <RightImage src={sideImage} alt="Landing Visual" />
      </Content>
    </Wrapper>
  );
};

export default LandingPage;

// STYLES

const Wrapper = styled.div`
  background: url(${backgroundImg}) center center / cover no-repeat;
  min-height: 100vh;
  position: relative;
  color: white;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;
  height: 100vh;
  padding: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    padding: 1.5rem;
    height: auto;
    min-height: 100vh;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
`;

const LogoWrapper = styled.div`
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 220px;

  @media (max-width: 768px) {
    width: 160px;
  }
`;

const Tagline = styled.p`
  font-size: 24px;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const SunIcon = styled.div`
  font-size: 32px;
  margin: 10px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  width: 100%;

  button {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }
`;

const FeatureBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  color: #e60000;
  border-radius: 12px;
  padding: 20px 30px;
  text-align: left;
  margin-top: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 380px;

  h2 {
    font-size: 22px;
    margin-bottom: 12px;
  }

  ul {
    list-style: none;
    padding-left: 0;
    font-weight: 600;
    font-size: 15px;
  }

  li {
    margin: 10px 0;
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 20px;
    ul {
      text-align: left;
    }
  }
`;

const RightImage = styled.img`
  max-height: 90vh;
  max-width: 80%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: -4px 0px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 90%;
    max-height: 50vh;
    margin-top: 20px;
  }
`;

const Highlight = styled.span`
  color: #e60000;
`;
