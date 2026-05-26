import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Trash2,
  Sparkles,
  Briefcase,
  Pencil,
  Eye,
  X,
  Lightbulb,
  Users,
  Code2,
  Target,
  TrendingUp,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SavedIdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { user } = useAuth();
  const navigate = useNavigate();

  const industries = ["all", ...new Set(ideas.map((idea) => idea.industry))];

  const fetchIdeas = async () => {
    try {
      if (!user?.userId) {
        toast.error("User not found");
        setLoading(false);
        return;
      }

      const res = await api.get(`/ideas?userId=${user.userId}`);
      setIdeas(res.data);
    } catch (err) {
      toast.error("Failed to load saved ideas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this startup idea?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/ideas/${id}`);

      setIdeas((prev) => prev.filter((idea) => idea.id !== id));

      toast.success("Idea deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  const parseSections = (text) => {
    if (!text) return [];

    const lines = text.split("\n");
    const sections = [];
    let current = null;

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("#")) {
        if (current) sections.push(current);

        current = {
          title: trimmed.replace(/^#+\s*/, ""),
          content: [],
        };
      } else if (/^\d+\./.test(trimmed)) {
        if (current) sections.push(current);

        current = {
          title: trimmed.replace(/^\d+\.\s*/, "").replace(/\*\*/g, ""),
          content: [],
        };
      } else if (current && trimmed) {
        current.content.push(trimmed.replace(/^- /, ""));
      }
    });

    if (current) sections.push(current);

    return sections;
  };

  const getIcon = (title) => {
    const lower = title.toLowerCase();

    if (lower.includes("startup name")) return <Lightbulb size={20} />;
    if (lower.includes("audience")) return <Users size={20} />;
    if (lower.includes("tech")) return <Code2 size={20} />;
    if (lower.includes("market")) return <TrendingUp size={20} />;

    return <Target size={20} />;
  };

  const filteredIdeas = ideas
    .filter((idea) => {
      const matchesSearch =
        idea.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.generatedIdea.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesIndustry =
        industryFilter === "all" || idea.industry === industryFilter;

      return matchesSearch && matchesIndustry;
    })
    .sort((a, b) => {
      if (sortBy === "az") {
        return a.industry.localeCompare(b.industry);
      }

      if (sortBy === "za") {
        return b.industry.localeCompare(a.industry);
      }

      if (sortBy === "oldest") {
        return a.id - b.id;
      }

      return b.id - a.id;
    });

  useEffect(() => {
    fetchIdeas();
  }, [user]);

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedIdea(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-cyan-400 font-medium mb-2">Founder Vault</p>

          <h1 className="text-5xl font-bold mb-3">Saved Startup Ideas</h1>

          <p className="text-gray-400 text-lg">
            Your private collection of AI-generated startup concepts.
          </p>
        </motion.div>

        {/* Filters */}
        {!loading && ideas.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
              />
            </div>

            <div className="relative">
              <Filter
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full pl-12 p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:border-cyan-400 appearance-none"
              >
                {industries.map((industry) => (
                  <option
                    key={industry}
                    value={industry}
                    className="bg-slate-900"
                  >
                    {industry === "all" ? "All Industries" : industry}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <ArrowUpDown
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:border-cyan-400 appearance-none"
              >
                <option value="newest" className="bg-slate-900">
                  Newest First
                </option>

                <option value="oldest" className="bg-slate-900">
                  Oldest First
                </option>

                <option value="az" className="bg-slate-900">
                  A-Z
                </option>

                <option value="za" className="bg-slate-900">
                  Z-A
                </option>
              </select>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">
            Loading saved ideas...
          </div>
        ) : ideas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-20 text-center backdrop-blur-2xl"
          >
            <Sparkles size={60} className="mx-auto mb-6 text-cyan-400" />

            <h2 className="text-3xl font-bold mb-4">No saved ideas yet</h2>

            <p className="text-gray-400">
              Generate startup ideas and save them here.
            </p>
          </motion.div>
        ) : filteredIdeas.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles size={50} className="mx-auto mb-4 text-cyan-400" />
            <h3 className="text-2xl font-bold mb-2">No matching ideas</h3>
            <p className="text-gray-400">
              Try changing search, filter, or sorting.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredIdeas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-xl flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-cyan-500/20">
                    <Bookmark className="text-cyan-400" />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedIdea(idea)}
                      className="p-3 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 transition"
                    >
                      <Eye size={18} className="text-cyan-300" />
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/business-plan/${idea.id}`, {
                          state: {
                            startupIdea: idea.generatedIdea,
                          },
                        })
                      }
                      className="p-3 rounded-2xl bg-violet-500/20 hover:bg-violet-500/30 transition"
                    >
                      <Briefcase size={18} className="text-violet-300" />
                    </button>

                    <button
                      onClick={() => navigate(`/edit-idea/${idea.id}`)}
                      className="p-3 rounded-2xl bg-blue-500/20 hover:bg-blue-500/30 transition"
                    >
                      <Pencil size={18} className="text-blue-300" />
                    </button>

                    <button
                      onClick={() => handleDelete(idea.id)}
                      className="p-3 rounded-2xl bg-red-500/20 hover:bg-red-500/30 transition"
                    >
                      <Trash2 size={18} className="text-red-300" />
                    </button>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-4">{idea.industry}</h2>

                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed flex-1">
                  {idea.generatedIdea?.length > 300
                    ? idea.generatedIdea.substring(0, 300) + "..."
                    : idea.generatedIdea}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedIdea && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIdea(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div>
                    <h2 className="text-3xl font-bold">Full Startup Idea</h2>
                    <p className="text-gray-400">{selectedIdea.industry}</p>
                  </div>

                  <button
                    onClick={() => setSelectedIdea(null)}
                    className="p-3 rounded-2xl bg-red-500/20 hover:bg-red-500/30"
                  >
                    <X size={20} className="text-red-300" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[75vh] space-y-5">
                  {parseSections(selectedIdea.generatedIdea).map(
                    (section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="bg-black/30 border border-white/10 rounded-3xl p-6"
                      >
                        <div className="flex items-center gap-3 mb-4 text-cyan-300">
                          {getIcon(section.title)}
                          <h3 className="text-xl font-bold">{section.title}</h3>
                        </div>

                        <ul className="space-y-3">
                          {section.content.map((item, idx) => (
                            <li
                              key={idx}
                              className="text-gray-300 leading-relaxed border-l-2 border-cyan-500/40 pl-4"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ),
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

export default SavedIdeasPage;
