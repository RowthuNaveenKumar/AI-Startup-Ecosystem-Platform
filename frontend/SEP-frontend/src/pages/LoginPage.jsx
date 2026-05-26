import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
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

      const res = await api.post("/auth/login", form);

      login(res.data);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-6 relative overflow-hidden">
      {/* glow background */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-500/20 blur-3xl rounded-full" />
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition z-20"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>

        <p className="text-gray-400 mb-8">
          Sign in to your AI startup workspace
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 font-semibold hover:scale-105 transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:text-cyan-300">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;
