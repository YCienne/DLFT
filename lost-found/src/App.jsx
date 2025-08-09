import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import PostItem from "./pages/PostItem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/lost">Lost Items</Link>
      <Link to="/found">Found Items</Link>
      {user && <Link to="/post">Post Item</Link>}
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>} 
      {user && (
        <>
          <span>Welcome, {user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lost" element={<LostItems />} />
          <Route path="/found" element={<FoundItems />} />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <PostItem />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
