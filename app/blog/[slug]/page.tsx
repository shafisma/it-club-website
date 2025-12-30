"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { BlogPost } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Fetch all posts and find by slug
        const response = await fetch("/api/blog");
        const posts = await response.json();
        const foundPost = posts.find((p: BlogPost) => p.slug === slug);

        if (!foundPost) {
          setError("Post not found");
          setPost(null);
        } else {
          setPost(foundPost);
        }
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background dark:bg-[#011627]">
        <Header />
        <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 border-2 border-black rounded-lg text-center">
              <p className="text-muted-foreground">Loading post...</p>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-background dark:bg-[#011627]">
        <Header />
        <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 border-2 border-black rounded-lg text-center">
              <p className="text-muted-foreground mb-4">
                {error || "Post not found"}
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#3b82f6] text-white font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "event":
        return "bg-[#10b981]";
      case "tutorial":
        return "bg-[#3b82f6]";
      case "announcement":
        return "bg-[#a855f7]";
      case "update":
        return "bg-[#ef4444]";
      case "other":
        return "bg-[#f59e0b]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <main className="min-h-screen bg-background dark:bg-[#011627]">
      <Header />

      {/* Back Button */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 border-b border-border dark:border-gray-700">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#2563eb] font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Post Content */}
      <article className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Featured Image */}
          {post.image && (
            <div className="mb-8 w-full h-96 overflow-hidden rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span
                className={`inline-block px-4 py-2 text-sm font-semibold text-white rounded-md ${getCategoryColor(
                  post.category
                )} border-2 border-black`}
              >
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-col gap-2 text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold">By {post.author}</span>
                <span>•</span>
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content - Render HTML */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-foreground space-y-4"
            />
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#3b82f6] text-white font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <div className="pb-4 flex items-center justify-between px-4 pt-8 md:flex-row dark:bg-[#011627] border-t border-border">
        <p className="text-footer-link text-sm">
          © 2025-2026 Motijheel Model IT Club. All rights reserved.
        </p>
      </div>
    </main>
  );
}
