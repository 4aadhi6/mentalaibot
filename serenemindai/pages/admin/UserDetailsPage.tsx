// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { JournalEntry, ChatMessage, MoodLog, Mood } from '../../types';
// import Icon, { IconName } from '../../components/ui/Icon';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const moodOptions = [
//     { mood: Mood.Awful, emoji: '😞', label: 'Awful' },
//     { mood: Mood.Bad, emoji: '🙁', label: 'Bad' },
//     { mood: Mood.Okay, emoji: '😐', label: 'Okay' },
//     { mood: Mood.Good, emoji: '🙂', label: 'Good' },
//     { mood: Mood.Great, emoji: '😄', label: 'Great' }
// ];

// const UserDetailsPage: React.FC = () => {
//     const { userEmail } = useParams<{ userEmail: string }>();
//     const [user, setUser] = useState<any>(null);
//     const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
//     const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
//     const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);

//     useEffect(() => {
//         if (userEmail) {
//             const decodedEmail = decodeURIComponent(userEmail);
//             const usersDb = JSON.parse(localStorage.getItem('usersDb') || '[]');
//             const foundUser = usersDb.find((u: any) => u.email === decodedEmail);
//             setUser(foundUser);

//             const journalKey = `journalEntries_${decodedEmail}`;
//             const chatKey = `chatHistory_${decodedEmail}`;
//             const moodKey = `moodLogs_${decodedEmail}`;

//             setJournalEntries(JSON.parse(localStorage.getItem(journalKey) || '[]'));
//             setChatMessages(JSON.parse(localStorage.getItem(chatKey) || '[]'));
//             setMoodLogs(JSON.parse(localStorage.getItem(moodKey) || '[]'));
//         }
//     }, [userEmail]);

//     const getChartData = () => {
//         const last30Days = Array.from({ length: 30 }, (_, i) => {
//             const d = new Date();
//             d.setDate(d.getDate() - i);
//             return d;
//         }).reverse();

//         return last30Days.map(date => {
//             const dateString = date.toISOString().split('T')[0];
//             const log = moodLogs.find(l => l.date === dateString);
//             return {
//                 name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//                 mood: log ? log.mood : null
//             };
//         });
//     };

//     if (!user) {
//         return <div className="text-center p-8">User not found.</div>;
//     }

//     return (
//         <div className="animate-fade-in-up space-y-8">
//             <div>
//                  <Link to="/admin/users" className="flex items-center text-sm text-light-subtle dark:text-dark-subtle hover:text-primary mb-4">
//                     <Icon name={IconName.ChevronLeft} className="w-4 h-4 mr-1"/>
//                     Back to User Management
//                 </Link>
//                 <h1 className="text-3xl font-bold">User Details</h1>
//                 <p className="text-xl text-light-subtle dark:text-dark-subtle">{user.name} ({user.email})</p>
//             </div>

//             <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6">
//                 <h2 className="text-xl font-bold mb-4">Mood History (Last 30 Days)</h2>
//                 <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={getChartData()} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
//                             <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
//                             <XAxis dataKey="name" />
//                             <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tickFormatter={(val) => moodOptions.find(o => o.mood === val)?.emoji || ''} />
//                             <Tooltip
//                                 contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
//                                 labelStyle={{ color: '#F9FAFB' }}
//                                 formatter={(value: number) => [moodOptions.find(o => o.mood === value)?.label || 'No log', 'Mood']}
//                             />
//                             <Bar dataKey="mood" fill="#3B82F6" barSize={20} />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6">
//                     <h2 className="text-xl font-bold mb-4">Journal Entries ({journalEntries.length})</h2>
//                     <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
//                         {journalEntries.length > 0 ? journalEntries.map(entry => (
//                             <div key={entry.id} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
//                                 <p className="font-semibold text-sm mb-1">{new Date(entry.date).toLocaleString()}</p>
//                                 <p className="whitespace-pre-wrap text-light-text dark:text-dark-text">{entry.content}</p>
//                             </div>
//                         )) : <p className="text-light-subtle dark:text-dark-subtle">No journal entries found.</p>}
//                     </div>
//                 </div>
//                 <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6">
//                     <h2 className="text-xl font-bold mb-4">Chat History ({chatMessages.length})</h2>
//                     <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
//                         {chatMessages.length > 0 ? chatMessages.map(msg => (
//                            <div key={msg.id} className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                                 <div className={`max-w-md px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-primary/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
//                                     <p className="text-sm">{msg.text}</p>
//                                     <p className="text-xs text-right mt-1 text-light-subtle/70 dark:text-dark-subtle/70">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//                                 </div>
//                             </div>
//                         )) : <p className="text-light-subtle dark:text-dark-subtle">No chat history found.</p>}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDetailsPage;
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Icon, { IconName } from "../../components/ui/Icon";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchApi } from "../../services/api";
import { Mood, MoodLog } from "../../types"; // Re-importing necessary types

const moodOptions = [
  { mood: Mood.Awful, emoji: "😞", label: "Awful" },
  { mood: Mood.Bad, emoji: "🙁", label: "Bad" },
  { mood: Mood.Okay, emoji: "😐", label: "Okay" },
  { mood: Mood.Good, emoji: "🙂", label: "Good" },
  { mood: Mood.Great, emoji: "😄", label: "Great" },
];

const UserDetailsPage: React.FC = () => {
  const { userEmail } = useParams<{ userEmail: string }>();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (userEmail) {
        try {
          setLoading(true);
          const decodedEmail = decodeURIComponent(userEmail);
          const data = await fetchApi(`/users/${decodedEmail}`);
          setUserData(data);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          setUserData(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDetails();
  }, [userEmail]);

  const getChartData = () => {
    if (!userData?.moodLogs) return [];
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    }).reverse();

    return last30Days.map((date) => {
      const dateString = date.toISOString().split("T")[0];
      const log = userData.moodLogs.find((l: MoodLog) => l.date === dateString);
      return {
        name: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        mood: log ? log.mood : null,
      };
    });
  };

  if (loading) {
    return <div className="text-center p-8">Loading user details...</div>;
  }

  if (!userData) {
    return <div className="text-center p-8">User not found.</div>;
  }

  const { user, journalEntries, chatMessages } = userData;

  return (
    <div className="animate-fade-in-up space-y-8">
      <div>
        <Link
          to="/admin/users"
          className="flex items-center text-sm text-light-subtle dark:text-dark-subtle hover:text-primary mb-4"
        >
          <Icon name={IconName.ChevronLeft} className="w-4 h-4 mr-1" />
          Back to User Management
        </Link>
        <h1 className="text-3xl font-bold">User Details</h1>
        <p className="text-xl text-light-subtle dark:text-dark-subtle">
          {user.name} ({user.email})
        </p>
      </div>

      <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Mood History (Last 30 Days)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getChartData()}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis
                domain={[0, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(val) =>
                  moodOptions.find((o) => o.mood === val)?.emoji || ""
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F9FAFB" }}
                formatter={(value: number) => [
                  moodOptions.find((o) => o.mood === value)?.label || "No log",
                  "Mood",
                ]}
              />
              <Bar dataKey="mood" fill="#3B82F6" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Journal Entries ({journalEntries.length})
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {journalEntries.length > 0 ? (
              journalEntries.map((entry: any) => (
                <div
                  key={entry._id}
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <p className="font-semibold text-sm mb-1">
                    {new Date(entry.date).toLocaleString()}
                  </p>
                  <p className="whitespace-pre-wrap text-light-text dark:text-dark-text">
                    {entry.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-light-subtle dark:text-dark-subtle">
                No journal entries found.
              </p>
            )}
          </div>
        </div>
        <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Chat History ({chatMessages.length})
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {chatMessages.length > 0 ? (
              chatMessages.map((msg: any) => (
                <div
                  key={msg._id}
                  className={`flex items-start gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-md px-3 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary/20"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs text-right mt-1 text-light-subtle/70 dark:text-dark-subtle/70">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-light-subtle dark:text-dark-subtle">
                No chat history found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
