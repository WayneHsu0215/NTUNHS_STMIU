import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Header from './Header';
import { Icon } from '@iconify/react';

const ITEMS_PER_PAGE = 10; // 每页显示的条目数

function App() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null); // 用于存储点击的详细问题
    const [isModalOpen, setModalOpen] = useState(false); // 控制弹窗显示状态
    const [currentPage, setCurrentPage] = useState(1); // 当前页码

    useEffect(() => {
        // Fetch the questions data
        fetch('/api/questions')
            .then(response => response.json())
            .then(data => setQuestions(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleOpenModal = (question) => {
        setSelectedQuestion(question); // 存储选中的问题
        setModalOpen(true); // 打开弹窗
    };

    const handleCloseModal = () => {
        setModalOpen(false); // 关闭弹窗
    };

    const handleDeleteQuestion = (questionId) => {
        // 处理删除问题的逻辑
        const updatedQuestions = questions.filter(q => q.ID !== questionId);
        setQuestions(updatedQuestions);
        console.log(`Deleted question with ID: ${questionId}`);
    };

    // 计算分页数据
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

    // 页面数量
    const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);

    // 上一页
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 下一页
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container w-full mx-auto ">
            <div className="flex justify-between items-center mt-4 mb-4">
                <h1 className="text-3xl font-bold">
                    <Icon className="inline mr-4" icon="pajamas:question" />題目顯示
                </h1>
                <div className="flex space-x-4">
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded flex items-center"
                        onClick={() => console.log('新增資料')}
                    >
                        <Icon icon="carbon:add-filled" className="mr-2" />
                        新增資料
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
                        onClick={() => console.log('查詢資料')}
                    >
                        <Icon icon="carbon:search" className="mr-2" />
                        查詢資料
                    </button>
                </div>
            </div>

            <table className="min-w-full bg-white border border-gray-200 rounded-l-lg text-center">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b rounded-l-lg">編號</th>
                        <th className="py-2 px-4 border-b">題目類型</th>
                        <th className="py-2 px-4 border-b">難易度</th>
                        <th className="py-2 px-4 border-b">正確答案</th>
                        <th className="py-2 px-4 border-b">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((question) => (
                        <tr key={question.ID} className="border-t odd:bg-gray-100 hover:bg-gray-200">
                            <td className="py-2 px-4">{question.ID}</td>
                            <td className="py-2 px-4">{question.Type}</td>
                            <td className="py-2 px-4">{question.Category}</td>
                            <td className="py-2 px-4">{question.Answer_Correct}</td>
                            <td className="py-2 px-4 flex justify-center space-x-2">
                                <button
                                    className="bg-blue-500 text-white py-1 px-3 rounded flex items-center"
                                    onClick={() => handleOpenModal(question)}
                                >
                                    <Icon icon="carbon:view" className="mr-2" />
                                    詳細資料
                                </button>
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded flex items-center"
                                    onClick={() => handleDeleteQuestion(question.ID)}
                                >
                                    <Icon icon="material-symbols:delete" className="mr-2" />
                                    刪除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="flex justify-between items-center mt-4">
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

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedQuestion && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">編號: {selectedQuestion.ID}</h2>
                        <p><strong>題目:</strong> {selectedQuestion.Question}</p>
                        <p><strong>難易度:</strong> {selectedQuestion.Category}</p>
                        <p><strong>類型:</strong> {selectedQuestion.Type}</p>
                        <p><strong>正確答案:</strong> {selectedQuestion.Answer_Correct}</p>
                        <p><strong>創建日期:</strong> {selectedQuestion.Date}</p>
                        <p><strong>創建時間:</strong> {selectedQuestion.Time}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default App;
