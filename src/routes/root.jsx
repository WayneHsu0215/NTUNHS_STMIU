import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import AddQuestionModal from './AddQuestionModal.jsx';
import QuestionsTable from './QuestionsTable.jsx';
import { Icon } from '@iconify/react';
import SlidingModal from './SlidingModal.jsx';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 10; // 每页显示的条目数

function App() {
    const [selectedQuestion, setSelectedQuestion] = useState(null); // 用于存储点击的详细问题
    const [isModalOpen, setModalOpen] = useState(false); // 控制详细信息弹窗
    const [isAddModalOpen, setAddModalOpen] = useState(false); // 控制新增问题弹窗
    const [questions, setQuestions] = useState([]);
    const [fetched, setFetched] = useState(false); // 用来标记数据是否已成功获取

    useEffect(() => {
        // Fetch the questions data
        if (!fetched) {
            fetch('/api/questions')
                .then(response => response.json())
                .then(data => {
                    setQuestions(data.data);
                    setFetched(true); // 设置数据已获取标志
                    toast.success('歡迎來到查詢介面');
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    toast.error('Failed to fetch questions.');
                });
        }
    }, [fetched]); // 添加 fetched 依赖，确保只在数据未获取时调用

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
                } else {
                    console.error(`Failed to delete question with ID: ${questionId}`);
                }
            })
            .catch(error => console.error('Error deleting question:', error));
    };

    return (
        <div className="container w-full mx-auto">
            <div className="flex justify-between items-center mt-4 mb-4">
                <h1 className="text-3xl font-bold">
                    <Icon className="inline mr-4" icon="pajamas:question" /> 題目顯示
                </h1>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded flex items-center"
                    onClick={handleOpenAddModal}
                >
                    <Icon icon="carbon:add-filled" className="mr-2" />
                    新增資料
                </button>
            </div>

            <QuestionsTable
                questions={questions}
                handleOpenModal={handleOpenModal}
                handleDeleteQuestion={handleDeleteQuestion}
            />

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
