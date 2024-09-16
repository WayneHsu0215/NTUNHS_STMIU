import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const MixedChart = ({ answers, answerTimes }) => {
    const labels = answers.map((answer, index) => `Q${answer.Question_num}`);

    const data = {
        labels,
        datasets: [
            {
                type: 'bar',
                label: 'ATT',
                data: answers.map(answer => answer.ATT), // ATT values
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                type: 'bar',
                label: 'MED',
                data: answers.map(answer => answer.MED), // MED values
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            },
            {
                type: 'line',
                label: '回答時間 (秒)',
                data: answerTimes.map(time => time.Answer_Time), // Answer_Time values
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
                tension: 0.4
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
                }
            }
        }
    };

    return (
        <div style={{width: '600px', height: '300px'}}> {/* 控制图表大小 */}
            <Bar data={data} options={options}/>
        </div>
    );
};

export default MixedChart;
