import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import "../index.css"

function Layout() {
    return (
        <>
            <Header />
            <div className="Main">
                <Outlet /> {/* This renders the current page */}
            </div>
            <Footer />
        </>
    );
}

export default Layout;
