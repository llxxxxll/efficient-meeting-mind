
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  TooltipProps,
} from "recharts";
import { MeetingStats } from "../../utils/calculateStats";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { motion } from "framer-motion";

interface GoalChartProps {
  stats: MeetingStats;
}

const GoalChart: React.FC<GoalChartProps> = ({ stats }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [animated, setAnimated] = useState(false);

  const COLORS = ["hsl(var(--primary))", "#F87171"];

  useEffect(() => {
    // Calculate goal achievement data
    const achieved = stats.totalMeetings * (stats.goalAchievementRate / 100);
    const notAchieved = stats.totalMeetings - achieved;
    
    const data = [
      { name: "Achieved", value: achieved },
      { name: "Not Achieved", value: notAchieved }
    ];
    
    // Add animation delay for smooth entrance
    setTimeout(() => {
      setChartData(data);
      setAnimated(true);
    }, 500);
  }, [stats]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / stats.totalMeetings) * 100).toFixed(1);
      return (
        <div className="custom-tooltip bg-white p-3 shadow-md rounded-lg border border-efficiency-200">
          <p className="label font-medium">{`${payload[0].name} Goals`}</p>
          <p className="value">
            {`${payload[0].value} meetings (${percentage}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    if (percent < 0.05) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Goal Achievement</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: animated ? 1 : 0, scale: animated ? 1 : 0.95 }}
          transition={{ duration: 0.5 }}
          className="h-[300px] w-full"
        >
          {chartData.length > 0 && stats.totalMeetings > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={300}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => (
                    <span className="text-sm text-efficiency-800">{value}</span>
                  )}
                />
              </PieChart>
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

export default GoalChart;
