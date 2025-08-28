import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "./style/GlobalStyle";
import UserProvider, { useUser } from "./context/UserContext";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ParksPage from "./pages/ParksPage";
import HowItWorks from "./pages/HowItWorks";
import CreatePiknikPage from "./pages/CreatePiknikPage";
import MyPikniksPage from "./pages/MyPikniksPage";
import InboxPage from "./pages/InboxPage";
import EventsPage from "./pages/EventsPage";
import FAQ from "./pages/FAQ";
import CommunityPage from "./pages/CommunityPage";
import PiknikPage from "./pages/PiknikPage";
import UpdateUser from "./pages/UpdateUser";
import BlogPage from "./pages/BlogPage";
import EventDetailsPage from "./pages/EventDetailPage";
import RSVPPage from "./pages/RSVPPage";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditPiknikPage from "./pages/EditPiknikPage";

// 🔒 Protect routes if not logged in
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (user === undefined) return <LoadingSpinner />;
  return user ? children : <Navigate to="/login" replace />;
};

// 🚫 Redirect logged-in users away from /login or /signup
const RedirectIfAuthenticated = ({ children }) => {
  const { user } = useUser();
  if (user === undefined) return <LoadingSpinner />;
  return user ? <Navigate to="/home" replace /> : children;
};

// ⏳ Simple spinner
const LoadingSpinner = () => (
  <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>
);

function App() {
  return (
    <Router>
      <UserProvider>
        <GlobalStyle />
        <ToastContainer position="top-center" autoClose={3000} />
        <AppContent />
      </UserProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <LayoutWrapper>
      {!isLandingPage && <Navbar />}

      <MainContent>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <LoginPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfAuthenticated>
                <SignUpPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/:slug" element={<BlogPage />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parks"
            element={
              <ProtectedRoute>
                <ParksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-piknik"
            element={
              <ProtectedRoute>
                <CreatePiknikPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-pikniks"
            element={
              <ProtectedRoute>
                <MyPikniksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-inbox"
            element={
              <ProtectedRoute>
                <InboxPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-piknik/:id"
            element={
              <ProtectedRoute>
                <EditPiknikPage />
              </ProtectedRoute>
            }
            />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <EventDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/piknik/:id"
            element={
              <ProtectedRoute>
                <PiknikPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-user"
            element={
              <ProtectedRoute>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rsvp/:id"
            element={
              <ProtectedRoute>
                <RSVPPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainContent>

      {!isLandingPage && <Footer />}
    </LayoutWrapper>
  );
}

// Styled Components
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
`;

export default App;
