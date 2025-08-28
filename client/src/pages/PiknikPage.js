import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImg from "../assets/piknik-view.jpg";
import { useUser } from "../context/UserContext";

const PiknikPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [piknik, setPiknik] = useState(null);

  useEffect(() => {
    const fetchPiknik = async () => {
      try {
        const res = await fetch(`http://localhost:9000/api/pikniks/${id}`);
        const data = await res.json();
        setPiknik(data);
      } catch (err) {
        console.error("Error fetching piknik:", err);
      }
    };

    fetchPiknik();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Piknik?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:9000/api/pikniks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        localStorage.setItem("piknikMessage", "You are not joined in any event right now.");
        navigate("/my-pikniks", { replace: true });
        setTimeout(() => {
          if (window.location.pathname !== "/my-pikniks") {
            window.location.href = "/my-pikniks";
          }
        }, 250);
      } else {
        const error = await res.json();
        alert("Failed to delete: " + error.message);
      }
    } catch (err) {
      console.error("Error deleting piknik:", err);
      alert("An error occurred while deleting the Piknik.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-piknik/${id}`);
  };

  if (!piknik) return <div>Loading picnic details...</div>;

  // Determine RSVP status (example only)
  const rsvpStatus = piknik?.rsvps?.find((r) => r.email === user?.email)?.status || "Not responded";

  return (
    <Wrapper>
      <Content>
        <Title>{piknik.emoji} {piknik.title}</Title>
        <Info><strong>Date:</strong> {piknik.date?.split("T")[0]}</Info>
        <Info><strong>Category:</strong> {piknik.category}</Info>
        <Info><strong>Description:</strong> {piknik.description}</Info>
        <Info><strong>Notes:</strong> {piknik.notes}</Info>

        {piknik.park && (
          <ParkCard>
            <h3>{piknik.park.name}</h3>
            <p><strong>Rating:</strong> {piknik.park.rating} ⭐</p>
            <p><strong>BBQ Type:</strong> {piknik.park.bbqType || "None"}</p>
            <p><strong>Amenities:</strong> {piknik.park.amenities?.join(", ")}</p>
          </ParkCard>
        )}

        <Info><strong>Event Created By:</strong> {piknik.creatorEmail || "Unknown"}</Info>
        <Info><strong>Your RSVP:</strong> {rsvpStatus}</Info>
        <Info><strong>Invited:</strong> {piknik.invitedEmails?.length ? piknik.invitedEmails.join(", ") : "No invites"}</Info>

        <ButtonRow>
          <DeleteButton onClick={handleDelete}>🗑️ Delete Piknik</DeleteButton>
          <EditButton onClick={handleEdit}>✏️ Edit Piknik</EditButton>
        </ButtonRow>
      </Content>
    </Wrapper>
  );
};

export default PiknikPage;

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
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const ParkCard = styled.div`
  background-color: #fffef0;
  border: 1px solid #f0d460;
  padding: 16px;
  border-radius: 12px;
  margin: 20px 0;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.2s;
  &:hover {
    background-color: #e60000;
  }
`;

const EditButton = styled.button`
  background-color: #f3c530;
  color: #000;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.2s;
  &:hover {
    background-color: #ddb020;
  }
`;
