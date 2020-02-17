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
    return (
        <div>
            <LineChart data={data} margin={{
                top: 30, right: 30, left: 20, bottom: 5,
            }} height={350} width={500}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="measure"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    isAnimationActive={false}
                />
            </LineChart>

        </div>
    );
}