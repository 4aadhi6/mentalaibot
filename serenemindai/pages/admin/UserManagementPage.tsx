// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Icon, { IconName } from '../../components/ui/Icon';

// interface User {
//     name: string;
//     email: string;
//     signupDate: string;
// }

// const UserManagementPage: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]);

//     useEffect(() => {
//         // Fetch users from localStorage (simulation)
//         const usersDb = JSON.parse(localStorage.getItem('usersDb') || '[]');
//         // Exclude the password field for security
//         const safeUsers = usersDb.map(({ name, email, signupDate }: any) => ({ name, email, signupDate }));
//         setUsers(safeUsers);
//     }, []);

//     const handleDeleteUser = (emailToDelete: string) => {
//         if (window.confirm(`Are you sure you want to delete the user with email: ${emailToDelete}? This will also delete all their associated data.`)) {
//             // Update component state for immediate UI feedback
//             setUsers(currentUsers => currentUsers.filter(user => user.email !== emailToDelete));

//             // Delete associated data
//             localStorage.removeItem(`chatHistory_${emailToDelete}`);
//             localStorage.removeItem(`journalEntries_${emailToDelete}`);
//             localStorage.removeItem(`moodLogs_${emailToDelete}`);

//             // Update the 'database' in localStorage
//             const usersDb = JSON.parse(localStorage.getItem('usersDb') || '[]');
//             const updatedDb = usersDb.filter((user: any) => user.email !== emailToDelete);
//             localStorage.setItem('usersDb', JSON.stringify(updatedDb));
//         }
//     };

//     return (
//         <div className="animate-fade-in-up">
//             <h1 className="text-3xl font-bold mb-8">User Management</h1>

//             <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left">
//                         <thead className="bg-gray-100 dark:bg-gray-800">
//                             <tr>
//                                 <th className="p-4 font-semibold">Name</th>
//                                 <th className="p-4 font-semibold">Email</th>
//                                 <th className="p-4 font-semibold">Signup Date</th>
//                                 <th className="p-4 font-semibold text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.length > 0 ? (
//                                 users.map((user) => (
//                                     <tr key={user.email} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
//                                         <td className="p-4 font-medium">
//                                              <Link to={`/admin/users/${encodeURIComponent(user.email)}`} className="hover:underline text-primary">
//                                                 {user.name}
//                                             </Link>
//                                         </td>
//                                         <td className="p-4">
//                                             <Link to={`/admin/users/${encodeURIComponent(user.email)}`} className="hover:underline">
//                                                 {user.email}
//                                             </Link>
//                                         </td>
//                                         <td className="p-4 text-sm text-light-subtle dark:text-dark-subtle">
//                                             {new Date(user.signupDate).toLocaleDateString()}
//                                         </td>
//                                         <td className="p-4 text-center">
//                                             <button
//                                                 onClick={(e) => {
//                                                     e.stopPropagation(); // Prevent link navigation when deleting
//                                                     handleDeleteUser(user.email)
//                                                 }}
//                                                 className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
//                                                 aria-label={`Delete user ${user.name}`}
//                                             >
//                                                 <Icon name={IconName.Trash} className="w-5 h-5" />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan={4} className="text-center p-8 text-light-subtle dark:text-dark-subtle">
//                                         No registered users found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserManagementPage;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon, { IconName } from "../../components/ui/Icon";
import { fetchApi } from "../../services/api";

// FIX: Define an interface for the User object
interface User {
  _id: string;
  name: string;
  email: string;
  signupDate: string;
}

const UserManagementPage: React.FC = () => {
  // FIX: Provide the User interface to useState
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchApi("/users", "GET");
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // FIX: Add type 'string' to the function parameter
  const handleDeleteUser = async (emailToDelete: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the user with email: ${emailToDelete}? This action is irreversible.`
      )
    ) {
      try {
        await fetchApi(`/users/${emailToDelete}`, "DELETE");
        fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            {/* Table Head */}
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Signup Date</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.email}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="p-4 font-medium">
                      <Link
                        to={`/admin/users/${encodeURIComponent(user.email)}`}
                        className="hover:underline text-primary"
                      >
                        {user.name}
                      </Link>
                    </td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4 text-sm text-light-subtle dark:text-dark-subtle">
                      {new Date(user.signupDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDeleteUser(user.email)}
                        className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
                        aria-label={`Delete user ${user.name}`}
                      >
                        <Icon name={IconName.Trash} className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center p-8 text-light-subtle dark:text-dark-subtle"
                  >
                    No registered users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
