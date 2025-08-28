// src/pages/RSVPPage.js
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const RSVPPage = () => {
  const { piknikId } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const navigate = useNavigate();
  const [piknik, setPiknik] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPiknik = async () => {
      try {
        const res = await fetch(`http://localhost:9000/api/pikniks/${piknikId}`);
        const data = await res.json();
        setPiknik(data);
      } catch (err) {
        setMessage("Failed to load picnic info.");
        console.error(err);
      }
    };

    if (piknikId) fetchPiknik();
  }, [piknikId]);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ piknikId, email, status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("✅ Your RSVP has been recorded. Thanks!");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  if (!piknik) return <p>Loading picnic info...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>You're invited to: {piknik.title}</h2>
      <p>
        📍 {piknik.park?.name} — 📅 {piknik.date}
      </p>
      <p>How would you like to respond as <strong>{email}</strong>?</p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["Going", "Maybe", "Not Going"].map((option) => (
          <button
            key={option}
            onClick={() => setStatus(option)}
            style={{
              padding: "10px 20px",
              backgroundColor: status === option ? "#f3c530" : "#eee",
              border: "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <button onClick={handleSubmit} disabled={!status}>
        Submit RSVP
      </button>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
};

export default RSVPPage;
