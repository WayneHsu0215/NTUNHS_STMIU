import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// 注册雷达图所需的组件
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const BrainwaveRadarChart = ({ data }) => {
    // 提取数据
    const labels = ['Delta', 'Theta', 'Low Alpha', 'High Alpha', 'Low Beta', 'High Beta', 'Low Gamma', 'Mid Gamma'];

    const chartData = {
        labels,
        datasets: [
            {
                label: '腦波數據',
                data: [
                    data.Delta,
                    data.Theta,
                    data.Low_Alpha,
                    data.High_Alpha,
                    data.Low_Beta,
                    data.High_Beta,
                    data.Low_Gamma,
                    data.Mid_Gamma
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            }
        ]
    };

    const options = {
        responsive: true,
        scale: {
            ticks: { beginAtZero: true },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            }
        },
    };

    return (
        <div style={{ width: '400px', height: '400px' }}> {/* 设置父容器大小 */}
            <Radar data={chartData} options={options} />
        </div>
    );
};

export default BrainwaveRadarChart;
