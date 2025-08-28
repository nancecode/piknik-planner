import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { FaEnvelope, FaUser } from "react-icons/fa";
import logoWhite from "../assets/piknik logo-white.png";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logoutUser } = useUser();

  const firstName = useMemo(() => {
    if (!user?.name) return "";
    return user.name.split(" ")[0];
  }, [user?.name]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      <Nav>
        <LeftLinks>
          <NavLink onClick={() => handleNavigate("/community")}>Community</NavLink>
          <NavLink onClick={() => handleNavigate("/parks")}>Parks</NavLink>
          <NavLink onClick={() => handleNavigate("/events")}>Events</NavLink>
        </LeftLinks>

        <CenterLogo onClick={() => handleNavigate("/home")}>
          <Logo src={logoWhite} alt="Piknik Logo white" />
        </CenterLogo>

        <DesktopRight>
          {firstName && <Greeting>Hi, {firstName}</Greeting>}
          <NavLink onClick={() => handleNavigate("/my-pikniks")}>My Pikniks</NavLink>
          <Icon onClick={() => handleNavigate("/my-inbox")}>
            <FaEnvelope />
            <Badge>{user?.notifications?.length || 0}</Badge>
          </Icon>
          <Icon onClick={() => handleNavigate("/update-user")}>
            <FaUser />
          </Icon>
        </DesktopRight>

        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} />
        </Hamburger>
      </Nav>

      {isOpen && (
        <Dropdown>
          {firstName && <Greeting>Hi, {firstName}</Greeting>}
          <DropdownLink onClick={() => handleNavigate("/my-inbox")}>Inbox</DropdownLink>
          <DropdownLink onClick={() => handleNavigate("/my-pikniks")}>My Pikniks</DropdownLink>
          <DropdownLink onClick={() => handleNavigate("/events")}>Events</DropdownLink>
          <DropdownLink onClick={() => handleNavigate("/community")}>Community</DropdownLink>
          <DropdownLink onClick={() => handleNavigate("/parks")}>Parks</DropdownLink>
          <DropdownLink onClick={handleLogout}>Logout</DropdownLink>
        </Dropdown>
      )}
    </>
  );
};

export default Navbar;

// =====================
// Styled Components
// =====================

const Nav = styled.nav`
  background: #111;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: relative;
`;

const Logo = styled.img`
  height: 50px;
`;

const NavLink = styled.span`
  color: white;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #f3c530;
    text-decoration: none;
  }
`;

const DropdownLink = styled.span`
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #f3c530;
  }
`;

const LeftLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CenterLogo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const DesktopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

const Icon = styled.div`
  position: relative;
  cursor: pointer;
  color: white;

  svg {
    font-size: 1.2rem;
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: #f3c530;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
`;

const Dropdown = styled.div`
  background: #111;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Greeting = styled.span`
  font-size: 0.95rem;
  color: #f3c530;
`;
