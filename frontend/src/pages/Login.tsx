import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/tenant");
      }
    } catch (err: any) {
      console.log(err);
  console.log(err.response);

  alert(
    JSON.stringify(err.response?.data || err.message)
  );
}
  };
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "20px",
      }}
    >
      <h2>Login</h2>

      <form onSubmit={login}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          Login
        </button>
      </form>

      <br />

      <Link to="/register">Create Account</Link>
    </div>
  );
}