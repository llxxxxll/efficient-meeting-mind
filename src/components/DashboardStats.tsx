
import { useMemo } from "react";
import { useMeetingContext } from "../context/MeetingContext";
import { calculateStats } from "../utils/calculateStats";
import { motion } from "framer-motion";
import {
  Users,
  Clock,
  CheckCircle,
  Calendar,
  TrendingUp,
  TrendingDown,
  Percent,
} from "lucide-react";

const DashboardStats = () => {
  const { meetings } = useMeetingContext();
  
  const stats = useMemo(() => calculateStats(meetings), [meetings]);

  // Calculate trend indicators by comparing to the average of previous months
  // or a fixed threshold if there isn't enough data
  let durationTrend: "up" | "down" | "neutral" = "neutral";
  let goalTrend: "up" | "down" | "neutral" = "neutral";
  let participantsTrend: "up" | "down" | "neutral" = "neutral";

  if (stats.monthlyStats.length >= 2) {
    const currentMonth = stats.monthlyStats[stats.monthlyStats.length - 1];
    const previousMonths = stats.monthlyStats.slice(0, -1);
    
    // Calculate averages for previous months (if they have meetings)
    const prevMonthsWithMeetings = previousMonths.filter((m) => m.count > 0);
    
    if (prevMonthsWithMeetings.length > 0) {
      const avgPrevDuration = prevMonthsWithMeetings.reduce((sum, m) => sum + m.avgDuration, 0) / prevMonthsWithMeetings.length;
      const avgPrevGoalRate = prevMonthsWithMeetings.reduce((sum, m) => sum + m.goalAchievementRate, 0) / prevMonthsWithMeetings.length;
      
      // Determine trends
      // For duration, lower is better (down is good)
      durationTrend = currentMonth.avgDuration < avgPrevDuration * 0.95 
        ? "down" 
        : currentMonth.avgDuration > avgPrevDuration * 1.05 
          ? "up" 
          : "neutral";
      
      // For goal achievement, higher is better (up is good)
      goalTrend = currentMonth.goalAchievementRate > avgPrevGoalRate * 1.05 
        ? "up" 
        : currentMonth.goalAchievementRate < avgPrevGoalRate * 0.95 
          ? "down" 
          : "neutral";
      
      // For participants, we don't have monthly data, so use a threshold of 5
      participantsTrend = stats.averageParticipants < 5 ? "down" : stats.averageParticipants > 7 ? "up" : "neutral";
    }
  }

  // Helper function to determine trend colors
  const getTrendColor = (trend: "up" | "down" | "neutral", metric: "duration" | "goal" | "participants") => {
    if (trend === "neutral") return "text-efficiency-500";
    
    // For duration, down is good
    if (metric === "duration") {
      return trend === "down" ? "text-green-500" : "text-red-500";
    }
    
    // For goal, up is good
    if (metric === "goal") {
      return trend === "up" ? "text-green-500" : "text-red-500";
    }
    
    // For participants, down is generally good (fewer is more efficient)
    if (metric === "participants") {
      return trend === "down" ? "text-green-500" : "text-amber-500";
    }
    
    return "text-efficiency-500";
  };

  const getTrendIcon = (trend: "up" | "down" | "neutral", metric: string) => {
    if (trend === "neutral") return null;
    
    const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
    const colorClass = getTrendColor(trend, metric as any);
    
    return <TrendIcon className={`h-4 w-4 ml-1 ${colorClass}`} />;
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (meetings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-efficiency-100 shadow-sm">
        <Clock className="mx-auto h-12 w-12 text-efficiency-300" />
        <h3 className="mt-4 text-lg font-medium text-efficiency-900">No Meeting Data</h3>
        <p className="mt-2 text-efficiency-600 max-w-sm mx-auto">
          Record your meetings to see statistics and insights.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="stat-card">
        <div className="flex items-center mb-2">
          <Clock className="h-5 w-5 text-primary" />
          <span className="stat-title ml-2">Average Duration</span>
        </div>
        <div className="flex items-center">
          <span className="stat-value">{stats.averageDuration}</span>
          <span className="text-sm text-efficiency-600 ml-1">minutes</span>
          {getTrendIcon(durationTrend, "duration")}
        </div>
        <p className="stat-description">
          {durationTrend === "down" 
            ? "Shorter than previous" 
            : durationTrend === "up" 
              ? "Longer than previous" 
              : "Similar to previous"}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="stat-card">
        <div className="flex items-center mb-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          <span className="stat-title ml-2">Goal Achievement</span>
        </div>
        <div className="flex items-center">
          <span className="stat-value">{stats.goalAchievementRate}</span>
          <span className="text-sm text-efficiency-600 ml-1">%</span>
          {getTrendIcon(goalTrend, "goal")}
        </div>
        <p className="stat-description">
          {goalTrend === "up" 
            ? "Improving" 
            : goalTrend === "down" 
              ? "Declining" 
              : "Stable rate"}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="stat-card">
        <div className="flex items-center mb-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="stat-title ml-2">Avg. Participants</span>
        </div>
        <div className="flex items-center">
          <span className="stat-value">{stats.averageParticipants}</span>
          <span className="text-sm text-efficiency-600 ml-1">people</span>
          {getTrendIcon(participantsTrend, "participants")}
        </div>
        <p className="stat-description">
          {stats.averageParticipants <= 5 
            ? "Optimal size" 
            : stats.averageParticipants <= 7 
              ? "Slightly large" 
              : "Consider reducing"}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="stat-card">
        <div className="flex items-center mb-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span className="stat-title ml-2">Total Meetings</span>
        </div>
        <div className="flex items-center">
          <span className="stat-value">{stats.totalMeetings}</span>
          <span className="text-sm text-efficiency-600 ml-1">recorded</span>
        </div>
        <p className="stat-description">
          Since you started tracking
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DashboardStats;
