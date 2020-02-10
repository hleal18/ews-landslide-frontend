import React from "react";
import {
    ResponsiveContainer,
    CartesianGrid,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

// Data should be an array of objects, where each one should contain:
// {timestamp: Date, x: number, y: number, z: numer}
export default function AxisLineChartStatic({ data }) {
    console.log('Data: ', data);
    return (
        <div>
            <LineChart data={data} margin={{
                top: 30, right: 30, left: 20, bottom: 5,
            }} height={350} width={500}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={[-15, 15]} />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="x"
                    stroke="#82ca9d"
                    dot={false}
                    activeDot={{ r: 8 }}
                    isAnimationActive={false}
                    connectNulls={true}
                />
                <Line
                    type="monotone"
                    dataKey="y"
                    dot={false}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    isAnimationActive={false}
                    connectNulls={true}
                />
                <Line
                    type="monotone"
                    dataKey="z"
                    stroke="#7DC4FF"
                    dot={false}
                    activeDot={{ r: 8 }}
                    isAnimationActive={false}
                    connectNulls={true}
                />
                <Legend />
            </LineChart>

        </div>
    );
}
