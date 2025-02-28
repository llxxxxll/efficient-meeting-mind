
import { Meeting } from "../context/MeetingContext";
import { calculateStats } from "./calculateStats";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'participants' | 'duration' | 'goals' | 'topics' | 'general';
  impact: 'high' | 'medium' | 'low';
}

export const generateRecommendations = (meetings: Meeting[]): Recommendation[] => {
  if (!meetings.length) {
    return [];
  }
  
  const stats = calculateStats(meetings);
  const recommendations: Recommendation[] = [];

  // Participant-based recommendations
  const highParticipantMeetings = meetings.filter(m => m.participants > 7).length;
  const highParticipantPercentage = (highParticipantMeetings / meetings.length) * 100;
  
  if (stats.averageParticipants > 5) {
    recommendations.push({
      id: crypto.randomUUID(),
      title: "Reduce meeting size",
      description: `Your meetings average ${stats.averageParticipants} participants. Consider limiting attendance to 5 or fewer essential stakeholders to improve decision-making efficiency.`,
      category: 'participants',
      impact: stats.averageParticipants > 8 ? 'high' : 'medium'
    });
  }
  
  if (highParticipantPercentage > 30) {
    recommendations.push({
      id: crypto.randomUUID(),
      title: "Implement the "Two-Pizza Rule"",
      description: "Over 30% of your meetings have more than 7 participants. Try applying Amazon's 'Two-Pizza Rule': if you need more than two pizzas to feed the group, the meeting is too large.",
      category: 'participants',
      impact: 'medium'
    });
  }

  // Duration-based recommendations
  const longMeetings = meetings.filter(m => m.duration > 60).length;
  const longMeetingPercentage = (longMeetings / meetings.length) * 100;
  
  if (stats.averageDuration > 60) {
    recommendations.push({
      id: crypto.randomUUID(),
      title: "Shorten meeting duration",
      description: `Your average meeting duration is ${stats.averageDuration} minutes. Research shows productivity declines after 30-45 minutes. Consider shorter, more focused meetings.`,
      category: 'duration',
      impact: 'high'
    });
  }
  
  if (longMeetingPercentage > 30) {
    recommendations.push({
      id: crypto.randomUUID(),
      title: "Use the 30-minute default",
      description: "Over 30% of your meetings exceed one hour. Set 30 minutes as your default meeting length, requiring explicit justification for longer durations.",
      category: 'duration',
      impact: 'medium'
    });
  }

  // Goal achievement recommendations
  if (stats.goalAchievementRate < 70) {
    recommendations.push({
      id: crypto.randomUUID(),
      title: "Set clear meeting objectives",
      description: `Only ${stats.goalAchievementRate}% of your meetings achieve their goals. For each meeting, define a specific objective and desired outcome before sending invitations.`,
      category: 'goals',
      impact: 'high'
    });
    
    recommendations.push({
      id: crypto.randomUUID(),
      title: "Implement pre-meeting agendas",
      description: "Require a written agenda for every meeting, distributed at least 24 hours in advance. Each agenda should include the meeting goal and expected outcomes.",
      category: 'goals',
      impact: 'high'
    });
  }
  
  // Topic-based recommendations
  const avgTopicsPerMeeting = meetings.reduce((sum, m) => sum + m.topics.length, 0) / meetings.length;
  
  if (avgTopicsPerMeeting > 5 && stats.averageDuration < 90) {
    recommendations.push({
      id: crypto.randomUUID(),
      title: "Focus on fewer topics",
      description: `You discuss an average of ${Math.round(avgTopicsPerMeeting)} topics in ${stats.averageDuration}-minute meetings. Limit discussion topics to 3-5 per hour to ensure adequate coverage.`,
      category: 'topics',
      impact: 'medium'
    });
  }
  
  if (stats.topicStats.length > 0) {
    const timeConsumingTopics = stats.topicStats
      .filter(topic => topic.avgDuration > stats.averageDuration / 3)
      .map(topic => topic.name)
      .slice(0, 3);
    
    if (timeConsumingTopics.length > 0) {
      recommendations.push({
        id: crypto.randomUUID(),
        title: "Address time-consuming topics separately",
        description: `Topics like "${timeConsumingTopics.join('", "')}" consume significant meeting time. Consider dedicated sessions or alternative formats for these discussions.`,
        category: 'topics',
        impact: 'medium'
      });
    }
  }
  
  // General recommendations
  recommendations.push({
    id: crypto.randomUUID(),
    title: "Implement a "no-meeting day"",
    description: "Designate one day per week as meeting-free to allow uninterrupted work time for focused productivity.",
    category: 'general',
    impact: 'medium'
  });
  
  recommendations.push({
    id: crypto.randomUUID(),
    title: "Stand-up meetings for status updates",
    description: "For simple status updates, use 15-minute stand-up meetings to encourage brevity and engagement.",
    category: 'general',
    impact: 'low'
  });
  
  if (meetings.length > 10) {
    recommendations.push({
      id: crypto.randomUUID(),
      title: "Meeting retrospectives",
      description: "Periodically review meeting effectiveness by asking participants: What went well? What could be improved? What actions should we take?",
      category: 'general',
      impact: 'low'
    });
  }
  
  return recommendations;
};
