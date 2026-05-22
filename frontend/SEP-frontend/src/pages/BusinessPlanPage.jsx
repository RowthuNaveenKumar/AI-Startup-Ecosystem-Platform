import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";
import toast from "react-hot-toast";
import { FileText, Wand2, Save, Sparkles } from "lucide-react";

function BusinessPlanPage() {
  const { ideaId } = useParams();

  const [startupIdea, setStartupIdea] = useState("");
  const [businessPlan, setBusinessPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!startupIdea.trim()) {
      toast.error("Please enter startup idea");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/ai/generate-business-plan", {
        startupIdea,
      });

      setBusinessPlan(res.data.businessPlan);

      toast.success("Business plan generated!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to generate business plan",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!businessPlan) {
        toast.error("Generate a business plan first");
        return;
      }

      if (!ideaId) {
        toast.error("Open from Saved Ideas to save this business plan");
        return;
      }

      setSaving(true);

      await api.put(`/ideas/${ideaId}/business-plan`, {
        businessPlan,
      });

      toast.success("Business plan saved successfully!");
    } catch (err) {
      toast.error("Save failed");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-violet-400 font-medium mb-2">
            AI Business Planner
          </p>

          <h1 className="text-5xl font-bold mb-3">
            Investor-ready business plans
          </h1>

          <p className="text-gray-400 text-lg">
            Turn startup concepts into execution-ready business strategies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <FileText className="text-violet-400" />
              <h2 className="text-2xl font-bold">Startup Concept</h2>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              <textarea
                value={startupIdea}
                onChange={(e) => setStartupIdea(e.target.value)}
                rows="10"
                placeholder="Describe startup idea..."
                className="w-full p-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-violet-400 resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 font-semibold hover:scale-105 transition"
              >
                <Wand2 size={18} />
                {loading ? "Generating..." : "Generate Business Plan"}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">AI Strategy Output</h2>

              {businessPlan && (
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

            <div className="min-h-[550px] rounded-3xl bg-black/20 border border-white/10 p-6 text-gray-300 whitespace-pre-wrap leading-relaxed overflow-y-auto">
              {businessPlan ? (
                businessPlan
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <Sparkles size={50} className="mb-4 text-violet-400" />
                  <p>Your AI-generated business strategy will appear here.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BusinessPlanPage;
