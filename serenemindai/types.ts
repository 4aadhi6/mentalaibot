
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface JournalEntry {
  id:string;
  date: string;
  content: string;
  summary?: string;
}

export enum Mood {
    Awful = 1,
    Bad = 2,
    Okay = 3,
    Good = 4,
    Great = 5,
}

export interface MoodLog {
  date: string; // ISO string for the date part only
  mood: Mood;
}

export interface FlaggedContent {
  id: string;
  userEmail: string;
  content: string;
  type: 'Journal' | 'Chat';
  date: string;
}
