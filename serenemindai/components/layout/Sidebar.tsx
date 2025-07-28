// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Icon, { IconName } from '../ui/Icon';

// interface SidebarProps {
//     isOpen: boolean;
//     setOpen: (isOpen: boolean) => void;
// }

// interface NavItemProps {
//   to: string;
//   icon: IconName;
//   label: string;
//   onClick?: () => void;
// }

// const NavItem: React.FC<NavItemProps> = ({ to, icon, label, onClick }) => {
//     const commonClasses = "flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors";
//     const activeClasses = "bg-primary text-white";
//     const inactiveClasses = "text-light-subtle dark:text-dark-subtle hover:bg-gray-200 dark:hover:bg-gray-700";

//     return (
//         <NavLink
//             to={to}
//             onClick={onClick}
//             className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
//         >
//             <Icon name={icon} className="w-6 h-6 mr-4" />
//             <span>{label}</span>
//         </NavLink>
//     );
// };

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, setOpen }) => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   const sidebarContent = (
//     <>
//         <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center space-x-3">
//                 <Icon name={IconName.Logo} className="w-8 h-8 text-primary"/>
//                 <span className="text-xl font-bold text-light-text dark:text-dark-text">SereneMind</span>
//             </div>
//             <button onClick={() => setOpen(false)} className="md:hidden text-light-subtle dark:text-dark-subtle">
//                 <Icon name={IconName.Close} className="w-6 h-6" />
//             </button>
//         </div>

//         <div className="flex-1 p-4 space-y-2">
//             <NavItem to="/app/chat" icon={IconName.Chat} label="Chat" onClick={() => setOpen(false)}/>
//             <NavItem to="/app/journal" icon={IconName.Journal} label="Journal" onClick={() => setOpen(false)}/>
//             <NavItem to="/app/analytics" icon={IconName.Analytics} label="Analytics" onClick={() => setOpen(false)}/>
//             <NavItem to="/app/resources" icon={IconName.Resources} label="Resources" onClick={() => setOpen(false)}/>
//         </div>

//         <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//              <div className="flex items-center mb-4">
//                 <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-3">
//                     {user.name ? user.name.charAt(0).toUpperCase() : 'G'}
//                 </div>
//                 <div>
//                     <p className="font-semibold text-light-text dark:text-dark-text">{user.name || 'Guest User'}</p>
//                     <p className="text-sm text-light-subtle dark:text-dark-subtle">{user.email || ''}</p>
//                 </div>
//             </div>
//             <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors text-light-subtle dark:text-dark-subtle hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//                 <Icon name={IconName.Logout} className="w-6 h-6 mr-4"/>
//                 <span>Logout</span>
//             </button>
//         </div>
//     </>
//   );

//   return (
//     <>
//       {/* Mobile overlay */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//         onClick={() => setOpen(false)}
//       ></div>

//       {/* Sidebar */}
//       <aside className={`fixed top-0 left-0 w-72 h-full bg-light-card dark:bg-dark-card shadow-lg flex flex-col z-40 transform transition-transform md:relative md:w-72 md:translate-x-0 md:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         {sidebarContent}
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon, { IconName } from "../ui/Icon";

interface SidebarProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface NavItemProps {
  to: string;
  icon: IconName;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, onClick }) => {
  const commonClasses =
    "flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors";
  const activeClasses = "bg-primary text-white";
  const inactiveClasses =
    "text-light-subtle dark:text-dark-subtle hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      <Icon name={icon} className="w-6 h-6 mr-4" />
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setOpen }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Icon name={IconName.Logo} className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-light-text dark:text-dark-text">
            SereneMind
          </span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="md:hidden text-light-subtle dark:text-dark-subtle"
        >
          <Icon name={IconName.Close} className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-2">
        <NavItem
          to="/app/chat"
          icon={IconName.Chat}
          label="Chat"
          onClick={() => setOpen(false)}
        />
        <NavItem
          to="/app/journal"
          icon={IconName.Journal}
          label="Journal"
          onClick={() => setOpen(false)}
        />
        <NavItem
          to="/app/analytics"
          icon={IconName.Analytics}
          label="Analytics"
          onClick={() => setOpen(false)}
        />
        <NavItem
          to="/app/resources"
          icon={IconName.Resources}
          label="Resources"
          onClick={() => setOpen(false)}
        />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-3">
            {user.name ? user.name.charAt(0).toUpperCase() : "G"}
          </div>
          <div>
            <p className="font-semibold text-light-text dark:text-dark-text">
              {user.name || "Guest User"}
            </p>
            <p className="text-sm text-light-subtle dark:text-dark-subtle">
              {user.email || ""}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors text-light-subtle dark:text-dark-subtle hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Icon name={IconName.Logout} className="w-6 h-6 mr-4" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-72 h-full bg-light-card dark:bg-dark-card shadow-lg flex flex-col z-40 transform transition-transform md:relative md:w-72 md:translate-x-0 md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
