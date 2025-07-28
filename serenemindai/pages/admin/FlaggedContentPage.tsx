// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FlaggedContent } from '../../types';
// import Icon, { IconName } from '../../components/ui/Icon';

// const FlaggedContentPage: React.FC = () => {
//     const [flags, setFlags] = useState<FlaggedContent[]>([]);

//     useEffect(() => {
//         const savedFlags = JSON.parse(localStorage.getItem('flaggedContent') || '[]');
//         setFlags(savedFlags.sort((a: FlaggedContent, b: FlaggedContent) => new Date(b.date).getTime() - new Date(a.date).getTime()));
//     }, []);

//     const handleResolveFlag = (flagId: string) => {
//         if (window.confirm("Are you sure you want to resolve this flag? It will be removed from this list.")) {
//             const updatedFlags = flags.filter(flag => flag.id !== flagId);
//             setFlags(updatedFlags);
//             localStorage.setItem('flaggedContent', JSON.stringify(updatedFlags));
//         }
//     };

//     return (
//         <div className="animate-fade-in-up">
//             <h1 className="text-3xl font-bold mb-2">Flagged Content</h1>
//             <p className="text-light-subtle dark:text-dark-subtle mb-8">Review content automatically flagged by the system for sensitive keywords.</p>

//             <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left">
//                         <thead className="bg-gray-100 dark:bg-gray-800">
//                             <tr>
//                                 <th className="p-4 font-semibold">User</th>
//                                 <th className="p-4 font-semibold">Type</th>
//                                 <th className="p-4 font-semibold">Content</th>
//                                 <th className="p-4 font-semibold">Date</th>
//                                 <th className="p-4 font-semibold text-right">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {flags.length > 0 ? (
//                                 flags.map((flag) => (
//                                     <tr key={flag.id} className="border-t border-gray-200 dark:border-gray-700">
//                                         <td className="p-4">
//                                             <Link to={`/admin/users/${encodeURIComponent(flag.userEmail)}`} className="hover:underline text-primary">
//                                                 {flag.userEmail}
//                                             </Link>
//                                         </td>
//                                         <td className="p-4">
//                                             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${flag.type === 'Chat' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}`}>
//                                                 {flag.type}
//                                             </span>
//                                         </td>
//                                         <td className="p-4 max-w-sm">
//                                             <p className="italic truncate text-light-subtle dark:text-dark-subtle">"{flag.content}"</p>
//                                         </td>
//                                         <td className="p-4 text-sm text-light-subtle dark:text-dark-subtle">
//                                             {new Date(flag.date).toLocaleString()}
//                                         </td>
//                                         <td className="p-4 text-right">
//                                             <button
//                                                 onClick={() => handleResolveFlag(flag.id)}
//                                                 className="flex items-center justify-end ml-auto text-secondary hover:text-green-700 dark:hover:text-green-400 font-medium transition-colors"
//                                                 aria-label={`Resolve flag for ${flag.userEmail}`}
//                                             >
//                                                 <span>Resolve</span>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan={5} className="text-center p-8 text-light-subtle dark:text-dark-subtle">
//                                         <div className="flex flex-col items-center">
//                                             <Icon name={IconName.Flag} className="w-12 h-12 opacity-30 mb-4" />
//                                             No flagged content found.
//                                         </div>
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

// export default FlaggedContentPage;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// --- FIX: We will re-define the type here to include `_id` ---
// import { FlaggedContent } from '../../types'; // This line can be removed or commented out
import Icon, { IconName } from "../../components/ui/Icon";
import { fetchApi } from "../../services/api";

// --- FIX: Define the correct shape of the data coming from the MongoDB backend ---
interface FlaggedContent {
  _id: string; // MongoDB uses _id
  userEmail: string;
  content: string;
  type: "Journal" | "Chat";
  date: string;
  resolved: boolean;
}

const FlaggedContentPage: React.FC = () => {
  const [flags, setFlags] = useState<FlaggedContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        setLoading(true);
        const fetchedFlags = await fetchApi("/admin/flags", "GET");
        setFlags(fetchedFlags);
      } catch (error) {
        console.error("Failed to fetch flagged content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlags();
  }, []);

  const handleResolveFlag = async (flagId: string) => {
    if (
      window.confirm(
        "Are you sure you want to resolve this flag? It will be removed from this list."
      )
    ) {
      try {
        await fetchApi(`/admin/flags/${flagId}/resolve`, "PUT");
        setFlags((currentFlags) =>
          currentFlags.filter((flag) => flag._id !== flagId)
        );
      } catch (error) {
        console.error("Failed to resolve flag:", error);
        alert("Could not resolve the flag. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading flagged content...</div>;
  }

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold mb-2">Flagged Content</h1>
      <p className="text-light-subtle dark:text-dark-subtle mb-8">
        Review content automatically flagged by the system for sensitive
        keywords.
      </p>

      <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Content</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flags.length > 0 ? (
                flags.map((flag) => (
                  <tr
                    key={flag._id}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-4">
                      <Link
                        to={`/admin/users/${encodeURIComponent(
                          flag.userEmail
                        )}`}
                        className="hover:underline text-primary"
                      >
                        {flag.userEmail}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          flag.type === "Chat"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {flag.type}
                      </span>
                    </td>
                    <td className="p-4 max-w-sm">
                      <p className="italic truncate text-light-subtle dark:text-dark-subtle">
                        "{flag.content}"
                      </p>
                    </td>
                    <td className="p-4 text-sm text-light-subtle dark:text-dark-subtle">
                      {new Date(flag.date).toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleResolveFlag(flag._id)}
                        className="flex items-center justify-end ml-auto text-secondary hover:text-green-700 font-medium"
                        aria-label={`Resolve flag for ${flag.userEmail}`}
                      >
                        <span>Resolve</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-8 text-light-subtle dark:text-dark-subtle"
                  >
                    <div className="flex flex-col items-center">
                      <Icon
                        name={IconName.Flag}
                        className="w-12 h-12 opacity-30 mb-4"
                      />
                      No flagged content found.
                    </div>
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

export default FlaggedContentPage;
