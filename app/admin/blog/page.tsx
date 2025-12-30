"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Edit2, Plus, X, LogOut, Save, Settings } from "lucide-react";
import TipTapEditor from "@/components/tiptap-editor";
import {
  BlogPost,
  ADMIN_PASSWORD,
  ADMIN_SESSION_KEY,
  generateSlug,
} from "@/lib/blog";

interface EditingPost extends Partial<BlogPost> {
  id?: string;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showMetadataDialog, setShowMetadataDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [formData, setFormData] = useState<EditingPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    category: "other",
    tags: [],
    date: "",
    image: "",
    published: false,
  });

  // Check authentication on mount
  useEffect(() => {
    const sessionToken = localStorage.getItem(ADMIN_SESSION_KEY);
    if (sessionToken === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  // Load posts from API on mount
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/blog");
        const data = await response.json();
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        alert("Failed to load blog posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(ADMIN_SESSION_KEY, ADMIN_PASSWORD);
      setPasswordInput("");
    } else {
      alert("Incorrect password");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setPasswordInput("");
  };

  const handleAddPost = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      category: "other",
      tags: [],
      date: new Date().toISOString().split("T")[0],
      image: "",
      published: false,
    });
    setShowMetadataDialog(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingId(post.id || null);
    setFormData(post);
    setShowMetadataDialog(true);
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleProceedToEditor = () => {
    if (!formData.title || !formData.excerpt || !formData.author) {
      alert("Please fill in title, excerpt, and author before proceeding");
      return;
    }
    setShowMetadataDialog(false);
    setShowForm(true);
  };

  const handleSavePost = async () => {
    if (
      !formData.title ||
      !formData.excerpt ||
      !formData.content ||
      !formData.author
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);

      if (editingId) {
        // Update existing post
        const response = await fetch(`/api/blog/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to update post");

        const updated = await response.json();
        setPosts(posts.map((p) => (p.id === editingId ? updated : p)));
      } else {
        // Create new post
        const response = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to create post");

        const created = await response.json();
        setPosts([created, ...posts]);
      }

      setShowForm(false);
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "",
        category: "other",
        tags: [],
        date: "",
        image: "",
        published: false,
      });
      setNewTag("");
    } catch (error) {
      console.error("Failed to save post:", error);
      alert("Failed to save post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (post: BlogPost) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/blog/${post.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      setPosts(posts.filter((p) => p.id !== post.id));
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter((_, idx) => idx !== index),
    });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setShowMetadataDialog(false);
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      category: "other",
      tags: [],
      date: "",
      image: "",
      published: false,
    });
    setNewTag("");
  };

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
    <main className="min-h-screen bg-background dark:bg-[#011627] p-6">
      {/* Login Screen */}
      {!isAuthenticated && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_black] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Admin Access
            </h2>
            <p className="text-muted-foreground mb-6">
              Enter the admin password to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2 bg-[#10b981] text-white font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all"
              >
                Login
              </button>
            </form>
          </Card>
        </div>
      )}

      {isAuthenticated && (
        <div className="max-w-6xl mx-auto">
          {/* Header with Logout */}
          <div className="mb-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  Admin Blog
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Create and manage blog posts
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-[#ef4444] text-white font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
            <button
              onClick={handleAddPost}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-all gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-[oklch(0%_0_0)] bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none px-6 py-2"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>

          {/* Metadata Dialog */}
          <Dialog
            open={showMetadataDialog}
            onOpenChange={setShowMetadataDialog}
          >
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-black shadow-[8px_8px_0px_0px_black]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {editingId ? "Edit Post Details" : "New Blog Post"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter post title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    placeholder="auto-generated from title"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    placeholder="Brief summary (appears in list view)"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                {/* Author and Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      placeholder="Author name"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white"
                    >
                      <option value="event">Event</option>
                      <option value="tutorial">Tutorial</option>
                      <option value="announcement">Announcement</option>
                      <option value="update">Update</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Date and Image Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <button
                      onClick={handleAddTag}
                      type="button"
                      className="px-4 py-2 bg-[#3b82f6] text-white border-2 border-black rounded-lg hover:shadow-none transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tags List */}
                  {(formData.tags || []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {(formData.tags || []).map((tag, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold text-foreground flex items-center gap-2"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(idx)}
                            type="button"
                            className="text-red-500 hover:text-red-700 ml-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Published Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="published"
                    className="text-sm font-semibold text-foreground cursor-pointer"
                  >
                    Publish this post
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleProceedToEditor}
                    className="flex-1 px-6 py-2 bg-[#10b981] text-white font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all"
                  >
                    Continue to Editor
                  </button>
                  <button
                    onClick={handleCancelForm}
                    type="button"
                    className="flex-1 px-6 py-2 bg-gray-300 text-black font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Full Screen Editor */}
          {showForm && (
            <div className="fixed inset-0 z-50 bg-background dark:bg-[#011627] flex flex-col">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black bg-white dark:bg-gray-900">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-foreground">
                    {formData.title || "Untitled Post"}
                  </h1>
                  <button
                    onClick={() => setShowMetadataDialog(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-foreground font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all"
                    title="Edit post details"
                  >
                    <Settings className="w-4 h-4" />
                    Edit Details
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSavePost}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-[#10b981] text-white font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {isLoading
                      ? "Saving..."
                      : editingId
                      ? "Update Post"
                      : "Save Post"}
                  </button>
                  <button
                    onClick={handleCancelForm}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-black font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Close
                  </button>
                </div>
              </div>

              {/* Editor Content */}
              <div className="flex-1 overflow-auto px-6 py-6">
                <div className="max-w-5xl mx-auto">
                  <TipTapEditor
                    content={formData.content || ""}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                    placeholder="Start writing your blog post..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Posts List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              All Posts ({posts.length})
            </h2>

            {isLoading ? (
              <Card className="p-6 border-2 border-black rounded-lg text-center text-muted-foreground">
                Loading posts...
              </Card>
            ) : posts.length === 0 ? (
              <Card className="p-6 border-2 border-black rounded-lg text-center text-muted-foreground">
                No posts yet. Create one to get started!
              </Card>
            ) : (
              posts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_black] rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-foreground">
                          {post.title}
                        </h3>
                        <span
                          className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-md ${getCategoryColor(
                            post.category
                          )} border border-black`}
                        >
                          {post.category.charAt(0).toUpperCase() +
                            post.category.slice(1)}
                        </span>
                        {post.published ? (
                          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-[#10b981] rounded-md border border-black">
                            Published
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-gray-400 rounded-md border border-black">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        By {post.author} •{" "}
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-foreground mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#ef4444] text-white font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}
