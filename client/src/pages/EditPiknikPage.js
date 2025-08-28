import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../context/UserContext";

const EditPiknikPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [piknik, setPiknik] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPiknik = async () => {
      try {
        const res = await fetch(`http://localhost:9000/api/pikniks/${id}`);
        const data = await res.json();
        setPiknik(data);
        setIsAuthorized(user?.email === data.createdBy);
      } catch (err) {
        console.error("Error fetching piknik:", err);
      }
    };

    fetchPiknik();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPiknik((prev) => ({ ...prev, [name]: value }));
  };

 const handleSave = async () => {
  try {
    const res = await fetch(`http://localhost:9000/api/pikniks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...piknik, createdBy: user.email }),
    });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Piknik updated successfully!");
        navigate(`/mypikniks`);
      } else {
        setMessage(data.message || "❌ Failed to update.");
      }
    } catch (err) {
      console.error("Error updating piknik:", err);
    }
  };

  if (!piknik) return <p>Loading...</p>;
  if (!isAuthorized) return <p>⛔ You are not allowed to edit this Piknik.</p>;

  return (
    <Wrapper>
      <h2>Edit Piknik</h2>
      <label>
        Title:
        <input name="title" value={piknik.title} onChange={handleChange} />
      </label>
      <label>
        Date:
        <input name="date" value={piknik.date} onChange={handleChange} />
      </label>
      <label>
        Time:
        <input name="time" value={piknik.time} onChange={handleChange} />
      </label>
      <label>
        Park:
        <input name="park" value={piknik.park} onChange={handleChange} />
      </label>
      <label>
        Notes:
        <textarea name="notes" value={piknik.notes} onChange={handleChange} />
      </label>
      <button onClick={handleSave}>Save</button>
      {message && <p>{message}</p>}
    </Wrapper>
  );
};

export default EditPiknikPage;

const Wrapper = styled.div`
  padding: 30px;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;

  input,
  textarea {
    width: 100%;
    padding: 8px;
    font-size: 16px;
  }

  button {
    background: #f3c530;
    color: black;
    font-weight: bold;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
`;
