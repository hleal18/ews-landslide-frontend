import React from "react";
import {
    ResponsiveContainer,
    CartesianGrid,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Label,
} from "recharts";

// Data should be an array of objects, where each one should contain:
// {timestamp: Date, x: number, y: number, z: numer}
/**
 *
 *
 */
export default function AxisLineChartStatic({ data, variableNameWithUnit }) {
    // console.log('Data: ', data);
    return (
        // width should be in 99%, so that the responsive container
        // resizes the chart component accordingly. Otherwise
        // the chart might be rendered out of the external grid.
        // Defining an aspect is essential, otherwise, child components
        // from the ResponsiveContainer will not be rendered.
        <ResponsiveContainer width="99%" aspect={1.6}>
            <LineChart
                data={data}
                margin={{
                    top: 30,
                    right: 30,
                    left: 20,
                    bottom: 25,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" interval="preserveStartEnd">
                    <Label
                        value="Fecha y hora"
                        offset={-10}
                        position="insideBottom"
                    />
                </XAxis>
                <YAxis domain={[-15, 15]} interval="preserveStartEnd">
                    {variableNameWithUnit && (
                        <Label
                            value={variableNameWithUnit}
                            angle={-90}
                            position="insideLeft"
                            style={{ textAnchor: "middle" }}
                        />
                    )}
                </YAxis>
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
                <Legend
                    wrapperStyle={{
                        top: 0,
                        left: 50,
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
