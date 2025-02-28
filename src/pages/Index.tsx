
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Clock, BarChart3, Lightbulb, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary-gray">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary-blue" />
            <span className="text-xl font-bold text-primary-blue">MeetSmart</span>
          </div>
          <Link to="/dashboard">
            <Button variant="ghost" className="text-text-dark hover:text-primary-blue">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold text-primary-blue mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Optimize Your Meeting Efficiency
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-lg text-text-dark mb-10"
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
                <Button size="lg" className="gap-2 bg-accent-green hover:bg-accent-green/90 text-white">
                  <Plus className="h-5 w-5" />
                  Record a Meeting
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="gap-2 border-primary-blue text-primary-blue hover:bg-primary-blue/5">
                  View Dashboard
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-primary-blue mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="glass-card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-accent-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Plus className="h-8 w-8 text-accent-green" />
                </div>
                <h3 className="text-xl font-bold text-primary-blue mb-3 text-center">Record Meetings</h3>
                <p className="text-text-dark text-center">
                  Log your meetings with key information like duration, participants, topics, and outcomes.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-primary-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <BarChart3 className="h-8 w-8 text-primary-blue" />
                </div>
                <h3 className="text-xl font-bold text-primary-blue mb-3 text-center">Analyze Patterns</h3>
                <p className="text-text-dark text-center">
                  View detailed analytics on meeting efficiency, trends, and potential bottlenecks.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-warning-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Lightbulb className="h-8 w-8 text-warning-orange" />
                </div>
                <h3 className="text-xl font-bold text-primary-blue mb-3 text-center">Get Recommendations</h3>
                <p className="text-text-dark text-center">
                  Receive personalized suggestions to improve meeting productivity and effectiveness.
                </p>
              </motion.div>
            </div>
            
            <div className="text-center mt-14">
              <Link to="/dashboard">
                <Button className="gap-2 bg-primary-blue hover:bg-primary-blue/90 text-white px-8 py-6 h-auto text-lg">
                  Get Started
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary-blue mb-6">Ready to optimize your meetings?</h2>
            <p className="max-w-2xl mx-auto text-lg text-text-dark mb-10">
              Join teams that have reduced meeting time by up to 30% with data-driven insights.
            </p>
            <Link to="/add-meeting">
              <Button className="gap-2 bg-accent-green hover:bg-accent-green/90 text-white px-8 py-6 h-auto text-lg">
                Start Now
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p className="font-medium">MeetSmart - Optimize your meeting efficiency</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
