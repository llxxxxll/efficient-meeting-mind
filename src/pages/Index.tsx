
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Clock, BarChart3, Lightbulb, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5DEFF] to-[#F1F0FB]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-[#8B5CF6]" />
            <span className="text-xl font-semibold text-[#8B5CF6]">MeetSmart</span>
          </div>
          <Link to="/dashboard">
            <Button variant="ghost" className="text-gray-600 hover:text-[#8B5CF6]">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold text-[#1A1F2C] mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Optimize Your Meeting Efficiency
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-lg text-[#403E43] mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Track, analyze, and improve your team's meetings with data-driven insights and actionable recommendations.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/add-meeting">
                <Button size="lg" className="gap-2 bg-[#8B5CF6] hover:bg-[#7E69AB] text-white">
                  <Plus className="h-5 w-5" />
                  Record a Meeting
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="gap-2 border-[#D6BCFA] text-[#6E59A5] hover:bg-[#F2FCE2]/20">
                  View Dashboard
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-center text-[#1A1F2C] mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="glass-card hover:shadow-glass-hover p-8 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-[#F2FCE2] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Plus className="h-8 w-8 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-medium text-[#403E43] mb-3 text-center">Record Meetings</h3>
                <p className="text-[#555555] text-center">
                  Log your meetings with key information like duration, participants, topics, and outcomes.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-card hover:shadow-glass-hover p-8 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-[#FFDEE2] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <BarChart3 className="h-8 w-8 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-medium text-[#403E43] mb-3 text-center">Analyze Patterns</h3>
                <p className="text-[#555555] text-center">
                  View detailed analytics on meeting efficiency, trends, and potential bottlenecks.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-card hover:shadow-glass-hover p-8 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-[#FEF7CD] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Lightbulb className="h-8 w-8 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-medium text-[#403E43] mb-3 text-center">Get Recommendations</h3>
                <p className="text-[#555555] text-center">
                  Receive personalized suggestions to improve meeting productivity and effectiveness.
                </p>
              </motion.div>
            </div>
            
            <div className="text-center mt-14">
              <Link to="/dashboard">
                <Button className="gap-2 bg-[#8B5CF6] hover:bg-[#7E69AB] text-white px-8 py-6 h-auto text-lg">
                  Get Started
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-[#F1F0FB] to-[#E5DEFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-semibold text-[#1A1F2C] mb-6">Ready to optimize your meetings?</h2>
            <p className="max-w-2xl mx-auto text-lg text-[#555555] mb-10">
              Join teams that have reduced meeting time by up to 30% with data-driven insights.
            </p>
            <Link to="/add-meeting">
              <Button className="gap-2 bg-[#8B5CF6] hover:bg-[#7E69AB] text-white px-8 py-6 h-auto text-lg">
                Start Now
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#8A898C]">
          <p className="font-medium">MeetSmart - Optimize your meeting efficiency</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
