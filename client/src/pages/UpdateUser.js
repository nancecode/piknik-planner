import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";
import updateUserBg from "../assets/updateuserbackground.jpg";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

const UpdateUser = () => {
  const { user, updateUser, logoutUser } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setMessage("");

    if (!user?.email) {
      setMessage("Current email is missing.");
      return;
    }

    setIsUpdating(true);

    try {
      const res = await fetch(`${API_URL}/api/update-user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: user.email, // current email
          newEmail,          // new email if any
        }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response from server.");
      }

      const data = await res.json();

      if (res.ok) {
        // ✅ Update user context and localStorage
        updateUser({
          name,
          email: newEmail || user.email,
        });

        setMessage("✅ User info updated successfully.");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        setMessage(data.message || data.error || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("❌ An error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Update Account</Title>
        <Form>
          <Input
            type="text"
            value={name}
            placeholder="New Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            value={newEmail}
            placeholder="New Email"
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />

          <ButtonWrapper>
            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
              bg="#e0e0e0"
              color="#000"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </ButtonWrapper>

          <ButtonWrapper>
            <Button onClick={handleLogout}>Logout</Button>
          </ButtonWrapper>

          {message && <Message>{message}</Message>}
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default UpdateUser;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${updateUserBg}) no-repeat center center;
  background-size: cover;
`;

const FormWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.85);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: rgb(0, 0, 0);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  > button {
    width: 100%;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  color: green;
`;
