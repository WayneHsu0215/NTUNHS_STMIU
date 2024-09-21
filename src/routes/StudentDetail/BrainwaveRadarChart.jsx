import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Title
} from 'chart.js';

// 注册雷达图所需的组件
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title);

const BrainwaveRadarChart = ({ data }) => {
    // 提取數據並轉換為數字類型
    const labels = ['Delta', 'Theta', 'Low Alpha', 'High Alpha', 'Low Beta', 'High Beta', 'Low Gamma', 'Mid Gamma'];

    const chartData = {
        labels,
        datasets: [
            {
                label: '腦波數據',
                data: [
                    parseFloat(data.Delta),
                    parseFloat(data.Theta),
                    parseFloat(data.Low_Alpha),
                    parseFloat(data.High_Alpha),
                    parseFloat(data.Low_Beta),
                    parseFloat(data.High_Beta),
                    parseFloat(data.Low_Gamma),
                    parseFloat(data.Mid_Gamma)
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
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 16, // 調整圖例字體大小
                    }
                }
            },
            title: {
                display: true,
                text: '腦波數據雷達圖',
                font: {
                    size: 24, // 調整標題字體大小
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        scales: {
            r: { // Chart.js v3 使用 'r' 而不是 'scale'
                beginAtZero: true,
                ticks: {
                    stepSize: 0.05, // 根據數據範圍調整步長
                    font: {
                        size: 14, // 調整刻度標籤字體大小
                    }
                },
                pointLabels: {
                    font: {
                        size: 14, // 調整點標籤字體大小
                        weight: 'bold', // 可選：使字體更粗
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // 可選：調整網格線顏色
                },
            },
        },
    };

    return (
        <div style={{ width: '450px', height: '450px' }}> {/* 設置父容器大小 */}
            <Radar data={chartData} options={options} />
        </div>
    );
};

export default BrainwaveRadarChart;
