import React from 'react';
import { Icon } from '@iconify/react';

const StudentTable = ({ currentItems, openModal }) => {
    return (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-center">
            <thead>
            <tr>
                <th className="py-2 px-4 border-b">學號</th>
                <th className="py-2 px-4 border-b">日期</th>
                <th className="py-2 px-4 border-b">操作</th>
            </tr>
            </thead>
            <tbody>
            {currentItems.map(item => (
                <tr key={item.UUID} className="border-t odd:bg-gray-100 hover:bg-gray-200">
                    <td className="py-2 px-4">{item.Student_ID}</td>
                    <td className="py-2 px-4">{item.Date}</td>
                    <td className="py-2 px-4 flex justify-center space-x-2">
                        <button
                            className="bg-blue-500 text-white py-1 px-3 rounded flex items-center"
                            onClick={() => openModal(item.UUID)}
                        >
                            <Icon icon="carbon:view" className="mr-2" />
                            查看詳情
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default StudentTable;
