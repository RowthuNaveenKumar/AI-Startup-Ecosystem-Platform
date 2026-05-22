import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Lightbulb,
  FileText,
  Bookmark,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Generate Idea",
      path: "/generate-idea",
      icon: <Lightbulb size={20} />,
    },
    {
      name: "Business Plan",
      path: "/business-plan",
      icon: <FileText size={20} />,
    },
    {
      name: "Saved Ideas",
      path: "/saved-ideas",
      icon: <Bookmark size={20} />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-10 left-20 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-violet-500/10 blur-3xl rounded-full" />

      {/* Sidebar */}
      <aside className="w-80 border-r border-white/10 bg-white/5 backdrop-blur-2xl p-6 flex flex-col justify-between z-10">

        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 shadow-lg">
              <Sparkles size={20} />
            </div>

            <div>
              <h1 className="text-xl font-bold">AI Startup</h1>
              <p className="text-gray-400 text-sm">Founder Workspace</p>
            </div>
          </div>

          {/* User */}
          <div className="mb-10 bg-white/5 border border-white/10 rounded-3xl p-5">
            <p className="text-gray-400 text-sm mb-1">Welcome back</p>
            <h2 className="text-xl font-semibold">
              {user?.name || "Founder"}
            </h2>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-white/10"
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-500/20 hover:bg-red-500/30 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 z-10">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;