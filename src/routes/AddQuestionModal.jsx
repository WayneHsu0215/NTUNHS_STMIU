import React, { useState } from 'react';
import Modal from './Modal';
import studentData from './fake_data/student_information.json';
import predictData from './fake_data/predict.json';
import answerData from './fake_data/student_answer.json';


function StudentAnswerList() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // 使用UUID過濾問題，只顯示每組問題的第一筆
    const uniqueClassGroups = predictData.data.reduce((acc, item) => {
        if (!acc.some(group => group.UUID === item.UUID)) {
            acc.push(item);
        }
        return acc;
    }, []);

    const openModal = (classID) => {
        const student = studentData.data.find(s => s.Student_ID === uniqueClassGroups[0].Student_ID);
        const answers = answerData.data.filter(a => a.UUID === classID);

        if (student && answers.length > 0) {
            setSelectedStudent({ ...student, answers });
            setIsOpen(true);
        }
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setIsOpen(false);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">學生回答記錄</h1>
            <ul>
                {uniqueClassGroups.map(item => (
                    <li key={item.UUID} className="mb-2">
                        <button
                            className="text-blue-500 underline"
                            onClick={() => openModal(item.UUID)}
                        >
                            {item.Student_ID} 回答了問題集，時間：{item.Date}
                        </button>
                    </li>
                ))}
            </ul>

            <Modal isOpen={isOpen} onClose={closeModal}>
                {selectedStudent && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">{selectedStudent.Name} 的回答記錄</h2>
                        <p><strong>學號：</strong>{selectedStudent.Student_ID}</p>
                        <p><strong>性別：</strong>{selectedStudent.gender}</p>
                        <p><strong>年級：</strong>{selectedStudent.grade}</p>
                        <p><strong>系所：</strong>{selectedStudent.department}</p>
                        <h3 className="text-lg mt-4 mb-2">回答的問題：</h3>
                        <ul>
                            {selectedStudent.answers.map((answer, index) => (
                                <li key={index} className="mb-2">
                                    <p><strong>第 {answer.Question_num} 題:</strong> {answer.Question}</p>
                                    <p><strong>回答時間：</strong> {answer.Answer_Time} 秒</p>
                                    <p><strong>正確答案：</strong> {answer.Correct}</p>
                                    <p><strong>學生回答：</strong> {answer.Answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default StudentAnswerList;

