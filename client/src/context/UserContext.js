import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserContext = createContext();
const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const logoutTimerRef = useRef(null);
  const expiryIntervalRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const hasLoggedOutRef = useRef(false);
  const logoutUserRef = useRef(() => {}); // Placeholder

  // 🧹 Clear localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("tokenExpiry");
  };

  // 🕵️ Inactivity detection
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      logoutUserRef.current("Logged out due to inactivity.");
    }, INACTIVITY_LIMIT);
  }, []);

  const removeActivityListeners = useCallback(() => {
    window.removeEventListener("mousemove", resetInactivityTimer);
    window.removeEventListener("keydown", resetInactivityTimer);
    window.removeEventListener("scroll", resetInactivityTimer);
    window.removeEventListener("click", resetInactivityTimer);
  }, [resetInactivityTimer]);

  const addActivityListeners = useCallback(() => {
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);
    window.addEventListener("scroll", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);
  }, [resetInactivityTimer]);

  const startExpiryCheck = useCallback(() => {
    if (expiryIntervalRef.current) return;

    expiryIntervalRef.current = setInterval(() => {
      const expiry = localStorage.getItem("tokenExpiry");
      if (expiry && Date.now() > Number(expiry)) {
        logoutUserRef.current("Session expired. Please log in again.");
      }
    }, 300000); // every 5 minutes
  }, []);

  // ✅ LOGOUT FUNCTION (defined before context)
  logoutUserRef.current = (message) => {
    if (hasLoggedOutRef.current) return;
    hasLoggedOutRef.current = true;

    clearLocalStorage();
    setUser(null);

    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (expiryIntervalRef.current) clearInterval(expiryIntervalRef.current);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

    removeActivityListeners();

    if (message) toast.info(message);
  };

  // ✅ Login and initialize timers
  const loginUser = ({ token, email, name }) => {
    if (!token || !email || !name) {
      console.error("Missing login data.");
      return;
    }

    const expiry = Date.now() + 3600000;
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    localStorage.setItem("tokenExpiry", expiry.toString());

    setUser({ token, email, name });
    hasLoggedOutRef.current = false;

    logoutTimerRef.current = setTimeout(() => {
      logoutUserRef.current("Session expired. Please log in again.");
    }, 3600000);

    startExpiryCheck();
    addActivityListeners();
    resetInactivityTimer();
  };

  // ✅ Update name/email locally (after successful backend update)
  const updateUser = ({ email, name }) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      email: email || user.email,
      name: name || user.name,
    };

    localStorage.setItem("email", updatedUser.email);
    localStorage.setItem("name", updatedUser.name);
    setUser(updatedUser);
  };

  // ✅ Auto-login from localStorage (if token valid)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const expiry = localStorage.getItem("tokenExpiry");

    if (token && email && name && expiry) {
      const expiryTime = Number(expiry);

      if (isNaN(expiryTime) || Date.now() > expiryTime) {
        logoutUserRef.current("Session expired. Please log in again.");
      } else {
        setUser({ token, email, name });
        hasLoggedOutRef.current = false;

        const remainingTime = expiryTime - Date.now();
        logoutTimerRef.current = setTimeout(() => {
          logoutUserRef.current("Session expired. Please log in again.");
        }, remainingTime);

        startExpiryCheck();
        addActivityListeners();
        resetInactivityTimer();
      }
    } else {
      clearLocalStorage();
    }

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      if (expiryIntervalRef.current) clearInterval(expiryIntervalRef.current);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      removeActivityListeners();
    };
  }, [
    startExpiryCheck,
    addActivityListeners,
    resetInactivityTimer,
    removeActivityListeners,
  ]);

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        loginUser,
        logoutUser: (...args) => logoutUserRef.current(...args),
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
