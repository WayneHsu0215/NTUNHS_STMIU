import React, { useState } from 'react';

function AddQuestionModal({ onClose, setQuestions, questions }) {
    const [newQuestion, setNewQuestion] = useState({
        Question: '',
        Type: '是非題',
        category: 'simple',
        Answer_Correct: '',
        Identity: ''
    });

    // 處理表單變更
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewQuestion(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 獲取當前的日期和時間
    const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0]; // 取得 YYYY-MM-DD 部分
        const time = now.toTimeString().split(' ')[0]; // 取得 HH:MM:SS 部分
        const dateTime = `${date} ${time}`; // 合併成 YYYY-MM-DD HH:MM:SS 格式
        return dateTime;
    };


    // 提交新問題
    const handleAddQuestion = () => {
        const dateTime = getCurrentDateTime(); // 获取 YYYY-MM-DD HH:MM:SS 格式的当前日期和时间

        // 新問題加入當前日期和時間
        const questionToSubmit = {
            ...newQuestion,
            Date: dateTime, // 将日期时间赋给 Date 字段
            Time: dateTime.split(' ')[1], // Time 字段保存时间部分
        };

        fetch('/api/add_question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionToSubmit)
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    setQuestions([...questions, { ...questionToSubmit, ID: data.id }]);
                    onClose(); // 關閉 Modal
                } else {
                    console.error('Failed to add question');
                }
            })
            .catch(error => console.error('Error adding question:', error));
    };
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">新增問題</h2>
            <form>
                {/* 題目 */}
                <div className="mb-4">
                    <label className="block text-gray-700">題目:</label>
                    <input
                        type="text"
                        name="Question"
                        value={newQuestion.Question}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                {/* 類型 */}
                <div className="mb-4">
                    <label className="block text-gray-700">類型:</label>
                    <select
                        name="Type"
                        value={newQuestion.Type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="是非題">是非題</option>
                        <option value="選擇題">選擇題</option>
                        <option value="問答題">問答題</option>
                    </select>
                </div>
                {/* 難易度 */}
                <div className="mb-4">
                    <label className="block text-gray-700">難易度:</label>
                    <select
                        name="category"
                        value={newQuestion.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="simple">simple</option>
                        <option value="normal">normal</option>
                        <option value="difficult">difficult</option>
                    </select>
                </div>
                {/* 正確答案 */}
                {newQuestion.Type !== '問答題' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">正確答案:</label>
                        <input
                            type="text"
                            name="Answer_Correct"
                            value={newQuestion.Answer_Correct}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                )}
                {/* 類別編號 */}
                <div className="mb-4">
                    <label className="block text-gray-700">類別編號 (Identity):</label>
                    <input
                        type="text"
                        name="Identity"
                        value={newQuestion.Identity}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                {/* 提交按鈕 */}
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        提交
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddQuestionModal;
