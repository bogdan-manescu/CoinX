import React, { useEffect, useRef } from "react";

import { createChart } from "lightweight-charts";

const Chart = ({ sparkline }) => {
    const chartContainer = useRef();

    useEffect(() => {
        const chartOptions = {
            layout: { textColor: "black", background: { type: "solid", color: "white" } },
            height: 400,
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
            },
        };
        const chart = createChart(chartContainer.current, chartOptions);
        let areaSeries;

        if (sparkline[sparkline.length - 1]?.value > sparkline[0]?.value) {
            areaSeries = chart.addAreaSeries({
                lineColor: "rgb(22, 199, 132)",
                topColor: "rgb(22, 199, 132, 1)",
                bottomColor: "rgba(22, 199, 132, 0.05)",
            });
        } else {
            areaSeries = chart.addAreaSeries({
                lineColor: "rgb(234, 57, 67)",
                topColor: "rgb(234, 57, 67, 1)",
                bottomColor: "rgba(234, 57, 67, 0.05)",
            });
        }

        areaSeries.setData(sparkline);
        chart.timeScale().fitContent();

        return () => chart.remove();
    }, [chartContainer, sparkline]);

    return <div ref={chartContainer} />;
};

export default Chart;
