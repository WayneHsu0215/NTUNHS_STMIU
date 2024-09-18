import React, { useEffect, useState } from 'react';
import Modal from '../lib/Modal';
import AddQuestionModal from './AddQuestionModal.jsx';
import QuestionsTable from './QuestionsTable.jsx';
import { Icon } from '@iconify/react';
import SlidingModal from './SlidingModal.jsx';
import { toast } from 'react-toastify';


function App() {
    const [selectedQuestion, setSelectedQuestion] = useState(null); // 用于存储点击的详细问题
    const [isModalOpen, setModalOpen] = useState(false); // 控制详细信息弹窗
    const [isAddModalOpen, setAddModalOpen] = useState(false); // 控制新增问题弹窗
    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState('All'); // 新增篩選狀態
    const [loading, setLoading] = useState(false); // 載入狀態

    useEffect(() => {
        // Fetch the questions data based on the current filter
        const fetchQuestions = () => {
            setLoading(true);
            let endpoint = '/api/questions'; // 預設獲取所有題目
            if (filter !== 'All') {
                endpoint = `/api/questions/${filter}`;
            }

            fetch(endpoint)
                .then(response => response.json())
                .then(data => {
                    setQuestions(data.data);
                    toast.success('資料已成功獲取', {
                        autoClose: 1000, // 2 秒後自動關閉
                    });                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    toast.error('Failed to fetch questions.');
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchQuestions();
    }, [filter]); // 當 filter 改變時重新抓取資料

    const handleOpenModal = (question) => {
        setSelectedQuestion(question); // 存储选中的问题
        setModalOpen(true); // 打开弹窗
    };

    const handleCloseModal = () => {
        setModalOpen(false); // 关闭弹窗
    };

    const handleOpenAddModal = () => {
        setAddModalOpen(true); // 打开新增資料的弹窗
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false); // 关闭新增資料的弹窗
    };

    // 删除问题
    const handleDeleteQuestion = (questionId) => {
        fetch(`/api/delete_questions/${questionId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.changes > 0) {
                    const updatedQuestions = questions.filter(q => q.ID !== questionId);
                    setQuestions(updatedQuestions);
                    console.log(`Deleted question with ID: ${questionId}`);
                    toast.success('成功刪除題目');
                } else {
                    console.error(`Failed to delete question with ID: ${questionId}`);
                    toast.error('刪除題目失敗');
                }
            })
            .catch(error => {
                console.error('Error deleting question:', error);
                toast.error('刪除題目時發生錯誤');
            });
    };

    // 處理篩選選項變更
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <div className="container w-full mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 mb-4 space-y-4 md:space-y-0">
                <h1 className="text-3xl font-bold flex items-center">
                    <Icon className="inline mr-4" icon="pajamas:question"/> 題目顯示
                </h1>

                {/* 新增篩選按鈕 */}
                <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-700">篩選：</span>
                    <button
                        className={`flex items-center px-3 py-2 rounded-lg ${
                            filter === 'All' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'
                        } hover:bg-gray-300 transition-colors duration-200`}
                        onClick={() => handleFilterChange('All')}
                    >
                        全部
                    </button>
                    <button
                        className={`flex items-center px-3 py-2 rounded-lg ${
                            filter === 'A' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'
                        } hover:bg-gray-300 transition-colors duration-200`}
                        onClick={() => handleFilterChange('A')}
                    >
                        <Icon icon="pajamas:false-positive" className="inline mr-2"/>是非題
                    </button>
                    <button
                        className={`flex items-center px-3 py-2 rounded-lg ${
                            filter === 'B' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'
                        } hover:bg-gray-300 transition-colors duration-200`}
                        onClick={() => handleFilterChange('B')}
                    >
                        <Icon icon="ant-design:select-outlined" className="inline mr-2"/>選擇題
                    </button>
                    <button
                        className={`flex items-center px-3 py-2 rounded-lg ${
                            filter === 'C' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'
                        } hover:bg-gray-300 transition-colors duration-200`}
                        onClick={() => handleFilterChange('C')}
                    >
                        <Icon icon="ri:question-answer-line" className="inline mr-2"/>問答題
                    </button>
                </div>


                <button
                    className="bg-gray-500 text-white py-2 px-4 rounded flex items-center hover:bg-gray-600 transition-colors duration-200"
                    onClick={handleOpenAddModal}
                >
                    <Icon icon="carbon:add-filled" className="mr-2"/>
                    新增資料
                </button>

            </div>

            {/* 載入指示器 */}
            {loading ? (
                <div className="flex justify-center items-center mt-8">
                    <Icon icon="mdi:loading" className="animate-spin text-4xl text-blue-500"/>
                    <span className="ml-2 text-xl text-gray-700">載入中...</span>
                </div>
            ) : (
                <QuestionsTable
                    questions={questions}
                    handleOpenModal={handleOpenModal}
                    handleDeleteQuestion={handleDeleteQuestion}
                />
            )}

            {/* 詳細資料的 Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedQuestion && (
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse border border-gray-300 w-full">
                            <thead>
                            <tr>
                                <th className="border px-4 py-2 text-left font-semibold bg-gray-100">項目</th>
                                <th className="border px-4 py-2 text-left font-semibold bg-gray-100">內容</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td className="border px-4 py-2">編號</td>
                                <td className="border px-4 py-2">{selectedQuestion.ID}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">題目</td>
                                <td className="border px-4 py-2">{selectedQuestion.Question}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">難易度</td>
                                <td className="border px-4 py-2">{selectedQuestion.category}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">類型</td>
                                <td className="border px-4 py-2">{selectedQuestion.Type}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">正確答案</td>
                                <td className="border px-4 py-2">{selectedQuestion.Answer_Correct}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">創建日期</td>
                                <td className="border px-4 py-2">{selectedQuestion.Date}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">創建時間</td>
                                <td className="border px-4 py-2">{selectedQuestion.Time}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </Modal>

            <SlidingModal isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
                <AddQuestionModal
                    onClose={handleCloseAddModal}
                    setQuestions={setQuestions}
                    questions={questions}
                />
            </SlidingModal>
        </div>
    );
}

export default App;
