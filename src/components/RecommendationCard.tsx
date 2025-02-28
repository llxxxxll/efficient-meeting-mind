
import { Recommendation } from "../utils/generateRecommendations";
import { motion } from "framer-motion";
import { Lightbulb, AlertTriangle, Clock, Users, CheckCircle, HelpCircle } from "lucide-react";

interface RecommendationCardProps {
  recommendation: Recommendation;
  index?: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, index = 0 }) => {
  // Determine icon based on category
  const getIcon = () => {
    switch (recommendation.category) {
      case "participants":
        return <Users className="h-5 w-5" />;
      case "duration":
        return <Clock className="h-5 w-5" />;
      case "goals":
        return <CheckCircle className="h-5 w-5" />;
      case "topics":
        return <HelpCircle className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  // Determine color based on impact
  const getImpactColor = () => {
    switch (recommendation.impact) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="recommendation-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start">
        <div className="mt-0.5 p-2 rounded-full bg-primary/10 text-primary">
          {getIcon()}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="recommendation-title">{recommendation.title}</h3>
            <motion.span 
              className={`text-xs font-medium px-2 py-1 rounded-full ${getImpactColor()}`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {recommendation.impact === "high" ? "High Impact" : 
               recommendation.impact === "medium" ? "Medium Impact" : "Low Impact"}
            </motion.span>
          </div>
          <p className="recommendation-content">{recommendation.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
