export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: "event" | "tutorial" | "announcement" | "update" | "other";
  tags: string[];
  date: string;
  image?: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

// Admin password - change this to your desired password
export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export const ADMIN_SESSION_KEY = "admin_session_token";

// Utility function to generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
