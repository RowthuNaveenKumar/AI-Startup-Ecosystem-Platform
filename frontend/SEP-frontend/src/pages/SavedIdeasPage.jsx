import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Bookmark, Trash2, Sparkles, Briefcase, Pencil } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SavedIdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const navigate = useNavigate();

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
    try {
      await api.delete(`/ideas/${id}`);

      setIdeas((prev) => prev.filter((idea) => idea.id !== id));

      toast.success("Idea deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [user]);

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

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">
            Loading saved ideas...
          </div>
        ) : ideas.length === 0 ? (
          /* Empty State */
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
        ) : (
          /* Idea Cards */
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {ideas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-xl flex flex-col"
              >
                {/* Top */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-cyan-500/20">
                    <Bookmark className="text-cyan-400" />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/business-plan/${idea.id}`)}
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

                {/* Content */}
                <h2 className="text-xl font-bold mb-4">{idea.industry}</h2>

                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed flex-1 overflow-hidden">
                  {idea.generatedIdea?.length > 300
                    ? idea.generatedIdea.substring(0, 300) + "..."
                    : idea.generatedIdea}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default SavedIdeasPage;
