
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { MeetingStats } from "../../utils/calculateStats";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { motion } from "framer-motion";
import { useIsMobile } from "../../hooks/use-mobile";

interface DurationChartProps {
  stats: MeetingStats;
}

const DurationChart: React.FC<DurationChartProps> = ({ stats }) => {
  const isMobile = useIsMobile();
  const [chartData, setChartData] = useState<any[]>([]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Prepare data for the chart
    const data = stats.monthlyStats
      .filter(month => month.count > 0) // Only include months with meetings
      .map(month => ({
        name: month.month,
        value: month.avgDuration
      }));
    
    // Use animation delay to allow smooth entrance
    setTimeout(() => {
      setChartData(data);
      setAnimated(true);
    }, 300);
  }, [stats]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-3 shadow-md rounded-lg border border-efficiency-200">
          <p className="label font-medium text-efficiency-900">{`${label}`}</p>
          <p className="value text-primary">{`${payload[0].value} minutes`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Average Meeting Duration</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animated ? 1 : 0, y: animated ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="h-[300px] w-full"
        >
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: isMobile ? 0 : 10,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#627D98' }}
                  tickMargin={8}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#627D98' }}
                  tickMargin={8}
                  unit=" min"
                  width={isMobile ? 40 : 60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-efficiency-500">No meeting data available</p>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default DurationChart;
