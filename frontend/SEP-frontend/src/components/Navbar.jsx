import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-6 pt-5">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center shadow-2xl">

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600">
              <Sparkles size={18} />
            </div>

            <h1 className="text-lg font-bold tracking-wide">
              AI Startup Platform
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button className="bg-gradient-to-r from-cyan-500 to-violet-600 hover:scale-105 transition border-0">
                Get Started
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;