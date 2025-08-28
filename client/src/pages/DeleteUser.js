import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // ✅ Use updated context

const DeleteUser = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { user, logoutUser } = useUser(); // ✅ Updated hook
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (inputEmail !== user?.email) {
      setMessage("Entered email does not match your account.");
      return;
    }

    setIsDeleting(true);
    setMessage("");

    try {
      const res = await fetch("/delete-user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inputEmail }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Unexpected response:", text);
        setMessage("Unexpected server response.");
        return;
      }

      const data = await res.json();

      if (res.ok) {
        logoutUser(); // ✅ Clear context and localStorage
        setMessage("✅ Account deleted.");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(data.message || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <h2>Delete Your Account</h2>
        <p>To confirm, enter your email address:</p>

        <div style={inputGroupStyle}>
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="Email"
            style={inputStyle}
          />
        </div>

        <button
          style={buttonStyle}
          onClick={handleDelete}
          disabled={isDeleting || inputEmail !== user?.email}
        >
          {isDeleting ? "Deleting..." : "Delete My Account"}
        </button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default DeleteUser;

const wrapperStyle = {
  display: "flex",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "#f8f8f8",
  minHeight: "100vh",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  width: "90%",
  maxWidth: "800px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  textAlign: "center",
};

const inputGroupStyle = {
  marginBottom: "1.5rem",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  transition: "border-color 0.3s ease",
};

const buttonStyle = {
  backgroundColor: "white",
  color: "black",
  border: "2px solid black",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "bold",
  transition: "background 0.3s ease",
};

