import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Fixed from '../../components/Fixed/Fixed';
import { Outlet } from 'react-router-dom';

const MainLayoutForCus = () => {
    return (
        <>
            <Header />
            <Fixed />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayoutForCus;