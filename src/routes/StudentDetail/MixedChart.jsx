import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Chart } from 'react-chartjs-2'; // 使用 Chart 組件來處理混合圖表

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MixedChart = ({ answers, answerTimes }) => {
    // 確保 answers 和 answerTimes 都是數組並根據 Question_num 排序
    const sortedAnswers = answers.slice().sort((a, b) => a.Question_num - b.Question_num);
    const sortedAnswerTimes = answerTimes.slice().sort((a, b) => a.Question_num - b.Question_num);

    // 使用題號作為標籤
    const labels = sortedAnswers.map(answer => `Q${answer.Question_num}`);

    // 確保 ATT 和 MED 是數字類型
    const attData = sortedAnswers.map(answer => parseFloat(answer.ATT));
    const medData = sortedAnswers.map(answer => parseFloat(answer.MED));
    const answerTimeData = sortedAnswerTimes.map(answer => answer.Answer_Time);

    // 計算所有數據的最大值，以設置 Y 軸的上限
    const allData = [...attData, ...medData, ...answerTimeData];
    const maxDataValue = Math.max(...allData);
    const yAxisMax = Math.ceil(maxDataValue / 10) * 10; // 將最大值向上取整到最接近的 10

    const data = {
        labels,
        datasets: [
            {
                type: 'bar',
                label: 'ATT',
                data: attData,
                backgroundColor: 'rgba(75, 192, 192, 0.1)', // 透明度調低
                borderColor: 'rgba(75, 192, 192, 0.6)', // 柔和的邊框顏色
                borderWidth: 1, // 邊框粗細調整
            },
            {
                type: 'bar',
                label: 'MED',
                data: medData,
                backgroundColor: 'rgba(255, 159, 64, 0.1)', // 透明度調低
                borderColor: 'rgba(255, 159, 64, 0.6)', // 柔和的邊框顏色
                borderWidth: 1, // 邊框粗細調整
            },
            {
                type: 'line',
                label: '回答時間 (秒)',
                data: answerTimeData,
                borderColor: 'rgba(54, 162, 235, 0.6)', // 調整線條顏色的透明度
                backgroundColor: 'rgba(54, 162, 235, 0.1)', // 更柔和的線條背景
                fill: false,
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '答題情況 (ATT, MED 與 回答時間)',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '題號',
                }
            },
            y: {
                title: {
                    display: true,
                    text: '值',
                },
                beginAtZero: true,
                min: 0,
                max: 100, // 手動設置 Y 軸的最大值為 40
                ticks: {
                    stepSize: 10, // 設置步長為 10
                },
                grid: {
                    drawOnChartArea: true, // 在圖表區域繪製網格線
                },
            },
        },
    };

    return (

        <div style={{ width: '200%', height: '400px' }}> {/* 控制圖表大小，使用百分比更具響應性 */}
            <Chart type='bar' data={data} options={options} />
        </div>
    );
};

export default MixedChart;
