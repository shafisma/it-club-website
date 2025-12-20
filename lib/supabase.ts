import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase credentials in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ChangelogEntry = {
  id: string;
  version: string;
  date: string;
  category: "feature" | "improvement" | "fix" | "release";
  title: string;
  description: string;
  changes: string[];
  created_at: string;
  updated_at: string;
};
