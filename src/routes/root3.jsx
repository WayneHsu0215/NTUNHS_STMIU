import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatsChart = () => {
    const [students, setStudents] = useState([]);
    const [selectedUUID, setSelectedUUID] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [category, setCategory] = useState('');
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Fetch all distinct students for the dropdown
        fetch('/api/student_answer')
            .then(response => response.json())
            .then(data => {
                const studentList = [...new Set(data.data.map(q => q.UUID))]; // Get unique student UUIDs
                setStudents(studentList);
            });
    }, []);

    const handleFetchStats = () => {
        const params = new URLSearchParams();
        if (selectedUUID) params.append('uuid', selectedUUID);
        if (questionType) params.append('question_type', questionType);
        if (category) params.append('category', category);

        fetch(`/api/student_stats?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                const labels = Object.keys(data.data);
                const correctData = labels.map(label => data.data[label][category].correct);
                const incorrectData = labels.map(label => data.data[label][category].incorrect);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: '正確',
                            backgroundColor: 'rgba(75,192,192,0.6)',
                            data: correctData,
                        },
                        {
                            label: '錯誤',
                            backgroundColor: 'rgba(255,99,132,0.6)',
                            data: incorrectData,
                        },
                    ],
                });
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">學生成績統計</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-gray-700 mb-2">選擇學生:</label>
                    <select
                        value={selectedUUID}
                        onChange={(e) => setSelectedUUID(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">全部</option>
                        {students.map((uuid) => (
                            <option key={uuid} value={uuid}>
                                {uuid}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">選擇題目類型:</label>
                    <select
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">全部</option>
                        <option value="是非題">是非題</option>
                        <option value="選擇題">選擇題</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">選擇難易度:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">全部</option>
                        <option value="simple">簡單</option>
                        <option value="normal">普通</option>
                        <option value="difficult">困難</option>
                    </select>
                </div>
            </div>

            <button
                onClick={handleFetchStats}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-6 hover:bg-blue-700"
            >
                顯示圖表
            </button>

            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: '正確率與錯誤率統計',
                            },
                        },
                        responsive: true,
                    }}
                />
            )}
        </div>
    );
};

export default StatsChart;
