import React from "react";

import {
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    LineSeries,
    LineMarkSeries
} from "react-vis";

export default function LineChartDynamic({ data }) {
    return (
        <div>
            <XYPlot height={300} width={1000}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineMarkSeries data={data} animation />
            </XYPlot>
        </div>
    )
}