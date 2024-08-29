// pages/[country].jsx

import React, { useState, useEffect } from "npm:react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale
} from "chart.js";

// Register the necessary components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const GdpPage = ({ country }) => {
    const [gdpData, setGdpData] = useState([]);
    const [growthData, setGrowthData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/gdp?country=${country}`)
            .then((response) => response.json())
            .then((data) => {
                setGdpData(data.gdpData);
                setGrowthData(data.growthData);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [country]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    const chartData = {
        labels: gdpData.map((item) => item.year),
        datasets: [
            {
                label: "GDP (Trillion USD)",
                data: gdpData.map((item) => item.gdp),
                fill: false,
                borderColor: "#34D399",
                tension: 0.1,
            },
            {
                label: "Growth (%)",
                data: growthData.map((item) => item.growth),
                fill: false,
                borderColor: "#3B82F6",
                tension: 0.1,
                yAxisID: "y-axis-growth",
            },
        ],
    };

    const options = {
        scales: {
            "y-axis-growth": {
                type: "linear",
                position: "right",
                ticks: {
                    callback: (value) => `${value}%`,
                },
            },
        },
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-4">
                GDP and Growth Data for {country.toUpperCase()}
            </h1>
            <div className="card shadow-lg p-6 bg-white">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default GdpPage;
