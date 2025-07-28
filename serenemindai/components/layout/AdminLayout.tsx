// import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import AdminSidebar from './AdminSidebar';
// import Icon, { IconName } from '../ui/Icon';
// import ThemeToggle from '../ui/ThemeToggle';

// const AdminLayout: React.FC = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('adminAuthToken');
//         localStorage.removeItem('user');
//         navigate('/login');
//     };

//     return (
//         <div className="flex h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans">
//             <AdminSidebar />
//             <div className="flex-1 flex flex-col overflow-hidden">
//                 <header className="flex justify-between items-center p-4 shadow-md bg-light-card dark:bg-dark-card">
//                     <h1 className="text-xl font-bold">Admin Panel</h1>
//                     <div className="flex items-center gap-4">
//                         <ThemeToggle />
//                         <button
//                             onClick={handleLogout}
//                             className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-light-subtle dark:text-dark-subtle hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition-colors"
//                         >
//                            <Icon name={IconName.Logout} className="w-5 h-5"/>
//                            <span>Logout</span>
//                         </button>
//                     </div>
//                 </header>
//                 <main className="flex-1 overflow-x-hidden overflow-y-auto">
//                     <div className="p-4 sm:p-6 md:p-8">
//                         <Outlet />
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Icon, { IconName } from "../ui/Icon";
import ThemeToggle from "../ui/ThemeToggle";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 shadow-md bg-light-card dark:bg-dark-card">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-light-subtle dark:text-dark-subtle hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <Icon name={IconName.Logout} className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
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

export default AdminLayout;
