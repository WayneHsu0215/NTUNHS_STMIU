import React from 'react';
import {Bar} from 'react-chartjs-2';
import LOGO1 from './lolo.png';
import LOGO from './ICON.png';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HomePage = () => {
    // 假數據，用於圖表顯示
    const data = {
        labels: ['學生A', '學生B', '學生C', '學生D', '學生E'],
        datasets: [
            {
                label: '正確答題數',
                data: [8, 9, 7, 10, 8], // 假設的正確答題數據
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: '錯誤答題數',
                data: [2, 1, 3, 0, 2], // 假設的錯誤答題數據
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '學生答題表現',
            },
        },
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header 部分 */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={LOGO1} alt="描述圖片" className="inline w-20 h-auto"/>
                        <h1 className="text-3xl font-bold text-indigo-600 ml-4">靈智答人問答分析系統</h1>
                    </div>

                    <nav>
                        <ul className="flex space-x-6">
                            <li><a href="#home" className="text-gray-600 hover:text-indigo-600">首頁</a></li>
                            <li><a href="#features" className="text-gray-600 hover:text-indigo-600">答題記錄</a></li>
                            <li><a href="#about" className="text-gray-600 hover:text-indigo-600">關於我們</a></li>
                            <li><a href="#contact" className="text-gray-600 hover:text-indigo-600">聯絡我們</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero 部分 */}
            <section className="bg-indigo-600 text-white py-20" id="home">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">歡迎來到靈智答人問答分析系統</h2>
                    <p className="text-xl mb-8">我們的系統能幫助您追蹤學生的答題表現與數據分析。</p>
                    <a
                        href="/login"
                        className="bg-white mr-4 text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        進入老師端
                    </a>
                    <a
                        href="#features"
                        className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100"
                    >
                        進入學生端
                    </a>
                </div>
            </section>

            {/* 主要功能部分 */}
            <section className="py-16" id="features">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-8">主要功能</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 左邊：文字描述 */}
                        <div className="bg-white shadow-lg p-6 rounded-lg">
                            <h4 className="text-2xl font-bold text-indigo-600 mb-4">即時答題數據</h4>
                            <p className="text-2xl">學生的每次答題數據即時更新，讓您了解他們的學習進度。</p>
                            <img src={LOGO} alt="描述圖片" className="inline w-80 mt-2 h-auto"/>
                        </div>

                        {/* 右邊：圖表展示 */}
                        <div className="bg-white shadow-lg p-6 rounded-lg">
                            <h4 className="text-2xl font-bold text-indigo-600 mb-4">答題表現圖表</h4>
                            <Bar data={data} options={options}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-indigo-600 text-white py-16" id="contact">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-8">聯絡我們</h3>
                    <p className="text-lg mb-4">如有任何疑問或建議，歡迎通過以下方式聯絡我們，我們來自國立臺北護理健康大學：</p>
                    <p className="text-lg font-bold">Email: 102214230@ntunhs.edu.tw</p>
                </div>
            </section>
            {/* Footer 部分 */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 NTUNHS LinLab. 版權所有.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
