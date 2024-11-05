import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom'; // Outlet để hiển thị các route con

const MainLayout = () => {
    return (
        <>
            <Header />
            <SideBar />
            <Outlet />
        </>
    );
};

export default MainLayout;