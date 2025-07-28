// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Icon, { IconName } from '../ui/Icon';

// interface NavItemProps {
//   to: string;
//   icon: IconName;
//   label: string;
// }

// const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
//     const commonClasses = "flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors";
//     const activeClasses = "bg-primary text-white";
//     const inactiveClasses = "text-light-subtle dark:text-dark-subtle hover:bg-gray-200 dark:hover:bg-gray-700";

//     return (
//         <NavLink
//             to={to}
//             className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
//         >
//             <Icon name={icon} className="w-6 h-6 mr-4" />
//             <span>{label}</span>
//         </NavLink>
//     );
// };

// const AdminSidebar: React.FC = () => {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   return (
//     <aside className="w-72 bg-light-card dark:bg-dark-card shadow-lg flex-col z-10 hidden md:flex">
//         <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700 h-[69px]">
//             <div className="flex items-center space-x-3">
//                 <Icon name={IconName.Logo} className="w-8 h-8 text-primary"/>
//                 <span className="text-xl font-bold text-light-text dark:text-dark-text">SereneMind</span>
//                 <span className="px-2 py-1 text-xs font-semibold text-accent bg-accent/20 rounded-full">Admin</span>
//             </div>
//         </div>

//         <div className="flex-1 p-4 space-y-2">
//             <NavItem to="/admin/dashboard" icon={IconName.Dashboard} label="Dashboard" />
//             <NavItem to="/admin/users" icon={IconName.Users} label="User Management" />
//             <NavItem to="/admin/content" icon={IconName.Content} label="Content" />
//             <NavItem to="/admin/flags" icon={IconName.Flag} label="Flagged Content" />
//         </div>

//         <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//              <div className="flex items-center">
//                 <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-3">
//                     A
//                 </div>
//                 <div>
//                     <p className="font-semibold text-light-text dark:text-dark-text">{user.name || 'Admin'}</p>
//                     <p className="text-sm text-light-subtle dark:text-dark-subtle">{user.email || ''}</p>
//                 </div>
//             </div>
//         </div>
//     </aside>
//   );
// };

// export default AdminSidebar;
import React from "react";
import { NavLink } from "react-router-dom";
import Icon, { IconName } from "../ui/Icon";

interface NavItemProps {
  to: string;
  icon: IconName;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  const commonClasses =
    "flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors";
  const activeClasses = "bg-primary text-white";
  const inactiveClasses =
    "text-light-subtle dark:text-dark-subtle hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      <Icon name={icon} className="w-6 h-6 mr-4" />
      <span>{label}</span>
    </NavLink>
  );
};

const AdminSidebar: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <aside className="w-72 bg-light-card dark:bg-dark-card shadow-lg flex-col z-10 hidden md:flex">
      <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700 h-[69px]">
        <div className="flex items-center space-x-3">
          <Icon name={IconName.Logo} className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-light-text dark:text-dark-text">
            SereneMind
          </span>
          <span className="px-2 py-1 text-xs font-semibold text-accent bg-accent/20 rounded-full">
            Admin
          </span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-2">
        <NavItem
          to="/admin/dashboard"
          icon={IconName.Dashboard}
          label="Dashboard"
        />
        <NavItem
          to="/admin/users"
          icon={IconName.Users}
          label="User Management"
        />
        <NavItem to="/admin/content" icon={IconName.Content} label="Content" />
        <NavItem
          to="/admin/flags"
          icon={IconName.Flag}
          label="Flagged Content"
        />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-3">
            {user.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <p className="font-semibold text-light-text dark:text-dark-text">
              {user.name || "Admin"}
            </p>
            <p className="text-sm text-light-subtle dark:text-dark-subtle">
              {user.email || ""}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
