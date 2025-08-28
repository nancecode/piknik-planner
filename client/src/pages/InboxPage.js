import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import inboxBg from '../assets/inboxbackground.jpg';

const InboxPage = () => {
  const [weather, setWeather] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  // Picnic-friendly weather check
  const picnicFriendlyDescriptions = [
    'sunny',
    'clear sky',
    'mostly sunny',
    'partly sunny',
    'few clouds',
    'clear',
  ];

  // Fetch weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('http://localhost:9000/api/weather');
        const data = await res.json();
        setWeather(data.forecast?.[0]);
      } catch (err) {
        console.error("❌ Failed to fetch weather:", err);
      }
    };

    fetchWeather();
  }, []);

  const isPicnicFriendly = weather?.description &&
    picnicFriendlyDescriptions.some(desc =>
      weather.description.toLowerCase().includes(desc)
    );

  const weatherMessage = isPicnicFriendly
    ? [{
        id: 0,
        type: '🌤️ Weather Update',
        content: `Today’s weather: ${weather.description}, high of ${weather.high}°C.`,
        details: `Feels like: ${weather.feelsLike}°C\nWind: ${weather.wind} km/h\nSunset: ${weather.sunset}`,
        read: false,
        response: null,
      }]
    : [];

  const initialMessages = [
    {
      id: 1,
      type: 'Invitation',
      content: 'You have been invited to a picnic at Laurier Park. Accept, decline, or respond "maybe".',
      details: 'Join us at Laurier Park at 2 PM. Bring your favorite dish and picnic mat.',
      read: false,
      response: null,
    },
    {
      id: 2,
      type: 'Private Message',
      content: 'Who’s bringing the snacks for the picnic?',
      details: 'Sent by Alex in the Picnic Chat group on May 29th, 11:03 AM.',
      read: true,
      response: null,
    },
    {
      id: 3,
      type: 'Event Reminder',
      content: 'Don’t forget your picnic at Laurier Park today!',
      details: 'Starts at 2 PM near the west entrance. Look for the red blanket.',
      read: true,
      response: null,
    },
    {
      id: 4,
      type: 'Friend Request',
      content: 'X added you to the "Sunday Brunch Crew".',
      details: 'You are now part of the Sunday Brunch Crew group. Check upcoming brunch plans in your Events tab.',
      read: true,
      response: null,
    },
    {
      id: 5,
      type: 'App Notification',
      content: 'Weather update: Sunny with a high of 25°C. Perfect for a picnic!',
      details: 'Weather provided by the Piknik Forecast Engine. Keep sunscreen handy!',
      read: true,
      response: null,
    },
    {
      id: 6,
      type: 'User Support',
      content: 'Need help? Contact support for assistance.',
      details: 'Our team is available Mon–Fri, 9am–5pm. Email us at support@piknik.app.',
      read: true,
      response: null,
    },
  ];

  const [messages, setMessages] = useState([...weatherMessage, ...initialMessages]);

  const toggleMessage = (id) => {
    setSelectedMessageId((prevId) => (prevId === id ? null : id));
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
  };

  const handleRSVP = (id, choice) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, response: choice } : msg
      )
    );
  };

  return (
    <Wrapper>
      <Content>
        <h1>📬 Inbox</h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              onClick={() => toggleMessage(message.id)}
              expanded={selectedMessageId === message.id}
            >
              <strong>
                {message.type}
                {!message.read && <NewBadge>🆕</NewBadge>}
              </strong>{' '}
              {message.content}

              {selectedMessageId === message.id && (
                <MessageDetails>
                  {message.details}

                  {message.type === 'Invitation' && (
                    <>
                      <RSVPButtons>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRSVP(message.id, 'Accepted');
                          }}
                          disabled={message.response === 'Accepted'}
                        >
                          ✅ Accept
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRSVP(message.id, 'Maybe');
                          }}
                          disabled={message.response === 'Maybe'}
                        >
                          🤔 Maybe
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRSVP(message.id, 'Declined');
                          }}
                          disabled={message.response === 'Declined'}
                        >
                          ❌ Decline
                        </button>
                      </RSVPButtons>

                      {message.response && (
                        <ResponseText>
                          ✅ You responded: <strong>{message.response}</strong>
                        </ResponseText>
                      )}
                    </>
                  )}
                </MessageDetails>
              )}
            </MessageCard>
          ))}
        </ul>
      </Content>
    </Wrapper>
  );
};

export default InboxPage;

// Styled Components
const Wrapper = styled.div`
  background-image: url(${inboxBg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Content = styled.div`
  width: 100%;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
`;

const MessageCard = styled.li`
  background: rgba(255, 255, 255, 0.85);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const MessageDetails = styled.div`
  margin-top: 8px;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
  white-space: pre-line;
`;

const NewBadge = styled.span`
  margin-left: 8px;
  background: #f3c530;
  color: #000;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 12px;
  font-weight: bold;
`;

const RSVPButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;

  button {
    padding: 6px 12px;
    font-size: 0.85rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background-color: #f3c530;
    color: #000;
    transition: background 0.2s;

    &:hover {
      background-color: #e0b824;
    }

    &:disabled {
      background-color: #ddd;
      cursor: not-allowed;
    }
  }
`;

const ResponseText = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: green;
`;
