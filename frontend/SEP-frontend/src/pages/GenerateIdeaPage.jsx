import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";
import toast from "react-hot-toast";
import { Sparkles, Wand2, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function GenerateIdeaPage() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    industry: "",
    problem: "",
    budget: "",
  });

  const [generatedIdea, setGeneratedIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/ai/generate-idea", form);

      setGeneratedIdea(res.data.generatedIdea);

      toast.success("Startup idea generated!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Generation failed"
      );
    } finally {
      setLoading(false);
    }
  };

const handleSave = async () => {
  try {
    if (!generatedIdea) {
      toast.error("Generate an idea first");
      return;
    }

    if (!user?.userId) {
      toast.error("User not found");
      return;
    }

    setSaving(true);

    await api.post("/ideas", {
      industry: form.industry,
      problem: form.problem,
      budget: form.budget,
      generatedIdea: generatedIdea,
      userId: user.userId,
    });

    toast.success("Idea saved successfully!");
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to save idea");
  } finally {
    setSaving(false);
  }
};

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-cyan-400 font-medium mb-2">
            AI Idea Generator
          </p>

          <h1 className="text-5xl font-bold mb-3">
            Build your next unicorn
          </h1>

          <p className="text-gray-400 text-lg">
            Describe your market, pain point, and budget — AI does the rest.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="text-cyan-400" />
              <h2 className="text-2xl font-bold">
                Founder Input
              </h2>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="text-gray-300 mb-2 block">
                  Industry
                </label>

                <input
                  type="text"
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder="e.g. Healthcare, FinTech, SaaS"
                  required
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">
                  Problem to Solve
                </label>

                <textarea
                  name="problem"
                  value={form.problem}
                  onChange={handleChange}
                  rows="5"
                  required
                  placeholder="Describe the problem..."
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="text-gray-300 mb-2 block">
                  Budget
                </label>

                <input
                  type="text"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="$10,000"
                  required
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 font-semibold hover:scale-105 transition"
              >
                <Wand2 size={18} />
                {loading ? "Generating..." : "Generate Startup Idea"}
              </button>
            </form>
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                AI Output
              </h2>

              {generatedIdea && (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-green-500/20 hover:bg-green-500/30 transition"
                >
                  <Save size={16} />
                  {saving ? "Saving..." : "Save"}
                </button>
              )}
            </div>

            <div className="min-h-[500px] rounded-3xl bg-black/20 border border-white/10 p-6 text-gray-300 whitespace-pre-wrap leading-relaxed overflow-y-auto">
              {generatedIdea ? (
                generatedIdea
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <Sparkles
                    size={50}
                    className="mb-4 text-cyan-400"
                  />
                  <p>
                    Your AI-generated startup concept will appear here.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default GenerateIdeaPage;