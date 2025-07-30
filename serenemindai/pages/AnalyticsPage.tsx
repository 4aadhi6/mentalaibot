
import React, { useState, useEffect, useCallback } from "react";
import { Mood, MoodLog } from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getMotivationalQuote } from "../services/geminiService";
import { fetchApi } from "../services/api";

const moodOptions = [
  { mood: Mood.Awful, emoji: "😞", label: "Awful" },
  { mood: Mood.Bad, emoji: "🙁", label: "Bad" },
  { mood: Mood.Okay, emoji: "😐", label: "Okay" },
  { mood: Mood.Good, emoji: "🙂", label: "Good" },
  { mood: Mood.Great, emoji: "😄", label: "Great" },
];

const AnalyticsPage: React.FC = () => {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [quote, setQuote] = useState("");
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isGuest = !user?.token;

  const today = new Date().toISOString().split("T")[0];
  const todaysLog = moodLogs.find((log) => log.date === today);

  const fetchData = useCallback(async () => {
    if (isGuest) {
      setIsLoadingQuote(false);
      setQuote("Sign up to track your mood and get personalized insights.");
      return;
    }

    try {
      const savedLogs = await fetchApi("/moods");
      setMoodLogs(savedLogs);
    } catch (error) {
      console.error("Failed to fetch mood logs", error);
    }

    setIsLoadingQuote(true);
    try {
      const adminQuotes = await fetchApi("/admin/quotes");
      const q = await getMotivationalQuote(adminQuotes);
      setQuote(q);
    } catch (error) {
      console.error("Failed to fetch quote", error);
      setQuote(
        "The best way to get started is to quit talking and begin doing."
      );
    } finally {
      setIsLoadingQuote(false);
    }
  }, [isGuest]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMoodLog = async (mood: Mood) => {
    if (isGuest) return;
    try {
      const newLog = await fetchApi("/moods", "POST", { date: today, mood });
      setMoodLogs((prevLogs) => [
        ...prevLogs.filter((log) => log.date !== today),
        newLog,
      ]);
    } catch (error) {
      console.error("Failed to log mood", error);
    }
  };

  // FIX: This function must RETURN an array for the chart's data prop.
  const getChartData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    }).reverse();

    return last7Days.map((date) => {
      const dateString = date.toISOString().split("T")[0];
      const log = moodLogs.find((l) => l.date === dateString);
      return {
        name: date.toLocaleDateString("en-US", { weekday: "short" }),
        mood: log ? log.mood : 0,
      };
    });
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <h1 className="text-3xl font-bold">My Wellness Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Your Mood This Week</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {/* FIX: The BarChart and its children are now included */}
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
                    moodOptions.find((o) => o.mood === value)?.label,
                    "Mood",
                  ]}
                />
                <Bar
                  dataKey="mood"
                  fill="#3B82F6"
                  barSize={30}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">How are you feeling today?</h2>
          {isGuest ? (
            <p>Mood tracking is disabled in guest mode.</p>
          ) : todaysLog ? (
            <div>
              <p>Today you're feeling:</p>
              <span>
                {moodOptions.find((o) => o.mood === todaysLog.mood)?.emoji}
              </span>
            </div>
          ) : (
            <div>
              {moodOptions.map(({ mood, emoji, label }) => (
                <button key={mood} onClick={() => handleMoodLog(mood)}>
                  <span>{emoji}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-gradient-to-r from-secondary to-primary text-white rounded-lg shadow-lg p-8">
        <h2>Quote of the Day</h2>
        {isLoadingQuote ? (
          <p>Loading...</p>
        ) : (
          <blockquote>"{quote}"</blockquote>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
