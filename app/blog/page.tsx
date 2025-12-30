"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { BlogPost } from "@/lib/blog";
import Link from "next/link";

const getCategoryColor = (category: string) => {
  switch (category) {
    case "event":
      return "bg-[#10b981] text-white border-2 border-black";
    case "tutorial":
      return "bg-[#3b82f6] text-white border-2 border-black";
    case "announcement":
      return "bg-[#a855f7] text-white border-2 border-black";
    case "update":
      return "bg-[#ef4444] text-white border-2 border-black";
    case "other":
      return "bg-[#f59e0b] text-white border-2 border-black";
    default:
      return "bg-gray-500 text-white border-2 border-black";
  }
};

const getCategoryLabel = (category: string) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  const categories = Array.from(
    new Set(posts.map((post) => post.category))
  ).sort();

  return (
    <main className="min-h-screen bg-background dark:bg-[#011627]">
      <Header />

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights, tutorials, and updates from the Motijheel Model IT Club
            </p>
            <div className="mt-8 inline-block">
              <span className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-all gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-[oklch(0%_0_0)] bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none px-6 py-2">
                Latest Articles
              </span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg border-2 border-black font-semibold transition-all ${
                selectedCategory === null
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
                className={`px-4 py-2 rounded-lg border-2 border-black font-semibold transition-all ${getCategoryColor(
                  category
                )} ${
                  selectedCategory === category
                    ? "ring-2 ring-offset-2 ring-black"
                    : ""
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <Card className="p-8 border-2 border-black rounded-lg text-center col-span-full">
                <p className="text-muted-foreground">Loading blog posts...</p>
              </Card>
            ) : filteredPosts.length === 0 ? (
              <Card className="p-8 border-2 border-black rounded-lg text-center col-span-full">
                <p className="text-muted-foreground">No blog posts found yet</p>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer rounded-lg bg-white h-full flex flex-col">
                    {/* Image */}
                    {post.image && (
                      <div className="w-full h-40 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Category Badge */}
                      <div className="mb-3">
                        <span
                          className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-semibold ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {getCategoryLabel(post.category)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold dark:text-black text-foreground mb-2 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="space-y-2 border-t border-border pt-3">
                        <p className="text-xs text-muted-foreground">
                          By{" "}
                          <span className="font-semibold">{post.author}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-xs text-muted-foreground pt-1">
                                +{post.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="pb-4 flex items-center justify-between px-4 pt-8 md:flex-row dark:bg-[#011627]">
        <p className="text-footer-link text-sm">
          © 2025-2026 Motijheel Model IT Club. All rights reserved.
        </p>
      </div>
    </main>
  );
}
