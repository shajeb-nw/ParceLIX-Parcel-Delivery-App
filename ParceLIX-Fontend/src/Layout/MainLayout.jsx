import React from 'react';
import Header from '../Component/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';
import Theme from '../Utility/Theme';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header></Header>
            <div className='flex-1'><Outlet></Outlet></div>
            <Footer></Footer>
            <div className='fixed text-white bottom-2.5 p-2 rounded-md right-2.5 bg-gradient-to-r from-[#08aafb] to-[#ae0cff]'>
                <Theme></Theme>
            </div>
        </div>
    );
};

export default MainLayout;