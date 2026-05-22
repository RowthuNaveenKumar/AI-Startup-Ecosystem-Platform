import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", form);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-6 relative overflow-hidden">
      {/* glow background */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-violet-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 mb-8">
          Start building your AI startup journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-violet-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-violet-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-violet-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 font-semibold hover:scale-105 transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterPage;