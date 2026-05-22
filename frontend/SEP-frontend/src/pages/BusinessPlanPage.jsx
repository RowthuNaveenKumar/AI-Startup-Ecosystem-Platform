import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  FileText,
  Wand2,
  Save,
  Sparkles,
  Target,
  DollarSign,
  Rocket,
  ShieldAlert,
  TrendingUp,
  Users,
  Briefcase,
} from "lucide-react";
import { useEffect } from "react";

function BusinessPlanPage() {
  const { ideaId } = useParams();
  const location = useLocation();

  const [startupIdea, setStartupIdea] = useState(
    location.state?.startupIdea || "",
  );
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
      } else if (current && trimmed) {
        current.content.push(trimmed.replace(/^- /, ""));
      }
    });

    if (current) sections.push(current);

    return sections;
  };

  const getIcon = (title) => {
    const lower = title.toLowerCase();

    if (lower.includes("summary")) return <Briefcase size={20} />;
    if (lower.includes("target")) return <Users size={20} />;
    if (lower.includes("revenue")) return <DollarSign size={20} />;
    if (lower.includes("market")) return <Rocket size={20} />;
    if (lower.includes("risk")) return <ShieldAlert size={20} />;
    if (lower.includes("financial")) return <TrendingUp size={20} />;
    return <Target size={20} />;
  };

  const sections = parseSections(businessPlan);

  useEffect(() => {
    if (location.state?.startupIdea) {
      toast.success("Startup idea loaded from saved ideas");
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
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
          {/* Input Panel */}
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
                placeholder="Describe your startup idea..."
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

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">AI Strategy Output</h2>

              {businessPlan && ideaId && (
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

            <div className="min-h-[700px] max-h-[900px] overflow-y-auto space-y-5">
              {businessPlan ? (
                sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
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
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 pt-32">
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
