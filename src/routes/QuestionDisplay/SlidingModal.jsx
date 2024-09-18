import React from 'react';

function SlidingModal({ isOpen, onClose, children }) {
    return (
        <div className={`fixed inset-0 z-50 flex ${isOpen ? '' : 'pointer-events-none'}`}>
            {/* 背景遮罩 */}
            <div
                className={`fixed inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-50 bg-black' : 'opacity-0'}`}
                onClick={onClose}
            ></div>
            {/* 右側滑出的面板 */}
            <div
                className={`ml-auto w-full max-w-md bg-white h-screen shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-700">
                    X
                </button>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default SlidingModal;
