
import React, { useState, useEffect } from "react";
import { fetchApi } from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE", "#8884d8"];

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    journalCount: 0,
    flaggedCount: 0,
  });
  const [signupData, setSignupData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, signups, moods] = await Promise.all([
          fetchApi("/admin/dashboard"),
          fetchApi("/admin/dashboard/signups"),
          fetchApi("/admin/dashboard/moods"),
        ]);
        setStats(statsData);
        setSignupData(signups);
        setMoodData(moods);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div className="animate-fade-in-up space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-light-subtle dark:text-dark-subtle">
            Registered Users
          </h3>
          <p className="text-4xl font-bold text-primary">{stats.userCount}</p>
        </div>
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-light-subtle dark:text-dark-subtle">
            Total Journal Entries
          </h3>
          <p className="text-4xl font-bold text-secondary">
            {stats.journalCount}
          </p>
        </div>
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-light-subtle dark:text-dark-subtle">
            Flagged Content
          </h3>
          <p className="text-4xl font-bold text-accent">{stats.flaggedCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            User Signups (Last 7 Days)
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={signupData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="signups"
                  name="New Users"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Overall Mood Distribution
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {moodData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
