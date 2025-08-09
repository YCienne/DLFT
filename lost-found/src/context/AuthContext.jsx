import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds logged-in user
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
