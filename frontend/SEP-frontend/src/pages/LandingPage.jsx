import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import { motion } from "framer-motion";
import { Brain, Rocket, Database, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white relative overflow-x-hidden">
      {/* background glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/20 blur-3xl rounded-full" />

      <Navbar />

      {/* HERO */}
      <section className="pt-40 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-cyan-400 font-medium mb-4">Your AI Co-Founder</p>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Launch your next
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                {" "}
                startup
              </span>{" "}
              with AI
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-xl">
              Generate startup ideas, business plans, and growth strategies
              instantly with your premium AI startup ecosystem.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/register"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:scale-105 transition"
              >
                Start Building
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                Login
              </Link>
            </div>
          </motion.div>

          {/* dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
          >
            <div className="space-y-5">
              <div className="bg-white/10 rounded-2xl p-5">
                🧠 AI Startup Idea Generated
              </div>

              <div className="bg-white/10 rounded-2xl p-5">
                📈 Business Plan Created
              </div>

              <div className="bg-white/10 rounded-2xl p-5">
                🚀 Growth Strategy Ready
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">
            Everything founders need
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Brain className="text-cyan-400" size={32} />}
              title="AI Idea Generator"
              description="Generate startup concepts in seconds."
            />

            <FeatureCard
              icon={<Rocket className="text-violet-400" size={32} />}
              title="Business Plans"
              description="Investor-ready startup plans instantly."
            />

            <FeatureCard
              icon={<Database className="text-green-400" size={32} />}
              title="Founder Workspace"
              description="Save and manage startup ideas beautifully."
            />

            <FeatureCard
              icon={<BarChart3 className="text-pink-400" size={32} />}
              title="Growth Strategy"
              description="AI-powered expansion insights."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28 px-6">
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-16 text-center">
          <h2 className="text-5xl font-bold mb-6">Build your unicorn faster</h2>

          <p className="text-gray-400 text-lg mb-8">
            Turn startup ideas into launch-ready businesses using AI.
          </p>

          <Link
            to="/register"
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
