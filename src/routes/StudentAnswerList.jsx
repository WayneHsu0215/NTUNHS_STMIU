import React, { useState } from 'react';
import Modal from './Modal';
import StudentTable from './StudentTable'; // 引入模块化的表格组件
import studentData from './fake_data/student_information.json';
import predictData from './fake_data/predict.json'; // 引入 predict.json
import answerData from './fake_data/student_answer.json'; // 引入 student_answer.json
import studentPhoto from './fake_data/102214230.jpg';
import arduinoData from './fake_data/Arduino.json'; // 引入 Arduino 数据

import MixedChart from './MixedChart'; // 引入 MixedChart 组件
import { Icon } from '@iconify/react';
import BrainwaveRadarChart from './BrainwaveRadarChart'; // 引入雷达图组件


const ITEMS_PER_PAGE = 10; // 每页显示的条目数

function StudentAnswerList() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 当前页码

    // 遍歷 predictData 中的每個 UUID，取出唯一 UUID 來展示
    const uniqueClassGroups = predictData.data.reduce((acc, item) => {
        if (!acc.some(group => group.UUID === item.UUID)) {
            acc.push(item);
        }
        return acc;
    }, []);


    // 分页数据处理
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = uniqueClassGroups.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(uniqueClassGroups.length / ITEMS_PER_PAGE);

    // 打开 Modal
    const openModal = (classID) => {
        const studentAnswers = answerData.data.filter(answer => answer.UUID === classID);
        const student = studentData.data.find(s => s.Student_ID === studentAnswers[0]?.Student_ID);

        if (student && studentAnswers.length > 0) {
            const studentPredictData = predictData.data.filter(predict => predict.Student_ID === student.Student_ID); // 获取学生的 predict 数据
            const studentBrainwaveData = arduinoData.data.find(brainwave => brainwave.Student === student.Student_ID); // 获取学生的脑波数据
            setSelectedStudent({ ...student, answers: studentAnswers, predictData: studentPredictData, brainwaveData: studentBrainwaveData });
            setIsOpen(true);
        }
    };

    // 关闭 Modal
    const closeModal = () => {
        setSelectedStudent(null);
        setIsOpen(false);
    };

    // 页面跳转功能
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

    return (
        <div className="overflow-x-auto px-4 sm:px-6 lg:px-8"> {/* 增加左右 padding */}

            <div className="flex justify-between items-center mt-4 mb-4">
                <h1 className="text-3xl font-bold">
                    <Icon className="inline mr-4" icon="pajamas:question" /> 學生答題紀錄
                </h1>
            </div>

            {/* 使用 StudentTable 模块化的表格组件 */}
            <StudentTable currentItems={currentItems} openModal={openModal} />

            <Modal isOpen={isOpen} onClose={closeModal}>
                {selectedStudent && (
                    <div className="p-6  bg-white rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                            {selectedStudent.Name}同學 的回答記錄
                        </h2>

                        <div className="flex flex-wrap"> {/* 使用 flex 布局 */}

                            {/* 左边部分：学生基本资料和表格 */}
                            <div className="w-full lg:w-1/2 pr-4"> {/* 左边部分占一半宽度 */}
                                <div className="flex items-center mb-6">
                                    <img
                                        src={studentPhoto}
                                        alt={`${selectedStudent.Name} 的照片`}
                                        className="w-36 h-50 rounded-full border-2 border-indigo-500 shadow-md mr-4"
                                    />
                                    <div className="text-lg">
                                        <p className="mb-2 text-2xl">
                                            <strong>學號：</strong>
                                            <span className="text-indigo-600">{selectedStudent.Student_ID}</span>
                                        </p>
                                        <p className="mb-2 text-2xl">
                                            <strong>性別：</strong>
                                            <span className="text-indigo-600">{selectedStudent.gender}</span>
                                        </p>
                                        <p className="mb-2 text-2xl">
                                            <strong>年級：</strong>
                                            <span className="text-indigo-600">{selectedStudent.grade}</span>
                                        </p>
                                        <p className="mb-2 text-2xl">
                                            <strong>系所：</strong>
                                            <span className="text-indigo-600">{selectedStudent.department}</span>
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-indigo-600 mt-4 mb-4">回答的問題：</h3>
                                <table className="table-auto w-full border-collapse border border-gray-300 shadow-sm">
                                    <thead>
                                    <tr className="bg-indigo-50 text-indigo-600">
                                        <th className="border border-gray-300 px-4 py-2">題號</th>
                                        <th className="border border-gray-300 px-4 py-2">問題</th>
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

                            {/* 右边部分：图表 */}
                            <div className="w-full lg:w-1/2 "> {/* 右边部分占一半宽度 */}
                                {selectedStudent.brainwaveData && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-indigo-600  mb-4">腦波數據雷達圖</h3>
                                        <BrainwaveRadarChart data={selectedStudent.brainwaveData} />
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold text-indigo-600 mt-4 ">答題情況 (ATT, MED 與 回答時間)</h3>
                                <MixedChart answers={selectedStudent.predictData} answerTimes={selectedStudent.answers} />


                            </div>

                        </div>
                    </div>
                )}
            </Modal>


            <div className="flex justify-between items-center mt-4 mb-6">
                <button
                    className={`py-2 px-4 rounded bg-gray-300 text-black ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <Icon icon="akar-icons:arrow-left" className="inline mr-2" />
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
