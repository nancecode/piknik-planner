import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";
import signupBg from "../assets/signupbackground.jpg";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { loginUser } = useUser();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("JSON parse error:", err.message);
        setMessage("Invalid response from server.");
        return;
      }

      if (!res.ok) {
        setMessage(data.error || "Signup failed.");
        return;
      }

      // ✅ Use context to set user
      loginUser({
        token: data.token,
        email,
        username,
      });

      setMessage("Signup successful!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.error("Network or server error:", err.message);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <BackgroundWrapper>
      <Container>
        <Title>Create Account</Title>
        <Form onSubmit={handleSignup}>
          <Input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit">Sign Up</Button>

          <FooterText>
            Already have an account?{" "}
            <LoginLink to="/login">Log In</LoginLink>
          </FooterText>

          {message && <Message>{message}</Message>}
        </Form>
      </Container>
    </BackgroundWrapper>
  );
};

export default SignupForm;

const BackgroundWrapper = styled.div`
  min-height: 100vh;
  background-image: url(${signupBg});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  border: 1px solid #e2e2e2;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  background-color: rgba(255, 255, 255, 0.95);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
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

const FooterText = styled.p`
  font-size: 14px;
  text-align: center;
  color: #555;
`;

const LoginLink = styled(Link)`
  color: rgb(255, 0, 0);
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  color: green;
`;
