import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, form);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-semibold text-green-700 text-center">Register</h2>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <select
          className="w-full p-2 border border-gray-300 rounded"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="farmer">Farmer</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-green-600 w-full text-white py-2 rounded hover:bg-green-700">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
