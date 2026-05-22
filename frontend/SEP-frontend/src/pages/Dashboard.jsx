import DashboardLayout from "../components/DashboardLayout";
import { motion } from "framer-motion";
import {
  Lightbulb,
  FileText,
  Bookmark,
  TrendingUp,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Ideas Generated",
      value: "12",
      icon: <Lightbulb className="text-cyan-400" />,
    },
    {
      title: "Business Plans",
      value: "5",
      icon: <FileText className="text-violet-400" />,
    },
    {
      title: "Saved Ideas",
      value: "8",
      icon: <Bookmark className="text-green-400" />,
    },
    {
      title: "Growth Score",
      value: "94%",
      icon: <TrendingUp className="text-pink-400" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-3">
            Founder Dashboard
          </h1>

          <p className="text-gray-400 text-lg">
            Build, validate, and scale your startup with AI intelligence.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl"
            >
              <div className="flex justify-between items-center mb-5">
                {stat.icon}
              </div>

              <h3 className="text-gray-400">{stat.title}</h3>

              <p className="text-4xl font-bold mt-3">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Workspace */}
        <div className="grid md:grid-cols-2 gap-8">

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
          >
            <h2 className="text-3xl font-bold mb-4">
              AI Workspace
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Generate startup ideas, create investor-ready business plans,
              and manage your founder journey with intelligent AI tools.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
          >
            <h2 className="text-3xl font-bold mb-4">
              Recent Activity
            </h2>

            <div className="space-y-4 text-gray-300">
              <div>🧠 AI startup idea generated</div>
              <div>📈 Business plan created</div>
              <div>🚀 Startup strategy analyzed</div>
            </div>
          </motion.div>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;