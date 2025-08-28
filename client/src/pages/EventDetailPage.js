import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import backgroundImg from "../assets/eventsbackground.jpg";
import { useUser } from "../context/UserContext";

const EventDetailsPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [event, setEvent] = useState(null);
  const [userRSVP, setUserRSVP] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:9000/api/events/${id}`);
        const data = await res.json();
        setEvent(data);

        if (user && data.rsvpStatusMap && data.rsvpStatusMap[user.email]) {
          const status = data.rsvpStatusMap[user.email];
          setUserRSVP(status);
          setSelectedStatus(status);
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    fetchEvent();
  }, [id, user]);

  const handleJoin = async () => {
    if (!selectedStatus || !user?.email) {
      alert("Please select Going or Maybe before joining.");
      return;
    }

    try {
      const res = await fetch("http://localhost:9000/api/pikniks/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          eventId: id,
          status: selectedStatus,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setUserRSVP(selectedStatus);
      } else {
        console.error("Join failed:", data.message);
      }
    } catch (err) {
      console.error("❌ Join error:", err);
    }
  };

  const getCountdownText = () => {
    if (!event?.date) return null;

    const eventDate = new Date(event.date);
    const today = new Date();

    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const timeDiff = eventDate.getTime() - today.getTime();
    const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

    if (dayDiff > 1) return `⏳ ${dayDiff} days left`;
    if (dayDiff === 1) return `⏳ 1 day left`;
    if (dayDiff === 0) return `🎉 Today’s the day!`;
    return `⛅ Event passed`;
  };

  if (!event) return <div>Loading event...</div>;

  return (
    <Wrapper>
      <Card>
        {event.date && <CountdownCorner>{getCountdownText()}</CountdownCorner>}
        <Header>🎉 {event.title}</Header>

        <Field><strong>🧑‍💼 Created by:</strong> {event.createdBy}</Field>
        <Field><strong>📍 Park:</strong> {event.park}</Field>
        <Field><strong>📅 Date:</strong> {event.date}</Field>
        <Field><strong>⏰ Time:</strong> {event.time}</Field>
        <Field><strong>☀️ Forecast:</strong> {event.weatherForecast}</Field>
        <Field><strong>📝 Description:</strong> {event.description}</Field>

        <Attendance>
          <span>✅ {event.going ?? 0} Going</span>
          <span>🤔 {event.maybeGoing ?? 0} Maybe</span>
        </Attendance>

        {user && (
          <RSVPSection>
            <h3>🙋 Your RSVP</h3>
            {userRSVP ? (
              <JoinedButton>
                {userRSVP === "going" ? "✅ You're going!" : "🤔 You're maybe going!"}
              </JoinedButton>
            ) : (
              <>
                <RadioGroup>
                  <label>
                    <input
                      type="radio"
                      name="rsvp"
                      value="going"
                      onChange={() => setSelectedStatus("going")}
                    />
                    Going
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rsvp"
                      value="maybe"
                      onChange={() => setSelectedStatus("maybe")}
                    />
                    Maybe
                  </label>
                </RadioGroup>
                <JoinButton onClick={handleJoin}>Join</JoinButton>
              </>
            )}
          </RSVPSection>
        )}
      </Card>
    </Wrapper>
  );
};

export default EventDetailsPage;

// --- Styled Components ---
const Wrapper = styled.div`
  background: url(${backgroundImg}) no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  position: relative;
  background: #fff9d6;
  padding: 30px;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid #f3c530;
`;

const CountdownCorner = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #c83232;
  color: white;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-weight: bold;
  border-radius: 8px;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Field = styled.p`
  margin: 8px 0;
`;

const Attendance = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  font-weight: bold;
`;

const RSVPSection = styled.div`
  margin-top: 30px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const JoinButton = styled.button`
  background-color: #f3c530;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e6b820;
  }
`;

const JoinedButton = styled.button`
  background-color: #c83232;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: bold;
  cursor: default;
`;
