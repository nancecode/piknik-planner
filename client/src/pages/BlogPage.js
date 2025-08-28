import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import blogs from "../data/communityBlogs";
import backgroundImg from "../assets/communitybackground.jpg";

const BlogPage = () => {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <NotFound>
        <h2>Blog not found 🫤</h2>
        <p>
          Check the URL or go back to the <a href="/community">Community page</a>.
        </p>
      </NotFound>
    );
  }

  return (
    <Wrapper>
      <Content>
        <Title>{blog.title}</Title>
        <Author>✍️ By {blog.author}</Author>
        <ContentBody>
          {typeof blog.content === "string"
            ? blog.content
                .split("\n")
                .filter((para) => para.trim() !== "")
                .map((para, idx) => <p key={idx}>{para.trim()}</p>)
            : <p>Blog content is unavailable.</p>}
        </ContentBody>
      </Content>
    </Wrapper>
  );
};

export default BlogPage;

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

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-style: italic;
  color: #666;
  margin-bottom: 30px;
`;

const ContentBody = styled.div`
  line-height: 1.7;
  font-size: 1.1rem;
`;

const NotFound = styled.div`
  padding: 60px;
  text-align: center;
  font-size: 1.2rem;

  a {
    color: #0077cc;
    text-decoration: underline;
  }
`;
