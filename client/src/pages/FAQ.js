import React, { useState } from "react";
import styled from "styled-components";
import faqBg from "../assets/faqbackground.jpg"; // ✅ Import background image

const faqData = [
  {
    question: "How do I create a piknik event?",
    answer:
      "Start by visiting the homepage to view the 7-day weather forecast. Choose the sunniest day that works for you, and then click 'Create piknik' to select a park and add event details."
  },
  {
    question: "Can I invite friends to join my piknik?",
    answer:
      "Yes! Once your piknik is created, you can invite friends by entering their email addresses. They'll receive an invitation to join your event."
  },
  {
    question: "How does Piknik help me pick the best date?",
    answer:
      "Piknik shows you a 7-day weather forecast right on the homepage. You can pick the sunniest day yourself before creating your event."
  },
  {
    question: "What happens if the weather changes?",
    answer:
      "If the forecast changes after you've created your piknik, you'll get a notification so you can update your plans or reschedule if needed."
  },
  {
    question: "Can I edit or cancel my piknik later?",
    answer:
      "Absolutely! You can go to your account dashboard at any time to edit event details, change the date, or cancel your piknik."
  },
  {
    question: "Is Piknik free to use?",
    answer:
      "Yes! Piknik is completely free for anyone to plan, organize, and enjoy pikniks with friends."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <Overlay />
      <Content>
        <Title>Frequently Asked Questions</Title>
        {faqData.map((item, index) => (
          <FAQItem key={index}>
            <Question onClick={() => toggle(index)}>
              {item.question}
              <ToggleSymbol>{openIndex === index ? "-" : "+"}</ToggleSymbol>
            </Question>
            {openIndex === index && <Answer>{item.answer}</Answer>}
          </FAQItem>
        ))}
      </Content>
    </Container>
  );
};

export default FAQ;

// Styled Components
const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background-image: url(${faqBg});
  background-size: cover;
  background-position: center;
  padding: 60px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  backdrop-filter: blur(3px); /* 💡 Applies the blur */
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const FAQItem = styled.div`
  margin-bottom: 20px;
`;

const Question = styled.div`
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background-color: #f3c530;
  padding: 15px;
  border-radius: 8px;
`;

const ToggleSymbol = styled.span`
  font-size: 20px;
`;

const Answer = styled.p`
  background: #fff9e5;
  padding: 15px;
  border-left: 4px solid #f3c530;
  border-radius: 0 0 8px 8px;
`;
