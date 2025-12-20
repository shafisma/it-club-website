export interface ChangelogEntry {
  id?: string;
  version: string;
  date: string;
  category: "feature" | "improvement" | "fix" | "release";
  title: string;
  description: string;
  changes: string[];
}

// Admin password - change this to your desired password
export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export const ADMIN_SESSION_KEY = "admin_session_token";
