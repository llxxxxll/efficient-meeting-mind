
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
  LabelList,
} from "recharts";
import { MeetingStats } from "../../utils/calculateStats";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { motion } from "framer-motion";
import { useIsMobile } from "../../hooks/use-mobile";

interface TopicsChartProps {
  stats: MeetingStats;
}

const TopicsChart: React.FC<TopicsChartProps> = ({ stats }) => {
  const isMobile = useIsMobile();
  const [chartData, setChartData] = useState<any[]>([]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Get top 5 time-consuming topics
    const data = stats.topicStats
      .slice(0, 5)
      .map(topic => ({
        name: topic.name.charAt(0).toUpperCase() + topic.name.slice(1),
        value: topic.avgDuration,
        count: topic.count
      }));
      
    // Add animation delay for smooth entrance
    setTimeout(() => {
      setChartData(data);
      setAnimated(true);
    }, 700);
  }, [stats]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-3 shadow-md rounded-lg border border-gray-200">
          <p className="label font-medium text-gray-900">{`${label}`}</p>
          <p className="text-sm text-gray-700">{`Average: ${payload[0].value} minutes`}</p>
          <p className="text-sm text-gray-700">{`Occurrences: ${payload[0].payload.count} times`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Time-Consuming Topics</CardTitle>
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
                layout="vertical"
                margin={{
                  top: 10,
                  right: 30,
                  left: isMobile ? 80 : 100,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#627D98' }}
                  tickMargin={8}
                  unit=" min"
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#627D98' }}
                  tickMargin={8}
                  width={isMobile ? 70 : 90}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  barSize={24}
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                >
                  <LabelList 
                    dataKey="value" 
                    position="right" 
                    formatter={(value: number) => `${value} min`}
                    style={{ fontSize: '12px', fill: '#627D98' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">No topic data available</p>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default TopicsChart;
