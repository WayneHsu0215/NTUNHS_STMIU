import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const routes = [
    { label: '題目檢視', icon: 'quill:paper' , index: 0, path: '/' },
    { label: '學生答案資料', icon: 'ri:book-line' , index: 1, path: '/root2' },
    { label: '綜合統計查詢', icon: 'fluent:tag-search-24-regular' , index: 1, path: '/root3' },
    { label: '個別答題情形', icon: 'solar:chart-2-outline' , index: 1, path: '/root4' },
    // { label: '歷史紀錄', icon: 'eos-icons:storage-class-outlined' },
];



export function getCookie(name) {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split('; ');
    let result = null;
    cArray.forEach((val) => {
        if (val.split('=')[0] === name) {
            result = val.split('=')[1];
        }
    });
    return result;
}

const Layout = ({ children }) => {
    const [activeLink, setActiveLink] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const cu = getCookie("AccID");

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className={`${isSidebarOpen ? 'w-56' : 'w-20'} bg-gray-800 p-4 transition-width duration-300`}>
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className="mb-4 flex justify-center">
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <Icon icon="carbon:user-avatar-filled" className={`text-white ${isSidebarOpen ? 'text-7xl' : 'text-5xl'}`} />
                            </button>
                        </div>
                        {isSidebarOpen && <p className="text-center text-white text-lg">{cu}</p>}

                        <nav className="mt-5">
                            <ul>
                                {routes.map((route, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center h-10 px-3 rounded-lg mb-2 cursor-pointer transition-colors duration-200 ${
                                            activeLink === index
                                                ? 'bg-red-500 font-bold text-white'
                                                : 'bg-gray-800  hover:bg-red-500 font-bold hover:text-black text-red-600'
                                        }`}
                                        onClick={() => setActiveLink(index)}
                                    >
                                        {isSidebarOpen ?
                                            (<Link to={route.path} className="flex items-center w-full h-full text-white">
                                                    <Icon icon={route.icon} className="ml-3 text-lg" />
                                                    <span className="ml-3">{route.label}</span>
                                                </Link>
                                            ) : (
                                                <Link to={route.path} className="flex items-center w-full justify-center h-full text-white">
                                                    <Icon icon={route.icon} className="text-lg" />
                                                </Link>
                                            )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="flex flex-col items-center">
                        <button
                            className="flex items-center justify-center h-10 px-3 bg-red text-white rounded-lg hover:bg-white hover:text-black transition-colors duration-200 mb-2"
                        >
                            <Icon icon="tabler:logout" className="text-lg" />
                            {isSidebarOpen && <span className="ml-3">登出</span>}
                        </button>
                        <button
                            className="p-2 bg-white hover:bg-gray-200 h-10 px-3 rounded-full shadow"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Icon icon="icon-park-outline:nail-polish" className="text-gray-800 text-lg" />
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex flex-col flex-grow overflow-hidden">
                <main className="flex-grow overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
