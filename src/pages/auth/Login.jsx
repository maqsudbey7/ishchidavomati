import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { users } from "../../data/fakeData";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];

    const allUsers = [...users, ...storedEmployees];

    const user = allUsers.find(
      (item) =>
        (item.username === username || item.name === username) &&
        item.password === password
    );

    if (!user) {
      return alert("Login yoki parol xato");
    }

    const cleanUser = {
      id: user.id,
      username: user.username || user.name,
      name: user.name,
      role: user.role,
      company: user.company,
    };

    localStorage.setItem("user", JSON.stringify(cleanUser));

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-2xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Employee System
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-700 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-700 mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 p-3 rounded-lg"
        >
          Kirish
        </button>

      </div>
    </div>
  );
}