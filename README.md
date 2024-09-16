我現在提供你資料 請你－幫我做出一個網頁範本：
資料是有關學生回答問題的腦波預測。學生一次會回答十題

首先是predict.json
裡面的資料：
{
"data": [
{
"ID": 83,
"Date": "2024-09-11 16:20:25",
"Time": "16:20:25",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Question_num": 1,
"Question_type": "是非題",
"Category": "normal",
"ATT": "27.9",
"MED": "78.3"
},
{
"ID": 84,
"Date": "2024-09-11 16:20:35",
"Time": "16:20:35",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Question_num": 2,
"Question_type": "是非題",
"Category": "normal",
"ATT": "28.9",
"MED": "71.8"
},
{
"ID": 85,
"Date": "2024-09-11 16:20:48",
"Time": "16:20:48",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Question_num": 3,
"Question_type": "是非題",
"Category": "normal",
"ATT": "27.4",
"MED": "82.0"
},
{
"ID": 86,
"Date": "2024-09-11 16:20:57",
"Time": "16:20:57",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Question_num": 4,
"Question_type": "是非題",
"Category": "normal",
"ATT": "26.4",
"MED": "83.3"
},
{
"ID": 87,
"Date": "2024-09-11 16:21:04",
"Time": "16:21:04",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Question_num": 5,
"Question_type": "是非題",
"Category": "normal",
"ATT": "25.3",
"MED": "86.5"
},
{
"ID": 88,
"Date": "2024-09-11 16:21:12",
"Time": "16:21:12",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Question_num": 6,
"Question_type": "是非題",
"Category": "normal",
"ATT": "25.6",
"MED": "86.2"
},
{
"ID": 89,
"Date": "2024-09-11 16:21:18",
"Time": "16:21:18",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Question_num": 7,
"Question_type": "是非題",
"Category": "normal",
"ATT": "25.5",
"MED": "87.7"
},
{
"ID": 90,
"Date": "2024-09-11 16:21:25",
"Time": "16:21:25",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Question_num": 8,
"Question_type": "是非題",
"Category": "normal",
"ATT": "25.9",
"MED": "86.8"
},
{
"ID": 91,
"Date": "2024-09-11 16:21:45",
"Time": "16:21:45",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Question_num": 9,
"Question_type": "是非題",
"Category": "normal",
"ATT": "27.4",
"MED": "82.0"
},
{
"ID": 92,
"Date": "2024-09-11 16:21:59",
"Time": "16:21:59",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Question_num": 10,
"Question_type": "是非題",
"Category": "normal",
"ATT": "26.9",
"MED": "83.2"
}
]
}

再來是

{
"data": [
{
"ID": 71,
"Date": "2024-09-11 16:20:25",
"Time": "16:20:25",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Answer": "correct",
"Question_num": 1,
"Question": "Python 的字串是可變的（mutable）。",
"Answer_Time": 17,
"Correct": "Incorrect",
"Question_type": "是非題",
"Category": "normal"
},
{
"ID": 72,
"Date": "2024-09-11 16:20:35",
"Time": "16:20:35",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Answer": "correct",
"Question_num": 2,
"Question": "Python 支援多重繼承。 ",
"Answer_Time": 10,
"Correct": "Correct",
"Question_type": "是非題",
"Category": "normal"
},
{
"ID": 73,
"Date": "2024-09-11 16:20:48",
"Time": "16:20:48",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Answer": "incorrect",
"Question_num": 3,
"Question": "range(5) 生成的範圍是 0 到 5（包含 5）。 ",
"Answer_Time": 13,
"Correct": "Correct",
"Question_type": "是非題",
"Category": "normal"
},
{
"ID": 74,
"Date": "2024-09-11 16:20:57",
"Time": "16:20:57",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Answer": "correct",
"Question_num": 4,
"Question": "在 Python 中，字典中的鍵可以是可變的。 ",
"Answer_Time": 10,
"Correct": "Incorrect",
"Question_type": "是非題",
"Category": "normal"
},
{
"ID": 75,
"Date": "2024-09-11 16:21:04",
"Time": "16:21:04",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Answer": "correct",
"Question_num": 5,
"Question": "Python 中，import 關鍵字用於導入模組。 ",
"Answer_Time": 7,
"Correct": "Correct",
"Question_type": "是非題",
"Category": "normal"
},
{
"ID": 76,
"Date": "2024-09-11 16:21:12",
"Time": "16:21:12",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Answer": "correct",
"Question_num": 6,
"Question": "在 Python 中，def 用於定義函數。 ",
"Answer_Time": 7,
"Correct": "Correct",
"Question_type": "是非題",
"Category": "normal"
},
{
"ID": 77,
"Date": "2024-09-11 16:21:17",
"Time": "16:21:17",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Answer": "correct",
"Question_num": 7,
"Question": "Python 中的 try 和 except 塊用於異常處理。",
"Answer_Time": 6,
"Correct": "Correct",
"Question_type": "是非題",
"Category": "normal"
},
{
"ID": 78,
"Date": "2024-09-11 16:21:25",
"Time": "16:21:25",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Answer": "correct",
"Question_num": 8,
"Question": "在 Python 中，break 關鍵字用於提前結束迴圈。 ",
"Answer_Time": 8,
"Correct": "Correct",
"Question_type": "是非題",
"Category": "normal"
},
{
"ID": 79,
"Date": "2024-09-11 16:21:44",
"Time": "16:21:44",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Answer": "correct",
"Question_num": 9,
"Question": "在 Python 中，所有類型的物件都可以作為函數的參數傳遞。",
"Answer_Time": 19,
"Correct": "Correct",
"Question_type": "是非題",
"Category": "normal"
},
{
"ID": 80,
"Date": "2024-09-11 16:21:58",
"Time": "16:21:58",
"UUID": "09150418F0827",
"Student_ID": "102214230",
"Answer": "correct",
"Question_num": 10,
"Question": "在 Python 中，__init__ 是類的建構子方法。",
"Answer_Time": 14,
"Correct": "Correct",
"Question_type": "是非題",
"Category": "normal"
}
]
}

再來是student_information.json
這裡存著學生的資料：
{
"data": [
{
"ID": 1,
"Student_ID": "102214230",
"Name": "陳威廷",
"gender": "男",
"grade": "大一",
"department": "國立臺北護理健康大學資訊管理系"
}
]
}


我現在在寫React
請你協助我完成 我會先給你一個套件：
Modal.jsx：
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, children }) {
//isOpen:打開編輯，pop-up編輯視窗
//onClose:X按鈕
const [modalState, setModalState] = useState('opacity-0');

    useEffect(() => {
        if (isOpen) {
            setModalState('opacity-0');
            setTimeout(() => setModalState('opacity-100'), 10);
        } else {
            setModalState('opacity-0');
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center w-full z-50 transition-opacity duration-500 ${modalState}`}>
            <div className="absolute inset-0 bg-gray-600/20 bg-opacity-50" onClick={onClose}></div>
            <div
                className="bg-white p-8 rounded-lg relative z-10"
                style={{
                    maxHeight: '80vh',
                    overflowY: 'auto'
                }}
            >
                {children}
                <button className="absolute top-2 right-2 text-lg" onClick={onClose}>
                    ✕
                </button>
            </div>
        </div>
    );
}

Modal.propTypes = {
isOpen: PropTypes.bool.isRequired,
onClose: PropTypes.func.isRequired,
children: PropTypes.node.isRequired,
};

export default Modal;




我希望在我期望的網頁中 可以查詢區段 學生以每十題為一個群組 所以當我查到了 我會發現一筆資料顯示102214230 在某個時段回答這個問題

點開後 會跳出Modal 我可以看到這個學生的資訊以及他回答這十題的題目答案以及正確率你可以做到嗎




