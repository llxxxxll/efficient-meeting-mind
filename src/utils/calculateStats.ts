
import { Meeting, Topic } from "../context/MeetingContext";
import { startOfMonth, format, eachMonthOfInterval, subMonths } from "date-fns";

export interface MeetingStats {
  totalMeetings: number;
  averageDuration: number;
  goalAchievementRate: number;
  averageParticipants: number;
  longestMeetingDuration: number;
  shortestMeetingDuration: number;
  topicStats: {
    name: string;
    count: number;
    avgDuration: number;
  }[];
  monthlyStats: {
    month: string;
    count: number;
    avgDuration: number;
    goalAchievementRate: number;
  }[];
}

export const calculateStats = (meetings: Meeting[]): MeetingStats => {
  if (!meetings.length) {
    return {
      totalMeetings: 0,
      averageDuration: 0,
      goalAchievementRate: 0,
      averageParticipants: 0,
      longestMeetingDuration: 0,
      shortestMeetingDuration: 0,
      topicStats: [],
      monthlyStats: []
    };
  }

  // Basic stats
  const totalMeetings = meetings.length;
  const averageDuration = Math.round(
    meetings.reduce((sum, meeting) => sum + meeting.duration, 0) / totalMeetings
  );
  const goalAchievementRate = Math.round(
    (meetings.filter(meeting => meeting.goalAchieved).length / totalMeetings) * 100
  );
  const averageParticipants = Math.round(
    meetings.reduce((sum, meeting) => sum + meeting.participants, 0) / totalMeetings
  );
  const longestMeetingDuration = Math.max(...meetings.map(m => m.duration));
  const shortestMeetingDuration = Math.min(...meetings.map(m => m.duration));

  // Topic stats
  const topicData: Record<string, { count: number, totalDuration: number }> = {};
  
  meetings.forEach(meeting => {
    const topicDuration = meeting.duration / (meeting.topics.length || 1);
    
    meeting.topics.forEach(topic => {
      const topicName = topic.name.trim().toLowerCase();
      
      if (!topicData[topicName]) {
        topicData[topicName] = { count: 0, totalDuration: 0 };
      }
      
      topicData[topicName].count += 1;
      topicData[topicName].totalDuration += topic.duration || topicDuration;
    });
  });

  const topicStats = Object.entries(topicData)
    .map(([name, data]) => ({
      name,
      count: data.count,
      avgDuration: Math.round(data.totalDuration / data.count)
    }))
    .sort((a, b) => b.avgDuration - a.avgDuration)
    .slice(0, 10);

  // Monthly stats
  const now = new Date();
  const sixMonthsAgo = subMonths(now, 5);
  
  // Create array of the last 6 months
  const months = eachMonthOfInterval({
    start: sixMonthsAgo,
    end: now
  });

  const monthlyStats = months.map(month => {
    const monthStart = startOfMonth(month);
    const monthName = format(month, 'MMM yyyy');
    
    const monthMeetings = meetings.filter(meeting => {
      const meetingMonth = startOfMonth(new Date(meeting.date));
      return meetingMonth.getTime() === monthStart.getTime();
    });
    
    const count = monthMeetings.length;
    const avgDuration = count ? Math.round(
      monthMeetings.reduce((sum, meeting) => sum + meeting.duration, 0) / count
    ) : 0;
    
    const goalAchievementRate = count ? Math.round(
      (monthMeetings.filter(meeting => meeting.goalAchieved).length / count) * 100
    ) : 0;
    
    return {
      month: monthName,
      count,
      avgDuration,
      goalAchievementRate
    };
  });

  return {
    totalMeetings,
    averageDuration,
    goalAchievementRate,
    averageParticipants,
    longestMeetingDuration,
    shortestMeetingDuration,
    topicStats,
    monthlyStats
  };
};
