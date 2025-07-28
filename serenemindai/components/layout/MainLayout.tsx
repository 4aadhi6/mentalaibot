import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Icon, { IconName } from '../ui/Icon';
import ThemeToggle from '../ui/ThemeToggle';

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans">
            <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between md:justify-end items-center p-4 shadow-md bg-light-card dark:bg-dark-card md:bg-transparent md:dark:bg-transparent md:shadow-none">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-light-subtle dark:text-dark-subtle">
                        <Icon name={IconName.Menu} className="w-6 h-6" />
                    </button>
                    <ThemeToggle />
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="p-4 sm:p-6 md:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
