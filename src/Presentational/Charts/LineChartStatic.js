import React from "react";
import {
    ResponsiveContainer,
    CartesianGrid,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Label,
} from "recharts";

/**
 *
 * name: date string,
 * measure: number
 */
export default function LineChartStatic({ data, variableNameWithUnit }) {
    return (
        // width should be in 99%, so that the responsive container
        // resizes the chart component accordingly. Otherwise
        // the chart might be rendered out of the external grid.
        // Defining an aspect is essential, otherwise, child components
        // from the ResponsiveContainer will not be rendered.
        <ResponsiveContainer aspect={1.6} width="99%">
            <LineChart
                data={data}
                margin={{
                    top: 30,
                    right: 30,
                    left: 20,
                    bottom: 25,
                }}
                width="100%"
            >
                <CartesianGrid strokeDasharray="1 6" />

                <XAxis dataKey="name" interval="preserveStartEnd" spacing={30} style={{ marginBottom: 45 }}>
                    <Label
                        value="Fecha y hora"
                        offset={-10}
                        position="insideBottom"
                        style={{ marginBottom: 12 }}
                        
                    />
                </XAxis>
                <YAxis
                    interval="preserveStartEnd"
                    domain={[0, 100]}
                    // label={{
                    //     value: variableNameWithUnit,
                    //     angle: -180,
                    //     position: "insideLeft",
                    // }}
                >
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
                    dataKey="measure"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
