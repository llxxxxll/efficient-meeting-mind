
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
import { ArrowRight } from "lucide-react";

const Dashboard = () => {
  const { meetings } = useMeetingContext();
  const stats = useMemo(() => calculateStats(meetings), [meetings]);
  
  // Get top 3 recommendations
  const recommendations = useMemo(
    () => generateRecommendations(meetings).slice(0, 3),
    [meetings]
  );

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="page-container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="section-title mb-4 sm:mb-0">Meeting Dashboard</h1>
          <ExportButton />
        </div>

        <DashboardStats />

        {meetings.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <DurationChart stats={stats} />
              <GoalChart stats={stats} />
            </div>

            {recommendations.length > 0 && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="subsection-title mb-0">Top Recommendations</h2>
                  <Link 
                    to="/recommendations"
                    className="text-primary hover:text-primary/80 flex items-center text-sm"
                  >
                    View all
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {recommendations.map((recommendation, index) => (
                    <RecommendationCard
                      key={recommendation.id}
                      recommendation={recommendation}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h2 className="subsection-title">Recent Meetings</h2>
              <MeetingList />
            </div>
          </>
        )}

        {meetings.length === 0 && (
          <div className="mt-8 text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings recorded yet</h3>
            <p className="text-gray-600 mb-6">
              Record your first meeting to see statistics and insights.
            </p>
            <Link
              to="/add-meeting"
              className="btn-primary"
            >
              Add Your First Meeting
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
