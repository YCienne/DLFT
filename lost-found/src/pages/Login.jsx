import { useState } from "react";
import { signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unverifiedUser, setUnverifiedUser] = useState(null); // store unverified user
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setUnverifiedUser(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        setUnverifiedUser(userCredential.user); // store for resend
        alert("Your email is not verified. Please verify before logging in.");
        await signOut(auth); // sign out unverified user
        return;
      }
      alert("Login successful!");
      navigate("/"); // redirect to home
    } catch (err) {
      alert(err.message);
    }
  };

  const handleResendVerification = async () => {
    if (unverifiedUser) {
      await sendEmailVerification(unverifiedUser);
      alert("Verification email resent! Please check your inbox.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {unverifiedUser && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleResendVerification}>
            Resend Verification Email
          </button>
        </div>
      )}

      <button onClick={handleLogout} style={{ marginTop: "10px" }}>
        Logout
      </button>
    </div>
  );
}
