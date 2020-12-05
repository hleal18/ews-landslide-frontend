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

/**
 * 
 * name: date string,
 * measure: number 
 */
export default function LineChartStatic({ data }) {
    return (
        // width should be in 99%, so that the responsive container
        // resizes the chart component accordingly. Otherwise
        // the chart might be rendered out of the external grid.
        // Defining an aspect is essential, otherwise, child components
        // from the ResponsiveContainer will not be rendered.
        <ResponsiveContainer aspect={1.6} width='99%'>
            <LineChart data={data} margin={{
                top: 30, right: 30, left: 20, bottom: 5,
            }} width='100%'>
                <CartesianGrid strokeDasharray="1 6" />

                <XAxis 
                    dataKey="name" 
                    interval="preserveStartEnd"
                />
                <YAxis
                    interval="preserveStartEnd" 
 
                />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="measure"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}