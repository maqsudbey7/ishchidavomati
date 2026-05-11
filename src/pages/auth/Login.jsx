import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { users, employees } from "../../data/fakeData";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const allUsers = [...users, ...employees];

    const user = allUsers.find(
      (item) =>
        item.username === username &&
        item.password === password
    );

    if (!user) {
      return alert("Login yoki parol xato");
    }

    // faqat kerakli ma’lumotlarni saqlaymiz
    const cleanUser = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    };

    localStorage.setItem("user", JSON.stringify(cleanUser));

    // redirect
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
          className="w-full p-3 rounded-lg bg-slate-700 mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-700 mb-4 outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-700"
        >
          Kirish
        </button>
      </div>
    </div>
  );
}