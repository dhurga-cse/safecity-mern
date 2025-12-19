import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Auth() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegister
      ? "http://localhost:8000/api/auth/register"
      : "http://localhost:8000/api/auth/login";

    const body = isRegister
      ? { name, email, password, role }
      : { email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Auth failed");
        return;
      }

      // SAVE TOKEN & ROLE
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      // REDIRECT BY ROLE
      if (data.user.role === "admin") navigate("/admin");
      else if (data.user.role === "police") navigate("/police");
      else navigate("/myreports");

    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="login-page">
      <h2>{isRegister ? "Register" : "Login"}</h2>

      <form onSubmit={handleSubmit}>

        {isRegister && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

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

        {isRegister && (
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="citizen">Citizen</option>
            <option value="police">Police</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        {isRegister ? "Already have an account?" : "New user?"}
        <span
          style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login" : "Register"}
        </span>
      </p>
    </div>
  );
}

export default Auth;
