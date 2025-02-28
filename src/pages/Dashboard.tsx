
import { useMemo } from "react";
import { useMeetingContext } from "../context/MeetingContext";
import { calculateStats } from "../utils/calculateStats";
import NavBar from "../components/NavBar";
import MeetingList from "../components/MeetingList";
import DashboardStats from "../components/DashboardStats";
import DurationChart from "../components/charts/DurationChart";
import GoalChart from "../components/charts/GoalChart";
import ExportButton from "../components/ExportButton";
import { generateRecommendations } from "../utils/generateRecommendations";
import RecommendationCard from "../components/RecommendationCard";
import { Link } from "react-router-dom";
import { ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { meetings, clearMeetings } = useMeetingContext();
  const stats = useMemo(() => calculateStats(meetings), [meetings]);
  const { toast } = useToast();
  
  // Get top 3 recommendations
  const recommendations = useMemo(
    () => generateRecommendations(meetings).slice(0, 3),
    [meetings]
  );

  const handleReset = () => {
    clearMeetings();
    toast({
      title: "Success",
      description: "All meeting data has been reset",
      variant: "default",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="page-container">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="section-title mb-4 sm:mb-0 magic-sparkle"
            variants={itemVariants}
          >
            Meeting Dashboard
          </motion.h1>
          <motion.div 
            className="flex gap-3"
            variants={itemVariants}
          >
            <ExportButton />
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-red-300 dark:border-red-700/50 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset Data
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md dark:bg-card">
                <DialogHeader>
                  <DialogTitle>Reset Meeting Data</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to reset all meeting data? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <Button
                    type="button"
                    variant="destructive" 
                    onClick={handleReset}
                  >
                    Yes, Reset All Data
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="ml-3"
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <DashboardStats />
        </motion.div>

        {meetings.length > 0 && (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="magic-float">
                <DurationChart stats={stats} />
              </motion.div>
              <motion.div variants={itemVariants} className="magic-float" style={{ animationDelay: "1.5s" }}>
                <GoalChart stats={stats} />
              </motion.div>
            </motion.div>

            {recommendations.length > 0 && (
              <motion.div 
                className="mt-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="flex justify-between items-center mb-4"
                  variants={itemVariants}
                >
                  <h2 className="subsection-title mb-0 magic-sparkle">Top Recommendations</h2>
                  <Link 
                    to="/recommendations"
                    className="text-primary hover:text-primary/80 flex items-center text-sm"
                  >
                    View all
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div 
                  className="grid grid-cols-1 gap-4"
                  variants={itemVariants}
                >
                  {recommendations.map((recommendation, index) => (
                    <RecommendationCard
                      key={recommendation.id}
                      recommendation={recommendation}
                      index={index}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}

            <motion.div 
              className="mt-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <motion.h2 
                className="subsection-title magic-sparkle" 
                variants={itemVariants}
              >
                Recent Meetings
              </motion.h2>
              <motion.div variants={itemVariants}>
                <MeetingList />
              </motion.div>
            </motion.div>
          </>
        )}

        {meetings.length === 0 && (
          <motion.div 
            className="mt-8 text-center py-12 bg-white dark:bg-card rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm magic-glow"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h3 
              className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
              variants={itemVariants}
            >
              No meetings recorded yet
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-6"
              variants={itemVariants}
            >
              Record your first meeting to see statistics and insights.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/add-meeting"
                className="btn-primary magic-pulse"
              >
                Add Your First Meeting
              </Link>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
