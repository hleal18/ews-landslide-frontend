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
/**
 * 
 *  
 */
export default function AxisLineChartStatic({ data }) {
    console.log('Data: ', data);
    return (
        // width should be in 99%, so that the responsive container
        // resizes the chart component accordingly. Otherwise
        // the chart might be rendered out of the external grid.
        // Defining an aspect is essential, otherwise, child components
        // from the ResponsiveContainer will not be rendered.
        <ResponsiveContainer width='99%' aspect={1.6}>
            <LineChart data={data} margin={{
                top: 30, right: 30, left: 20, bottom: 5,
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" interval="preserveStartEnd" />
                <YAxis domain={[-15, 15]} interval="preserveStartEnd" />
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
                <Legend />
            </LineChart>

        </ResponsiveContainer >
    );
}
