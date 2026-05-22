import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Save, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function EditIdeaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [idea, setIdea] = useState({
    userId: "",
    industry: "",
    problem: "",
    budget: "",
    generatedIdea: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchIdea();
  }, []);

  const fetchIdea = async () => {
    try {
      if (!user?.userId) {
        toast.error("User not found");
        navigate("/login");
        return;
      }

      const res = await api.get(`/ideas/${id}`);

      setIdea({
        userId: user.userId,
        industry: res.data.industry,
        problem: res.data.problem,
        budget: res.data.budget,
        generatedIdea: res.data.generatedIdea,
      });
    } catch (err) {
      toast.error("Failed to load idea");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setIdea({
      ...idea,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!user?.userId) {
        toast.error("User not found");
        return;
      }

      setSaving(true);

      await api.put(`/ideas/${id}`, {
        ...idea,
        userId: user.userId,
      });

      toast.success("Idea updated successfully");
      navigate("/saved-ideas");
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-gray-400 text-lg">
          Loading idea...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold">Edit Startup Idea</h1>
            <p className="text-gray-400 mt-2">
              Update your startup concept
            </p>
          </div>

          <button
            onClick={() => navigate("/saved-ideas")}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleUpdate}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-2xl"
        >
          <input
            type="text"
            name="industry"
            value={idea.industry}
            onChange={handleChange}
            placeholder="Industry"
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white"
          />

          <textarea
            name="problem"
            value={idea.problem}
            onChange={handleChange}
            rows="4"
            placeholder="Problem"
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white"
          />

          <input
            type="text"
            name="budget"
            value={idea.budget}
            onChange={handleChange}
            placeholder="Budget"
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white"
          />

          <textarea
            name="generatedIdea"
            value={idea.generatedIdea}
            onChange={handleChange}
            rows="10"
            placeholder="Generated idea"
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white"
          />

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 hover:scale-105 transition"
          >
            <Save size={18} />
            {saving ? "Updating..." : "Update Idea"}
          </button>
        </motion.form>
      </div>
    </DashboardLayout>
  );
}

export default EditIdeaPage;