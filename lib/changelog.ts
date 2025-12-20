export interface ChangelogEntry {
  version: string;
  date: string;
  category: "feature" | "improvement" | "fix" | "release";
  title: string;
  description: string;
  changes: string[];
}

export const STORAGE_KEY = "changelog_entries";

// Admin password - change this to your desired password
export const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export const ADMIN_SESSION_KEY = "admin_session_token";
