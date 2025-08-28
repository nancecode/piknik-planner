import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import Button from "../components/Button";
import loginBg from "../assets/loginbackground.jpg"; // ✅ Import background image

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { loginUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    setError(null);
    setMessage("");

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        loginUser({
          token: data.token,
          email: data.email || email,
          name: data.name || "",
        });
        setMessage("Login successful!");
        navigate("/home");
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error during login. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Background>
      <Container>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isFetching}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isFetching}
            />
          </FormGroup>

          <Button type="submit" disabled={isFetching}>
            {isFetching ? "Logging in…" : "Login"}
          </Button>
        </Form>

        {message && <Message color="green">{message}</Message>}
        {error && <Message color="red">{error}</Message>}

        <SignupPrompt>
          Don’t have an account? <Link to="/signup">Create one!</Link>
        </SignupPrompt>
      </Container>
    </Background>
  );
};

export default LoginPage;

// Styled Components

const Background = styled.div`
  height: 90vh;
  width: 100%;
  background-image: url(${loginBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.95);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  &:focus {
    border-color: rgb(0, 0, 0);
    outline: none;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: ${(props) => props.color || "#000"};
`;

const SignupPrompt = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #555;

  a {
    color: rgb(255, 0, 0);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;
