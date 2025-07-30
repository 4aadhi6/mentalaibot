
import React, { useState, useEffect, useCallback } from "react";
import {
  summarizeJournalEntry,
  checkForFlags,
} from "../services/geminiService";
import Icon, { IconName } from "../components/ui/Icon";
import { fetchApi } from "../services/api";

interface JournalEntry {
  _id: string;
  date: string;
  content: string;
  summary?: string;
}

const JournalPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentContent, setCurrentContent] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isGuest = !user?.token;

  const loadJournalEntries = useCallback(async () => {
    if (isGuest) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const fetchedEntries = await fetchApi("/journal");
      setEntries(fetchedEntries);
    } catch (error) {
      console.error("Failed to load journal entries", error);
    } finally {
      setIsLoading(false);
    }
  }, [isGuest]);

  useEffect(() => {
    loadJournalEntries();
  }, [loadJournalEntries]);

  const handleSaveEntry = async () => {
    if (currentContent.trim() === "" || isGuest) return;
    await checkForFlags(currentContent, user.email, "Journal");
    try {
      const newEntryFromServer = await fetchApi("/journal", "POST", {
        content: currentContent,
      });
      setEntries((prevEntries) => [newEntryFromServer, ...prevEntries]);
      setCurrentContent("");
      setSelectedEntry(newEntryFromServer);
    } catch (error) {
      console.error("Failed to save entry:", error);
    }
  };

  const handleGetSummary = async (entry: JournalEntry) => {
    if (!entry || isSummarizing || isGuest) return;
    setIsSummarizing(true);
    try {
      const summary = await summarizeJournalEntry(entry.content);
      const updatedEntry = await fetchApi(
        `/journal/${entry._id}/summary`,
        "POST",
        { summary }
      );
      setEntries((prev) =>
        prev.map((e) => (e._id === entry._id ? updatedEntry : e))
      );
      setSelectedEntry(updatedEntry);
    } catch (error) {
      console.error("Failed to get summary:", error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
      <div className="md:col-span-1">
        <h1 className="text-3xl font-bold mb-4">My Journal</h1>
        <div className="bg-light-card dark:bg-dark-card rounded-lg p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <button
            onClick={() => setSelectedEntry(null)}
            className="w-full text-left p-3 mb-2 rounded-lg bg-primary text-white font-semibold flex items-center"
          >
            <Icon name={IconName.Journal} className="w-5 h-5 mr-2" />
            New Entry
          </button>
          {isLoading ? (
            <p>Loading entries...</p>
          ) : (
            entries.map((entry) => (
              // FIX: Corrected the className syntax error here
              <button
                key={entry._id}
                onClick={() => setSelectedEntry(entry)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedEntry?._id === entry._id
                    ? "bg-primary/20"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <p className="font-semibold">{formatDate(entry.date)}</p>
                <p className="text-sm text-light-subtle dark:text-dark-subtle truncate">
                  {entry.content}
                </p>
              </button>
            ))
          )}
        </div>
      </div>
      <div className="md:col-span-2">
        <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6 h-full flex flex-col">
          {selectedEntry ? (
            <div className="flex-1 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-2">
                {formatDate(selectedEntry.date)}
              </h2>
              <p className="whitespace-pre-wrap text-lg">
                {selectedEntry.content}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => handleGetSummary(selectedEntry)}
                  disabled={isSummarizing || isGuest}
                  className="inline-flex items-center px-4 py-2 bg-secondary text-white font-semibold rounded-lg"
                >
                  {isSummarizing ? "Thinking..." : "Get AI Insight"}
                </button>
                {selectedEntry.summary && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-bold text-primary mb-2">
                      AI Reflection
                    </h3>
                    <p>{selectedEntry.summary}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-2">New Journal Entry</h2>
              <textarea
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                disabled={isGuest}
                className="w-full flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              />
              {!isGuest && (
                <button
                  onClick={handleSaveEntry}
                  className="mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg self-end"
                >
                  Save Entry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
