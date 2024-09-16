import React from 'react';
import { Icon } from '@iconify/react';

const ITEMS_PER_PAGE = 10; // 每页显示的条目数

function QuestionsTable({ questions, handleOpenModal, handleDeleteQuestion }) {
    const [currentPage, setCurrentPage] = React.useState(1); // 当前页码

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
        <div>
            <table className="min-w-full bg-white border border-gray-200 rounded-l-lg text-center">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b rounded-l-lg">編號</th>
                    <th className="py-2 px-4 border-b">類別編號</th>
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
                        <td className="py-2 px-4">{question.Identity}</td>
                        <td className="py-2 px-4">{question.Type}</td>
                        <td className="py-2 px-4">{question.category}</td>
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
        </div>
    );
}

export default QuestionsTable;
