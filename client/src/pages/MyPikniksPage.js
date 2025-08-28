import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import backgroundImg from "../assets/piknik-view.jpg";
import Button from "../components/Button"; // ✅ Assumes you have a custom Button component

const MyPikniksPage = () => {
  const [pikniks, setPikniks] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchPikniks = async () => {
      try {
        const res = await fetch(`http://localhost:9000/api/pikniks?userEmail=${user.email}`);
        const data = await res.json();
        setPikniks(data);
      } catch (err) {
        console.error("Failed to fetch pikniks:", err);
      }
    };

    if (user?.email) {
      fetchPikniks();
    }
  }, [user]);

  return (
    <Wrapper>
      <Content>
        <Title>My Pikniks 🧺</Title>
        <CreateButtonWrapper>
          <Button onClick={() => navigate("/home")}>+ Create New Piknik</Button>
        </CreateButtonWrapper>
        <CardsGrid>
          {pikniks.map((piknik) => (
            <Card key={piknik._id} onClick={() => navigate(`/piknik/${piknik._id}`)}>
              <Emoji>{piknik.emoji || "🧺"}</Emoji>
              <h3>{piknik.title || "Untitled"}</h3>
              <p>{piknik.date?.split("T")[0] || "No date"}</p>
              <small>{piknik.park?.name || "Unknown park"}</small>
            </Card>
          ))}
        </CardsGrid>
      </Content>
    </Wrapper>
  );
};

export default MyPikniksPage;

// Styled Components
const Wrapper = styled.div`
  background: url(${backgroundImg}) no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  padding: 40px 20px;
`;

const Content = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const CreateButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: #fffef0;
  border: 1px solid #f0d460;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    margin: 10px 0 5px;
  }
`;

const Emoji = styled.div`
  font-size: 2rem;
`;
