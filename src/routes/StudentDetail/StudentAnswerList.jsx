import React, { useState, useEffect } from 'react';
import Modal from '../lib/Modal';
import studentData from '../fake_data/student_information.json'; // 假設包含所有學生資料
import predictData from '../fake_data/predict.json'; // 假設包含預測數據
import arduinoData from '../fake_data/Arduino.json'; // 假設包含腦波數據
import MixedChart from './MixedChart'; // 假設是一個混合圖表組件
import { Icon } from '@iconify/react';
import BrainwaveRadarChart from './BrainwaveRadarChart'; // 假設是腦波雷達圖組件
import { toast } from 'react-toastify';
import studentPhoto from '../fake_data/102214238.jpg'; // 假設是學生照片

const ITEMS_PER_PAGE = 10; // 每頁顯示的條目數

function StudentAnswerList() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 當前頁碼
    const [answerData, setAnswerData] = useState([]); // 狀態存儲 API 數據
    const [loading, setLoading] = useState(true); // 加載狀態
    const [error, setError] = useState(null); // 錯誤狀態

    // 獲取 API 數據
    useEffect(() => {
        fetch('/api/student_answer') // 假設 API 路徑為 /api/student_answer
            .then(response => {
                if (!response.ok) {
                    throw new Error('網絡響應不是 OK');
                }
                return response.json();
            })
            .then(data => {
                setAnswerData(data.data); // 假設 API 返回的數據在 data.data
                setLoading(false);
                console.log('Answer Data:', data.data.slice(0, 5)); // 打印前 5 條答題記錄
                console.log('Student Data:', studentData.data.slice(0, 5)); // 打印前 5 條學生記錄
            })
            .catch(error => {
                console.error('獲取數據時出錯:', error);
                setError(error);
                setLoading(false);
                toast.error('資料載入失敗！');
            });
    }, []);

    // 根據 Class_num 對數據進行分組，確保每個 Class_num 只出現一次
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
            const studentPredictData = predictData.data.filter(predict => predict.UUID === student.UUID); // 假設 predictData 使用 UUID
            const studentBrainwaveData = arduinoData.data.find(brainwave => brainwave.UUID === student.UUID); // 假設 arduinoData 使用 UUID
            setSelectedStudent({
                ...student,
                answers: studentAnswers,
                predictData: studentPredictData,
                brainwaveData: studentBrainwaveData
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

    return (
        <div className="overflow-x-auto px-4 sm:px-6 lg:px-8"> {/* 增加左右 padding */}

            <div className="flex justify-between items-center mt-4 mb-4">
                <h1 className="text-3xl font-bold">
                    <Icon className="inline mr-4" icon="pajamas:question"/> 學生答題紀錄
                </h1>
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
                                <Icon icon="carbon:view" className="mr-2" />
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
                    <Icon icon="akar-icons:arrow-right" className="inline ml-2" />
                </button>
            </div>
        </div>
    );
}

export default StudentAnswerList;
