// Header.jsx
import React from 'react';
import logo from './logo.png';

const Header = () => {
    return (
        <header className="bg-[#F8B567] p-2 w-full" style={{position: "sticky", top: 0}}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="z-10"/>
                </div>
            </div>
        </header>
    );
};

export default Header;
