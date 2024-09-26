import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from "@iconify/react";
import Modal from "../lib/Modal.jsx";

const AddStudent = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        UUID: '',
        Name: '',
        gender: '',
        grade: '',
        department: ''
    });
    const [isOpen, setIsOpen] = useState(false);

    // 使用 useCallback 優化效能，避免重複生成函數
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setNewStudent(prevStudent => ({
            ...prevStudent,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        fetch('/api/addStudentDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudent),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // 新增學生後刷新學生列表
                setStudents(prev => [...prev, newStudent]);
                setNewStudent({ UUID: '', Name: '', gender: '', grade: '', department: '' });
            })
            .catch(err => console.error("新增學生失敗: ", err));
        setIsOpen(false);
    }, [newStudent]);

    useEffect(() => {
        // 請求學生資料
        fetch('/api/student_details')
            .then(response => response.json())
            .then(data => setStudents(data.data))
            .catch(err => console.error("獲取學生資料失敗: ", err));
    }, []);

    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    }


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">學生資料管理</h2>
            <button className="bg-blue-500 text-white rounded p-2 mb-4"
                onClick={openModal}
            >
                新增學生資料
            </button>

            <table className="min-w-full bg-white border border-gray-200 rounded-lg text-center mt-4">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">編號</th>
                    <th className="py-2 px-4 border-b">學號 (UUID)</th>
                    <th className="py-2 px-4 border-b">姓名</th>
                    <th className="py-2 px-4 border-b">性別</th>
                    <th className="py-2 px-4 border-b">年級</th>
                    <th className="py-2 px-4 border-b">科系</th>
                </tr>
                </thead>
                <tbody>
                {students.map(item => (
                    <tr key={item.UUID} className="border-t odd:bg-gray-100 hover:bg-gray-200">
                        <td className="py-2 px-4">{item.ID}</td>
                        <td className="py-2 px-4">{item.UUID}</td>
                        <td className="py-2 px-4">{item.Name}</td>
                        <td className="py-2 px-4">{item.gender}</td>
                        <td className="py-2 px-4">{item.grade}</td>
                        <td className="py-2 px-4">{item.department}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="border-4 border-blue-400 p-5 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 text-blue-500">新增學生資料</h3>
                    <label>學號 (UUID):</label>
                    <input
                        type="text"
                        name="UUID"
                        value={newStudent.UUID}
                        required
                        onChange={handleInputChange}
                        className="border border-gray-200 rounded-lg p-2 w-full mb-4"
                    />
                    <label>姓名:</label>
                    <input
                        type="text"
                        name="Name"
                        value={newStudent.Name}
                        required
                        onChange={handleInputChange}
                        className="border border-gray-200 rounded-lg p-2 w-full mb-4"
                    />
                    <label>性別:</label>
                    <select
                        name="gender"
                        value={newStudent.gender}
                        onChange={handleInputChange}
                        className="border border-gray-200 rounded-lg p-2 w-full mb-4"
                    >
                        <option value="" disabled>選擇性別</option>
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                    <label>年級:</label>
                    <select
                        name="grade"
                        value={newStudent.grade}
                        onChange={handleInputChange}
                        className="border border-gray-200 rounded-lg p-2 w-full mb-4"
                    >
                        <option value="" disabled>選擇年級</option>
                        <option value="1">一年級</option>
                        <option value="2">二年級</option>
                        <option value="3">三年級</option>
                        <option value="4">四年級</option>
                    </select>
                    <label>科系:</label>
                    <input
                        type="text"
                        name="department"
                        value={newStudent.department}
                        required
                        onChange={handleInputChange}
                        className="border border-gray-200 rounded-lg p-2 w-full mb-4"
                    />
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 text-white rounded p-2">新增學生</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddStudent;
