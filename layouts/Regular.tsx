import React from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import HeaderStats from "../components/Headers/HeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";

export default function Regular({ children }){
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar />

                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
};



