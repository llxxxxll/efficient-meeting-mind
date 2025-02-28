
import jsPDF from "jspdf";
import { Meeting } from "../context/MeetingContext";
import { MeetingStats } from "./calculateStats";
import { Recommendation } from "./generateRecommendations";
import { formatDate } from "./formatDate";

export const generatePDF = (
  meetings: Meeting[],
  stats: MeetingStats,
  recommendations: Recommendation[]
): void => {
  // Initialize PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  
  // Add title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Meeting Efficiency Report", pageWidth / 2, 20, { align: "center" });
  
  // Add generation date
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Generated on ${formatDate(new Date())}`,
    pageWidth / 2,
    27,
    { align: "center" }
  );
  
  doc.line(margin, 32, pageWidth - margin, 32);
  
  // Summary of statistics
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Meeting Statistics Summary", margin, 42);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const statsSummary = [
    `Total Meetings: ${stats.totalMeetings}`,
    `Average Duration: ${stats.averageDuration} minutes`,
    `Goal Achievement Rate: ${stats.goalAchievementRate}%`,
    `Average Participants: ${stats.averageParticipants}`,
    `Longest Meeting: ${stats.longestMeetingDuration} minutes`,
    `Shortest Meeting: ${stats.shortestMeetingDuration} minutes`,
  ];
  
  let yPos = 50;
  statsSummary.forEach(stat => {
    doc.text(stat, margin, yPos);
    yPos += 7;
  });
  
  // Key recommendations
  yPos += 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Key Recommendations", margin, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  const highImpactRecommendations = recommendations
    .filter(r => r.impact === 'high')
    .slice(0, 3);

  if (highImpactRecommendations.length === 0) {
    doc.setFont("helvetica", "normal");
    doc.text("No high-impact recommendations at this time.", margin, yPos);
    yPos += 7;
  } else {
    highImpactRecommendations.forEach(rec => {
      doc.setFont("helvetica", "bold");
      doc.text(rec.title, margin, yPos);
      yPos += 5;
      
      doc.setFont("helvetica", "normal");
      const descLines = doc.splitTextToSize(rec.description, contentWidth);
      doc.text(descLines, margin, yPos);
      yPos += descLines.length * 5 + 5;
    });
  }
  
  // Monthly trends
  yPos += 5;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Monthly Trends", margin, yPos);
  yPos += 10;
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Month", margin, yPos);
  doc.text("# Meetings", margin + 45, yPos);
  doc.text("Avg. Duration", margin + 80, yPos);
  doc.text("Goal Rate", margin + 125, yPos);
  yPos += 5;
  
  doc.setFont("helvetica", "normal");
  stats.monthlyStats.forEach(month => {
    doc.text(month.month, margin, yPos);
    doc.text(month.count.toString(), margin + 45, yPos);
    doc.text(`${month.avgDuration} min`, margin + 80, yPos);
    doc.text(`${month.goalAchievementRate}%`, margin + 125, yPos);
    yPos += 5;
  });
  
  // Recent meetings
  if (yPos > doc.internal.pageSize.getHeight() - 40) {
    doc.addPage();
    yPos = 20;
  } else {
    yPos += 15;
  }
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Recent Meetings", margin, yPos);
  yPos += 10;
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Date", margin, yPos);
  doc.text("Duration", margin + 30, yPos);
  doc.text("Participants", margin + 60, yPos);
  doc.text("Topics", margin + 90, yPos);
  doc.text("Goal Met", margin + 140, yPos);
  yPos += 5;
  
  doc.setFont("helvetica", "normal");
  
  const recentMeetings = [...meetings]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
  
  recentMeetings.forEach(meeting => {
    // Check if we need a new page
    if (yPos > doc.internal.pageSize.getHeight() - 10) {
      doc.addPage();
      yPos = 20;
      
      // Repeat the header
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("Date", margin, yPos);
      doc.text("Duration", margin + 30, yPos);
      doc.text("Participants", margin + 60, yPos);
      doc.text("Topics", margin + 90, yPos);
      doc.text("Goal Met", margin + 140, yPos);
      yPos += 5;
      
      doc.setFont("helvetica", "normal");
    }
    
    doc.text(formatDate(meeting.date), margin, yPos);
    doc.text(`${meeting.duration} min`, margin + 30, yPos);
    doc.text(meeting.participants.toString(), margin + 60, yPos);
    doc.text(meeting.topics.length.toString(), margin + 90, yPos);
    doc.text(meeting.goalAchieved ? "Yes" : "No", margin + 140, yPos);
    yPos += 5;
  });
  
  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }
  
  // Save the PDF
  doc.save("Meeting_Efficiency_Report.pdf");
};
