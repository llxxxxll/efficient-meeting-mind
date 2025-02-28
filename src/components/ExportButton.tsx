
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, Check, Loader2 } from "lucide-react";
import { generatePDF } from "../utils/pdfExport";
import { useMeetingContext } from "../context/MeetingContext";
import { calculateStats } from "../utils/calculateStats";
import { generateRecommendations } from "../utils/generateRecommendations";
import { useToast } from "@/hooks/use-toast";

const ExportButton = () => {
  const { meetings } = useMeetingContext();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleExport = async () => {
    if (meetings.length === 0) {
      toast({
        title: "No data to export",
        description: "Add some meetings before exporting a report.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);

    try {
      // Calculate stats and recommendations
      const stats = calculateStats(meetings);
      const recommendations = generateRecommendations(meetings);

      // Generate PDF report
      generatePDF(meetings, stats, recommendations);

      // Show success state
      setIsSuccess(true);
      
      // Reset after 2 seconds
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      
      toast({
        title: "Report exported successfully",
        description: "Your meeting efficiency report has been downloaded.",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      disabled={isExporting || meetings.length === 0}
      className="flex items-center gap-2 transition-all duration-300"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Exporting...</span>
        </>
      ) : isSuccess ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          <span>Exported</span>
        </>
      ) : (
        <>
          <Printer className="h-4 w-4" />
          <span>Export Report</span>
        </>
      )}
    </Button>
  );
};

export default ExportButton;
