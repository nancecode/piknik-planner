import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import blogs from "../data/communityBlogs";
import backgroundImg from "../assets/blogsbackground.jpg"; // ✅ Updated background image

const CommunityPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Title>🧺 Picnic Tips, Games & BBQ Ideas for Summer 2025</Title>
      <BlogGrid>
        {blogs.map((blog) => (
          <Card key={blog.id} onClick={() => navigate(blog.path)}>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <Author>✍️ By {blog.author}</Author>
          </Card>
        ))}
      </BlogGrid>
    </PageWrapper>
  );
};

export default CommunityPage;

// Styled Components

const PageWrapper = styled.div`
  padding: 60px 30px;
  min-height: 100vh;
  background: url(${backgroundImg}) no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  backdrop-filter: blur(2px);
`;

const Title = styled.h1`
  text-align: center;
  margin: 0 auto 40px auto;
  font-size: 2rem;
  background-color: rgba(255, 255, 255, 0.75);
  display: block;
  padding: 10px 20px;
  border-radius: 12px;
  max-width: fit-content;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #f3c530;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;

  &:hover {
    background: #fff3b0;
    transform: translateY(-4px);
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #444;
  }
`;

const Author = styled.p`
  margin-top: 15px;
  font-size: 0.9rem;
  font-style: italic;
  color: #555;
`;
