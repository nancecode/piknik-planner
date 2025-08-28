import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import eventsBg from '../assets/eventsbackground.jpg';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [joinedMap, setJoinedMap] = useState({});
  const [joinStatus, setJoinStatus] = useState({});
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/events");
        const data = await res.json();

        const enriched = data.map((event) => ({
          ...event,
          going: typeof event.going === 'number' ? event.going : Math.floor(Math.random() * 10) + 1,
          maybeGoing: typeof event.maybeGoing === 'number' ? event.maybeGoing : Math.floor(Math.random() * 6),
          invitedEmails: Array.isArray(event.invitedEmails)
            ? event.invitedEmails
            : generateRandomEmails(),
          description: event.description || "Join us for a fun picnic with food, games, and laughter!",
        }));

        setEvents(enriched);
      } catch (err) {
        console.error("❌ Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleJoin = async (eventId) => {
    const status = joinStatus[eventId];
    if (!status || !user?.email) {
      alert("Please select Going or Maybe before joining.");
      return;
    }

    try {
      const res = await fetch("http://localhost:9000/api/pikniks/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          eventId,
          status,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setJoinedMap((prev) => ({ ...prev, [eventId]: true }));
      } else {
        console.error("Join failed:", data.message);
      }
    } catch (err) {
      console.error("❌ Join error:", err);
    }
  };

  const generateRandomEmails = () => {
    const names = ["alex", "jane", "lucas", "sara", "mark", "nina", "john"];
    return Array.from({ length: Math.floor(Math.random() * 5 + 2) }, () => {
      const name = names[Math.floor(Math.random() * names.length)];
      return `${name}@example.com`;
    });
  };

  return (
    <PageWrapper>
      <TitleWrapper>
        <Title>🌳 Summer 2025 Piknik Events</Title>
      </TitleWrapper>
      <EventGrid>
        {events.map((event) => {
          const totalInvites = event.invitedEmails?.length || 0;
          const isJoined = joinedMap[event._id];

          return (
            <EventCard
              key={event._id || event.title}
              onClick={() => navigate(`/events/${event._id}`)} 
            >
              <h2>{event.title || "Piknik Event"}</h2>
              <p><strong>Park:</strong> {event.park || "Unknown Park"}</p>
              <p><strong>Date:</strong> {event.date || "TBD"}</p>
              <p><strong>Time:</strong> {event.time || "TBD"}</p>
              <p><strong>Forecast:</strong> {event.weatherForecast || "N/A"}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Created by:</strong> {event.createdByUsername || "Unknown"}</p>
              <p><strong>Total Invites:</strong> {totalInvites}</p>
              <p><strong>Total Interested:</strong> {event.going + event.maybeGoing}</p>

              <Attendance>
                <span>✅ {event.going} Going</span>
                <span>🤔 {event.maybeGoing} Maybe</span>
              </Attendance>

              {!isJoined ? (
                <>
                  <RadioGroup onClick={(e) => e.stopPropagation()}>
                    <label>
                      <input
                        type="radio"
                        name={`status-${event._id}`}
                        value="going"
                        onChange={() =>
                          setJoinStatus((prev) => ({ ...prev, [event._id]: "going" }))
                        }
                      />
                      Going
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`status-${event._id}`}
                        value="maybe"
                        onChange={() =>
                          setJoinStatus((prev) => ({ ...prev, [event._id]: "maybe" }))
                        }
                      />
                      Maybe
                    </label>
                  </RadioGroup>

                  <JoinButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoin(event._id);
                    }}
                  >
                    Join
                  </JoinButton>
                </>
              ) : (
                <JoinedButton onClick={(e) => e.stopPropagation()}>Joined</JoinedButton>
              )}
            </EventCard>
          );
        })}
      </EventGrid>
    </PageWrapper>
  );
};

export default EventsPage;

// Styled Components
const PageWrapper = styled.div`
  padding: 40px 20px;
  background-image: url(${eventsBg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  color: #333;
`;

const TitleWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto 40px;
`;

const Title = styled.h1`
  text-align: center;
  background: rgba(255, 255, 255, 0.85);
  padding: 1rem;
  border-radius: 12px;
`;

const EventGrid = styled.div`
  display: grid;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const EventCard = styled.div`
  background: #fff9d6;
  border: 2px solid #f3c530;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.015);
  }

  p {
    margin: 0.3rem 0;
  }
`;

const Attendance = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 0.95rem;
`;

const JoinButton = styled.button`
  margin-top: 12px;
  background-color: #f3c530;
  color: #000;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5b924;
  }
`;

const JoinedButton = styled(JoinButton)`
  background-color: #c83232;
  color: white;
  cursor: default;

  &:hover {
    background-color: #c83232;
  }
`;

const RadioGroup = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 15px;
  font-size: 0.9rem;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;
