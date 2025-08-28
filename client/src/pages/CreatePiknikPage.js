import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import backgroundImg from '../assets/piknik-view.jpg';
import Button from '../components/Button';
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const emojiOptions = ['🧺', '🌞', '🍉', '🎉', '🍔', '🎈', '🐾', '🎶', '🍷', '🌹', '🍺'];

const CreatePiknikPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPark, setSelectedPark] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [emoji, setEmoji] = useState('🧺');
  const [notes, setNotes] = useState('');
  const [invitedEmails, setInvitedEmails] = useState('');
  const [availableParks, setAvailableParks] = useState([]);

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    const storedPark = localStorage.getItem("selectedPark");

    if (storedDate) setSelectedDate(storedDate);
    if (storedPark) setSelectedPark(JSON.parse(storedPark));

    const fetchParks = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/parks");
        const data = await res.json();
        setAvailableParks(data);
      } catch (err) {
        console.error("Error fetching parks:", err);
      }
    };

    fetchParks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPark) {
      alert("Please select a park.");
      return;
    }

    const picnicData = {
      createdBy: user?.email || null,
      date: selectedDate,
      title,
      description,
      category,
      emoji,
      park: selectedPark,
      notes,
      invitedEmails: invitedEmails
        .split(',')
        .map(email => email.trim())
        .filter(email => email),
    };

    try {
      const response = await fetch('http://localhost:9000/api/pikniks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(picnicData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Request failed');

      localStorage.setItem("piknikMessage", "Your picnic has been created successfully! 🧺");
      localStorage.removeItem("selectedDate");
      localStorage.removeItem("selectedPark");

      navigate("/my-pikniks");
    } catch (err) {
      console.error('Error creating picnic:', err);
      alert(`Failed to create picnic 😢 ${err.message}`);
    }
  };

  return (
    <Wrapper>
      <Content>
        <Title>Create Your Picnic</Title>

        {title && (
          <DateInfo>
            <span style={{ fontSize: '1.5rem' }}>{emoji}</span> <strong>{title}</strong>
            {selectedDate && <> on <strong>{selectedDate}</strong></>}
          </DateInfo>
        )}

        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Picnic Title (e.g., Summer Chillout)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Select category</option>
            <option value="Friends">Friends</option>
            <option value="Family">Family</option>
            <option value="Birthday">Birthday</option>
            <option value="Romantic">Romantic</option>
            <option value="Team Event">Team Event</option>
            <option value="Other">Other</option>
          </select>

          <label>Pick an Emoji 🎨</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {emojiOptions.map((icon) => (
              <span
                key={icon}
                style={{
                  fontSize: '24px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: emoji === icon ? '2px solid #f3c530' : '1px solid #ccc',
                  backgroundColor: emoji === icon ? '#fffbe6' : 'white'
                }}
                onClick={() => setEmoji(icon)}
              >
                {icon}
              </span>
            ))}
          </div>

          <label>Select a park</label>
          <select
            value={selectedPark?.name || ""}
            onChange={(e) => {
              const selected = availableParks.find(park => park.name === e.target.value);
              setSelectedPark(selected || null);
            }}
            required
          >
            <option value="" disabled>Choose a park</option>
            {availableParks.map((park) => (
              <option key={park.name} value={park.name}>
                {park.name}
              </option>
            ))}
          </select>

          {selectedPark && (
            <ParkCard>
              <h3>{selectedPark.name}</h3>
              <p><strong>Rating:</strong> {selectedPark.rating} ⭐</p>
              <p><strong>BBQ Type:</strong> {selectedPark.bbqType || 'None'}</p>
              <p><strong>Amenities:</strong> {selectedPark.amenities.join(', ')}</p>
            </ParkCard>
          )}

          <textarea
            placeholder="Notes (e.g., bring frisbee, potluck theme)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <input
            type="text"
            placeholder="Invite emails (comma separated)"
            value={invitedEmails}
            onChange={(e) => setInvitedEmails(e.target.value)}
          />

          <Button type="submit" disabled={!selectedDate || !selectedPark || !title}>
            Save Picnic
          </Button>
        </Form>
      </Content>
    </Wrapper>
  );
};

export default CreatePiknikPage;

// Styled Components
const Wrapper = styled.div`
  background: url(${backgroundImg}) no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const DateInfo = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  select,
  textarea,
  input {
    font-size: 1rem;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }

  button {
    margin-bottom: 0;
  }
`;

const ParkCard = styled.div`
  background-color: #fff9d6;
  border: 1px solid #f0d460;
  padding: 16px;
  border-radius: 12px;

  h3 {
    margin-top: 0;
  }
`;
