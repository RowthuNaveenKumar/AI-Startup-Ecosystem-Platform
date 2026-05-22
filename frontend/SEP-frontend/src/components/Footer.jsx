import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/5 backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-cyan-400" size={28} />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                AI Startup
              </h3>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Your AI-powered startup ecosystem to generate startup ideas,
              business plans, and growth strategies faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Product</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-gray-400 hover:text-cyan-400 transition">
                Home
              </Link>
              <Link to="/register" className="text-gray-400 hover:text-cyan-400 transition">
                Get Started
              </Link>
              <Link to="/login" className="text-gray-400 hover:text-cyan-400 transition">
                Login
              </Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Features</h4>
            <div className="flex flex-col gap-3 text-gray-400">
              <p className="hover:text-cyan-400 transition cursor-pointer">
                AI Idea Generator
              </p>
              <p className="hover:text-cyan-400 transition cursor-pointer">
                Business Plans
              </p>
              <p className="hover:text-cyan-400 transition cursor-pointer">
                Founder Workspace
              </p>
              <p className="hover:text-cyan-400 transition cursor-pointer">
                Growth Strategy
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Connect</h4>
            <div className="flex flex-col gap-3 text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition">
                GitHub
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} AI Startup Platform. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/" className="hover:text-cyan-400 transition">
              Privacy
            </Link>
            <Link to="/" className="hover:text-cyan-400 transition">
              Terms
            </Link>
            <Link to="/" className="hover:text-cyan-400 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;