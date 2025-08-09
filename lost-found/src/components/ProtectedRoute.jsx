import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;

  // Check if email is verified
  if (!user.emailVerified) {
    return <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>Please verify your email before accessing this page.</h3>
    </div>;
  }

  return children;
}
