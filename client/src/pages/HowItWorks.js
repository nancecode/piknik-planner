import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import backgroundImg from "../assets/howitworksbackground.jpg"; // ✅ import the image

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <SectionWrapper>
      <Overlay>
        <Title>How Piknik Works ☀️🧺</Title>
        <Steps>
          <Step>
            <Emoji>📅</Emoji>
            <Text>
              Pick a day, any day! Our <strong>7-day weather forecast</strong> helps you choose the sunniest vibes.
            </Text>
          </Step>
          <Step>
            <Emoji>📍</Emoji>
            <Text>
              Browse beautiful <strong>parks in Montreal</strong> with BBQs, picnic tables, and open skies.
            </Text>
          </Step>
          <Step>
            <Emoji>🍗🌭🍉</Emoji>
            <Text>
              Plan your dream piknik. Invite friends, pack snacks, and don’t forget the watermelon.
            </Text>
          </Step>
          <Step>
            <Emoji>🌂🧥</Emoji>
            <Text>
              Check the forecast again and maybe, just maybe, <strong>bring a jacket or umbrella</strong> (Montreal likes surprises).
            </Text>
          </Step>
        </Steps>
        <Spacer />
        <StyledButton onClick={() => navigate("/home")}>Start Planning 🎉</StyledButton>
      </Overlay>
    </SectionWrapper>
  );
};

export default HowItWorks;

// Styled Components

const SectionWrapper = styled.section`
  background: url(${backgroundImg}) no-repeat center center;
  background-size: cover;
  padding: 0 20px; /* 🔧 removed top/bottom space */
  text-align: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  background: rgba(255, 255, 255, 0.92);
  padding: 60px 20px; /* 🧠 moved spacing into the overlay */
  border-radius: 12px;
  max-width: 850px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 600px) {
    padding: 40px 15px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
  font-size: 20px;
  color: #444;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Emoji = styled.span`
  font-size: 32px;
`;

const Text = styled.p`
  max-width: 600px;
  text-align: left;
  margin: 0;

  @media (max-width: 600px) {
    text-align: center;
    font-size: 16px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
`;

const Spacer = styled.div`
  height: 30px;
`;
