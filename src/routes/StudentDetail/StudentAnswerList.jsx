import React, {useState, useEffect} from 'react';
import Modal from '../lib/Modal';
import studentData from '../fake_data/student_information.json'; // 假設包含所有學生資料
import MixedChart from './MixedChart'; // 混合圖表組件
import {Icon} from '@iconify/react';
import BrainwaveRadarChart from './BrainwaveRadarChart'; // 腦波雷達圖組件
import {toast} from 'react-toastify';
import studentPhoto from '../fake_data/102214238.jpg'; // 學生照片

const ITEMS_PER_PAGE = 10; // 每頁顯示的條目數

function StudentAnswerList() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 當前頁碼
    const [answerData, setAnswerData] = useState([]); // /api/student_answer 數據
    const [predictData, setPredictData] = useState([]); // /api/predict 數據
    const [brainwaveData, setBrainwaveData] = useState([]); // /api/brainwaves 數據
    const [loading, setLoading] = useState(true); // 加載狀態
    const [error, setError] = useState(null); // 錯誤狀態
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    // 獲取 API 數據
    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch('/api/student_answer'), // 獲取答題時間數據
            fetch('/api/predict'), // 獲取 ATT 和 MED 數據
            fetch('/api/brainwaves') // 獲取腦波數據
        ])
            .then(async ([answerRes, predictRes, brainwaveRes]) => {
                if (!answerRes.ok) {
                    throw new Error('獲取答題時間數據失敗');
                }
                if (!predictRes.ok) {
                    throw new Error('獲取預測數據失敗');
                }
                if (!brainwaveRes.ok) {
                    throw new Error('獲取腦波數據失敗');
                }
                const answerJson = await answerRes.json();
                const predictJson = await predictRes.json();
                const brainwaveJson = await brainwaveRes.json();
                setAnswerData(answerJson.data);
                setPredictData(predictJson.data);
                setBrainwaveData(brainwaveJson.data);
                setLoading(false);
                console.log('Answer Data:', answerJson.data.slice(0, 5)); // 打印前 5 條答題記錄
                console.log('Predict Data:', predictJson.data.slice(0, 5)); // 打印前 5 條預測記錄
                console.log('Brainwave Data:', brainwaveJson.data.slice(0, 5)); // 打印前 5 條腦波記錄
            })
            .catch(error => {
                console.error('獲取數據時出錯:', error);
                setError(error);
                setLoading(false);
                toast.error('資料載入失敗！');
            });
    }, []);

    // 根據 Class_num 對答題數據進行分組，確保每個 Class_num 只出現一次
    const uniqueClassGroups = answerData.reduce((acc, item) => {
        if (!acc.some(group => group.Class_num === item.Class_num)) {
            acc.push(item);
        }
        return acc;
    }, []).map(group => {
        // 使用 UUID 對應學生資料
        const student = studentData.data.find(s => s.UUID === group.UUID);
        return {
            ...group,
            Name: student ? student.Name : '未知',
            gender: student ? student.gender : '未知',
            grade: student ? student.grade : '未知',
            department: student ? student.department : '未知'
        };
    });

    console.log('Unique Class Groups:', uniqueClassGroups.slice(0, 5));

    // 分頁數據處理
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = uniqueClassGroups.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(uniqueClassGroups.length / ITEMS_PER_PAGE);

    // 打開 Modal，顯示選定 Class_num 下的所有答題詳情
    const openModal = (classNum) => {
        const studentAnswers = answerData.filter(answer => answer.Class_num === classNum);
        console.log('studentAnswers:', studentAnswers); // 打印答題記錄

        if (studentAnswers.length === 0) {
            toast.error('沒有找到相關資料！');
            return;
        }
        const uuid = studentAnswers[0].UUID;
        const student = studentData.data.find(s => s.UUID === uuid);
        console.log('Found Student:', student); // 打印找到的學生資料

        if (student && studentAnswers.length > 0) {
            // 找到該班級和學生的預測數據，僅匹配 class_num
            const studentPredictData = predictData.filter(predict => predict.UUID === student.UUID && predict.Class_num === classNum);
            // 過濾該班級的腦波數據
            const classBrainwaveData = brainwaveData.filter(brainwave => brainwave.Class_num === classNum && brainwave.UUID === student.UUID);
            // 計算平均腦波數據
            const averagedBrainwaveData = classBrainwaveData.reduce((acc, curr) => {
                acc.Delta += parseFloat(curr.Delta);
                acc.Theta += parseFloat(curr.Theta);
                acc.Low_Alpha += parseFloat(curr.Low_Alpha);
                acc.High_Alpha += parseFloat(curr.High_Alpha);
                acc.Low_Beta += parseFloat(curr.Low_Beta);
                acc.High_Beta += parseFloat(curr.High_Beta);
                acc.Low_Gamma += parseFloat(curr.Low_Gamma);
                acc.Mid_Gamma += parseFloat(curr.Mid_Gamma);
                return acc;
            }, {
                Delta: 0,
                Theta: 0,
                Low_Alpha: 0,
                High_Alpha: 0,
                Low_Beta: 0,
                High_Beta: 0,
                Low_Gamma: 0,
                Mid_Gamma: 0
            });

            const count = classBrainwaveData.length;
            if (count > 0) {
                Object.keys(averagedBrainwaveData).forEach(key => {
                    averagedBrainwaveData[key] = (averagedBrainwaveData[key] / count).toFixed(3);
                });
            }

            setSelectedStudent({
                ...student,
                answers: studentAnswers,
                predictData: studentPredictData,
                brainwaveData: averagedBrainwaveData
            });
            setIsOpen(true);
            toast.success('資料載入成功！');
        } else {
            toast.error('找不到學生資料！');
        }
    };

    // 關閉 Modal
    const closeModal = () => {
        setSelectedStudent(null);
        setIsOpen(false);
    };

    // 頁面跳轉功能
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 顯示加載狀態或錯誤信息
    if (loading) {
        return <div className="text-center mt-10">加載中...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">加載數據時出錯: {error.message}</div>;
    }

    const searchList = async () => {
        if (!startDate || !endDate) {
            toast.error('請選擇日期範圍！');
            return;
        }
        console.log(startDate, endDate);

        try {
            const response = await fetch(`/api/student_answer_date?startDate=${startDate}&endDate=${endDate}`);

            if (!response.ok) {
                toast.error('查詢失敗！');
                return;
            }

            const data = await response.json();
            setAnswerData(data.data);
            setCurrentPage(1);
            toast.success('查詢成功！');
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('查詢過程中出現錯誤！');
        }
    };

    const showAllList = async () => {
        try {
            const response = await fetch('/api/student_answer');
            if (!response.ok) {
                toast.error('查詢失敗！');
                return;
            }
            const data = await response.json();
            setAnswerData(data.data);
            setCurrentPage(1);
            toast.success('查詢成功！');
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('查詢過程中出現錯誤！');
        }
    }


    return (
        <div className="overflow-x-auto px-4 sm:px-6 lg:px-8"> {/* 增加左右 padding */}
            <div className="flex justify-between items-center mt-4 mb-4">
                <h1 className="text-3xl font-bold">
                    <Icon className="inline mr-4" icon="pajamas:question"/> 學生答題紀錄
                </h1>
                <div className="flex space-x-2">

                    <form className="flex items-center space-x-2" onSubmit={(e) => {
                        e.preventDefault();
                        searchList();
                    }}>
                        <label htmlFor="startDate" className="text-lg">日期範圍：</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="開始日期"
                            className="border border-gray-300 rounded px-3 py-2"
                            required // Optional: makes the input mandatory
                        />
                        <span>~</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="最晚日期"
                            className="border border-gray-300 rounded px-3 py-2"
                            required // Optional: makes the input mandatory
                        />
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            搜尋
                        </button>
                    </form>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={() => showAllList()}>
                        顯示全部
                    </button>
                </div>

            </div>

            {/* 表格顯示部分 */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg text-center">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">班級編號</th>
                    <th className="py-2 px-4 border-b">學號 (UUID)</th>
                    <th className="py-2 px-4 border-b">日期</th>
                    <th className="py-2 px-4 border-b">操作</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map(item => (
                    <tr key={item.Class_num} className="border-t odd:bg-gray-100 hover:bg-gray-200">
                        <td className="py-2 px-4">{item.Class_num}</td>
                        <td className="py-2 px-4">{item.UUID}</td>
                        <td className="py-2 px-4">{item.Date}</td>
                        <td className="py-2 px-4 flex justify-center space-x-2">
                            <button
                                className="bg-blue-500 text-white py-1 px-3 rounded flex items-center"
                                onClick={() => openModal(item.Class_num)}
                            >
                                <Icon icon="carbon:view" className="mr-2"/>
                                查看詳情
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal 組件，顯示學生答題詳情 */}
            <Modal isOpen={isOpen} onClose={closeModal}>
                {selectedStudent && (
                    <div className="p-3 bg-white rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">
                            {selectedStudent.Name}同學 的回答記錄
                        </h2>

                        <div className="flex flex-wrap"> {/* 使用 flex 布局 */}

                            {/* 左邊部分：學生基本資料和表格 */}
                            <div className="w-full lg:w-1/2 pr-4"> {/* 左邊部分占一半寬度 */}
                                <div className="flex items-center mb-6">
                                    <img
                                        src={studentPhoto}
                                        alt={`${selectedStudent.Name} 的照片`}
                                        className="w-36 mr-20 h-45 rounded-full border-2 border-indigo-500 shadow-md"
                                    />

                                    <div className="text-lg">
                                        <p className="mb-2 text-xl">
                                            <strong>答題日期：</strong>
                                            <span className="text-blue-600">
                                                {selectedStudent.predictData[0]?.Date || 'N/A'}
                                            </span>
                                        </p>
                                        <p className="mb-2 text-xl">
                                            <strong>答題總時間：</strong>
                                            <span className="text-blue-600">
                                                {selectedStudent.answers.reduce((total, answer) => total + answer.Answer_Time, 0)} 秒
                                            </span>
                                        </p>
                                        <p className="mb-2 text-xl">
                                            <strong>答題正確率：</strong>
                                            <span className="text-blue-700 font-bold">
                                                {(
                                                    (selectedStudent.answers.filter(answer =>
                                                        answer.Correct.trim().toLowerCase() === answer.Answer.trim().toLowerCase()
                                                    ).length / selectedStudent.answers.length) * 100
                                                ).toFixed(2)}%
                                            </span>
                                        </p>
                                        <p className="mb-2 text-xl">
                                            <strong>學號 (UUID)：</strong>
                                            <span className="text-blue-600">{selectedStudent.UUID}</span>
                                        </p>
                                        <p className="mb-2 text-xl">
                                            <strong>性別：</strong>
                                            <span className="text-blue-600">{selectedStudent.gender}</span>
                                        </p>
                                        <p className="mb-2 text-xl">
                                            <strong>年級：</strong>
                                            <span className="text-blue-600">{selectedStudent.grade}</span>
                                        </p>
                                        <p className="mb-2 text-xl">
                                            <strong>系所：</strong>
                                            <span className="text-blue-600">{selectedStudent.department}</span>
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-blue-600 mt-4 mb-4">本次測驗回答問題：</h3>
                                <table className="table-auto w-full border-collapse border border-gray-300 shadow-sm">
                                    <thead>
                                    <tr className="bg-indigo-50 text-blue-600">
                                        <th className="border border-gray-300 px-4 py-2">題號</th>
                                        <th className="border border-gray-300 px-4 py-2">題目</th>
                                        <th className="border border-gray-300 px-4 py-2">回答時間 (秒)</th>
                                        <th className="border border-gray-300 px-4 py-2">正確答案</th>
                                        <th className="border border-gray-300 px-4 py-2">學生回答</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedStudent.answers.map((answer, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{answer.Question_num}</td>
                                            <td className="border border-gray-300 px-4 py-2">{answer.Question}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{answer.Answer_Time}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{answer.Correct}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">{answer.Answer}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* 右邊部分：圖表 */}
                            <div className="w-full lg:w-1/2 flex flex-col items-center">
                                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">腦波數據雷達圖</h3>
                                {selectedStudent.brainwaveData && (
                                    <div className="mx-auto">
                                        <BrainwaveRadarChart data={selectedStudent.brainwaveData}/>
                                    </div>
                                )}
                                <h3 className="text-2xl font-semibold text-indigo-600 mt-4">答題情況 (ATT, MED 與
                                    回答時間)</h3>
                                <div className="mx-auto">
                                    <MixedChart answers={selectedStudent.predictData}
                                                answerTimes={selectedStudent.answers}/>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </Modal>

            {/* 分頁控件 */}
            <div className="flex justify-between items-center mt-4 mb-6">
                <button
                    className={`py-2 px-4 rounded bg-gray-300 text-black ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <Icon icon="akar-icons:arrow-left" className="inline mr-2"/>
                    上一頁
                </button>
                <p>頁碼: {currentPage} / {totalPages}</p>
                <button
                    className={`py-2 px-4 rounded bg-gray-300 text-black ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    下一頁
                    <Icon icon="akar-icons:arrow-right" className="inline ml-2"/>
                </button>
            </div>
        </div>
    );

}

export default StudentAnswerList;
