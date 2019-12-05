import React from "react";
import {
    ResponsiveContainer,
    CartesianGrid,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

export default function LineChartStatic({ data }) {
    console.log('HOLAA');
    return (
        <div>
            <ResponsiveContainer aspect={3} >
                <LineChart data={data} margin={{
                    top: 30, right: 30, left: 20, bottom: 5,
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line
                        type="monotone"
                        dataKey="measure"
                        stroke="#82ca9d"
                        activeDot={{ r: 8 }}
                        isAnimationActive={false}
                    />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}