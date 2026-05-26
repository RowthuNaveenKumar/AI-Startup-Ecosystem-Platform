import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
        <div className="mb-4">{icon}</div>

        <h3 className="text-xl font-semibold text-white mb-3">
          {title}
        </h3>

        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}

export default FeatureCard;