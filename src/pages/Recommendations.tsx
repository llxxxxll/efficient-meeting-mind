
import { useMemo } from "react";
import { useMeetingContext } from "../context/MeetingContext";
import { generateRecommendations } from "../utils/generateRecommendations";
import NavBar from "../components/NavBar";
import RecommendationCard from "../components/RecommendationCard";
import { Lightbulb, Clock, Users, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Recommendations = () => {
  const { meetings } = useMeetingContext();
  
  const allRecommendations = useMemo(
    () => generateRecommendations(meetings),
    [meetings]
  );

  // Group recommendations by category
  const categorizedRecommendations = useMemo(() => {
    const grouped = {
      participants: allRecommendations.filter(r => r.category === 'participants'),
      duration: allRecommendations.filter(r => r.category === 'duration'),
      goals: allRecommendations.filter(r => r.category === 'goals'),
      topics: allRecommendations.filter(r => r.category === 'topics'),
      general: allRecommendations.filter(r => r.category === 'general'),
    };
    
    return grouped;
  }, [allRecommendations]);

  // Get proper icon for each category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'participants':
        return <Users className="h-5 w-5" />;
      case 'duration':
        return <Clock className="h-5 w-5" />;
      case 'goals':
        return <CheckCircle className="h-5 w-5" />;
      case 'topics':
        return <HelpCircle className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  // Get proper title for each category
  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'participants':
        return 'Participant Optimization';
      case 'duration':
        return 'Meeting Duration';
      case 'goals':
        return 'Goal Achievement';
      case 'topics':
        return 'Topic Management';
      default:
        return 'General Improvements';
    }
  };

  if (meetings.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="page-container">
          <h1 className="section-title text-center">Recommendations</h1>
          
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm max-w-3xl mx-auto mt-8">
            <Lightbulb className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations available</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Record some meetings to get personalized recommendations on how to improve your meeting efficiency.
            </p>
            <Link to="/add-meeting">
              <Button>Record Your First Meeting</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="page-container">
        <h1 className="section-title text-center mb-2">Recommendations</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Based on your meeting data, here are personalized recommendations to improve your meeting efficiency.
        </p>

        {Object.entries(categorizedRecommendations).map(([category, recs]) => 
          recs.length > 0 ? (
            <section key={category} className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                  {getCategoryIcon(category)}
                </div>
                <h2 className="subsection-title mb-0">{getCategoryTitle(category)}</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {recs.map((recommendation, index) => (
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    index={index}
                  />
                ))}
              </div>
            </section>
          ) : null
        )}
      </main>
    </div>
  );
};

export default Recommendations;
