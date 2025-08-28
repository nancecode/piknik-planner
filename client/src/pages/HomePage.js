import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import backgroundImg from "../assets/piknik-background1.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../components/Button";

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [events, setEvents] = useState([]);
  const sliderRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 45.5017;
        const lon = -73.5673;
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();

        const dailyForecast = data.list
          .filter((item) => item.dt_txt.includes("12:00:00"))
          .slice(0, 7)
          .map((item) => {
            const date = new Date(item.dt_txt);
            const options = { weekday: "short", month: "short", day: "numeric" };
            return {
              dateFormatted: date.toLocaleDateString("en-US", options),
              summary: item.weather[0].main,
              icon: item.weather[0].icon,
              temp: `${Math.round(item.main.temp)}°C`,
            };
          });

        setForecast(dailyForecast);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/events");
        const data = await res.json();

        const enriched = data.map((event) => ({
          ...event,
          going: typeof event.going === "number" ? event.going : Math.floor(Math.random() * 10) + 1,
          maybeGoing: typeof event.maybeGoing === "number" ? event.maybeGoing : Math.floor(Math.random() * 6),
          invitedEmails: Array.isArray(event.invitedEmails) ? event.invitedEmails : [],
          description: event.description || "Join us for a fun picnic with food, games, and laughter!",
        }));

        setEvents(enriched);
      } catch (err) {
        console.error("❌ Failed to fetch events:", err);
      }
    };

    fetchWeather();
    fetchEvents();
  }, []);

  const handlePlanClick = () => {
    if (selectedDate) {
      localStorage.setItem("selectedDate", selectedDate.toISOString().split("T")[0]);
      navigate("/create-piknik");
    } else {
      alert("Please select a date!");
    }
  };

  const scrollSlider = (direction) => {
    const scrollAmount = 300;
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Wrapper>
      <Overlay />
      <Content>
        <Hero>
          <h1>Where great weather ☀️ Meets great company!</h1>
          <CalendarSection>
            <label>Select your picnic date:</label>
            <StyledDatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              placeholderText="Pick a date"
              dateFormat="yyyy-MM-dd"
            />
            <Button onClick={handlePlanClick}>Start Planning</Button>
          </CalendarSection>
        </Hero>

        <ForecastSection>
          <h2> 🌦 7-Day Weather Forecast in Montreal</h2>
          <ForecastGridWrapper>
            <ForecastGrid>
              {forecast.map((day, index) => (
                <ForecastCard key={index} $weather={day.summary}>
                  <strong>{day.dateFormatted}</strong>
                  <IconWrapper>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      alt={day.summary}
                      style={{
                        filter: (() => {
                          const summary = day.summary.toLowerCase();
                          if (summary.includes("rain")) {
                            return "brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(80%) contrast(80%)";
                          } else if (summary.includes("clear") || summary.includes("sun")) {
                            return "brightness(0) saturate(100%) invert(89%) sepia(32%) saturate(749%) hue-rotate(356deg) brightness(103%) contrast(103%)";
                          } else if (summary.includes("cloud")) {
                            return "brightness(0) saturate(100%) invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)";
                          } else {
                            return "none";
                          }
                        })(),
                      }}
                    />
                  </IconWrapper>
                  <p>{day.summary}</p>
                  <p>{day.temp}</p>
                </ForecastCard>
              ))}
            </ForecastGrid>
          </ForecastGridWrapper>
          <ForecastNote>
            Planning a picnic in Montreal? 🧺 Just bring sunscreen ☀️, an umbrella ☂️, and a winter coat 🧥 you know, just in case. 😉
          </ForecastNote>
        </ForecastSection>

        <EventsSection>
          <EventsHeader>
            <ArrowButton onClick={() => scrollSlider("left")}>
              <FaChevronLeft />
            </ArrowButton>
            <h2 onClick={() => navigate("/events")}>Upcoming Events in Montreal Parks</h2>
            <ArrowButton onClick={() => scrollSlider("right")}>
              <FaChevronRight />
            </ArrowButton>
          </EventsHeader>

          <EventsSlider ref={sliderRef}>
            {events.map((event) => (
              <EventCard
                key={event._id || event.title}
                onClick={(e) => {
                  const tag = e.target.tagName;
                  if (tag !== "BUTTON" && tag !== "INPUT" && tag !== "LABEL") {
                    const id = event._id || event.id || "unknown";
                    navigate(`/events/${id}`);
                  }
                }}
              >
                <EventTitle>{event.title || "Piknik Event"}</EventTitle>
                <p><strong>Park:</strong> {event.park || "Unknown Park"}</p>
                <p><strong>Date:</strong> {event.date || "TBD"}</p>
                <p><strong>Time:</strong> {event.time || "TBD"}</p>
                <p><strong>Forecast:</strong> {event.weatherForecast || "N/A"}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <Attendance>
                  <span>✅ {event.going || 0} Going</span>
                  <span>🤔 {event.maybeGoing || 0} Maybe</span>
                </Attendance>
              </EventCard>
            ))}
          </EventsSlider>
        </EventsSection>
      </Content>
    </Wrapper>
  );
};

export default HomePage;

// Styled components

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  color: #333;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none; 
`;

export const Content = styled.div`
  flex: 1;
  z-index: 10; 
  position: relative;
  padding: 1.5rem;
`;

export const SectionBox = styled.section`
  background: rgba(254, 248, 236, 0.85);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

export const Hero = styled(SectionBox)`
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.82);
`;

export const CalendarSection = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  label {
    font-weight: bold;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  text-align: center;
  width: 200px;
  font-size: 1rem;

  &::placeholder {
    text-align: center;
  }
`;

export const ForecastSection = styled(SectionBox)`
  text-align: center;
  background-color: rgba(255, 255, 255, 0.82);

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
`;

export const ForecastGridWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  max-width: 1000px;
  width: 100%;

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
`;

const ForecastCard = styled.div`
  background: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: ${fadeIn} 0.6s ease-in-out;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

export const IconWrapper = styled.div`
  margin: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 60px;
    height: 60px;

    @media (max-width: 480px) {
      width: 45px;
      height: 45px;
    }
  }
`;

export const ForecastNote = styled.h3`
  margin-top: 1.5rem;
  font-weight: 800;
  font-size: 1.1rem;
  line-height: 1.5;
`;

export const EventsSection = styled(SectionBox)`
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.82);
`;

export const EventsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  h2 {
    flex: 1;
    text-align: center;
    font-size: 1.6rem;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.2s;

    &:hover {
      color: #f3c530;
    }

    @media (max-width: 600px) {
      font-size: 1.3rem;
    }
  }
`;

export const ArrowButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const EventsSlider = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #f3c530;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #fefbe9;
  }
`;

export const EventCard = styled.div`
  flex: 0 0 auto;
  width: 220px;
  background: #fff9d6;
  border: 2px solid #f3c530;
  border-radius: 12px;
  padding: 1rem;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 400px) {
    width: 180px;
    font-size: 0.85rem;
  }
`;

export const EventTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

export const Attendance = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.9rem;
`;
