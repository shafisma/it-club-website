"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, X, LogOut } from "lucide-react";
import {
  ChangelogEntry,
  ADMIN_PASSWORD,
  ADMIN_SESSION_KEY,
} from "@/lib/changelog";

interface EditingEntry extends Partial<ChangelogEntry> {
  id?: string;
}

export default function AdminChangelog() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newChange, setNewChange] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EditingEntry>({
    version: "",
    date: "",
    category: "feature",
    title: "",
    description: "",
    changes: [],
  });

  // Check authentication on mount
  useEffect(() => {
    const sessionToken = localStorage.getItem(ADMIN_SESSION_KEY);
    if (sessionToken === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  // Load entries from API on mount
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/changelog");
        const data = await response.json();
        setEntries(data || []);
      } catch (error) {
        console.error("Failed to fetch changelog:", error);
        alert("Failed to load changelog entries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
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

  const handleAddEntry = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({
      version: "",
      date: new Date().toISOString().split("T")[0],
      category: "feature",
      title: "",
      description: "",
      changes: [],
    });
  };

  const handleEditEntry = (entry: ChangelogEntry) => {
    setEditingId(entry.id || null);
    setShowForm(true);
    setFormData(entry);
  };

  const handleSaveEntry = async () => {
    if (!formData.version || !formData.title || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);

      if (editingId) {
        // Update existing entry
        const response = await fetch(`/api/changelog/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to update entry");

        const updated = await response.json();
        setEntries(entries.map((e) => (e.id === editingId ? updated : e)));
      } else {
        // Create new entry
        const response = await fetch("/api/changelog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to create entry");

        const created = await response.json();
        setEntries([created, ...entries]);
      }

      setShowForm(false);
      setFormData({
        version: "",
        date: "",
        category: "feature",
        title: "",
        description: "",
        changes: [],
      });
    } catch (error) {
      console.error("Failed to save entry:", error);
      alert("Failed to save entry");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEntry = async (entry: ChangelogEntry) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/changelog/${entry.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete entry");

      setEntries(entries.filter((e) => e.id !== entry.id));
    } catch (error) {
      console.error("Failed to delete entry:", error);
      alert("Failed to delete entry");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddChange = () => {
    if (newChange.trim()) {
      setFormData({
        ...formData,
        changes: [...(formData.changes || []), newChange],
      });
      setNewChange("");
    }
  };

  const handleRemoveChange = (index: number) => {
    setFormData({
      ...formData,
      changes: (formData.changes || []).filter((_, idx) => idx !== index),
    });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      version: "",
      date: "",
      category: "feature",
      title: "",
      description: "",
      changes: [],
    });
    setNewChange("");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "release":
        return "bg-[#10b981]";
      case "feature":
        return "bg-[#3b82f6]";
      case "improvement":
        return "bg-[#a855f7]";
      case "fix":
        return "bg-[#ef4444]";
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
                  Admin Changelog
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Manage and edit changelog entries
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
              onClick={handleAddEntry}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-all gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-[oklch(0%_0_0)] bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none px-6 py-2"
            >
              <Plus className="w-4 h-4" />
              Add New Entry
            </button>
          </div>

          {/* Form Section */}
          {showForm && (
            <Card className="mb-12 overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_black] rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {editingId ? "Edit Entry" : "New Entry"}
                </h2>
                <button
                  onClick={handleCancelForm}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Row 1: Version and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Version *
                    </label>
                    <input
                      type="text"
                      placeholder="1.0.0"
                      value={formData.version}
                      onChange={(e) =>
                        setFormData({ ...formData, version: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Category *
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
                      <option value="release">Release</option>
                      <option value="feature">Feature</option>
                      <option value="improvement">Improvement</option>
                      <option value="fix">Fix</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Date and Title */}
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
                      Title *
                    </label>
                    <input
                      type="text"
                      placeholder="Official Launch"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Description *
                  </label>
                  <textarea
                    placeholder="Describe this release..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                {/* Changes */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    What's Changed
                  </label>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Add a change..."
                      value={newChange}
                      onChange={(e) => setNewChange(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddChange();
                        }
                      }}
                      className="flex-1 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <button
                      onClick={handleAddChange}
                      className="px-4 py-2 bg-[#3b82f6] text-white border-2 border-black rounded-lg hover:shadow-none transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Changes List */}
                  {(formData.changes || []).length > 0 && (
                    <div className="space-y-2">
                      {(formData.changes || []).map((change, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
                        >
                          <span className="text-sm text-foreground">
                            {change}
                          </span>
                          <button
                            onClick={() => handleRemoveChange(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveEntry}
                    disabled={isLoading}
                    className="flex-1 px-6 py-2 bg-[#10b981] text-white font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all disabled:opacity-50"
                  >
                    {isLoading
                      ? "Saving..."
                      : editingId
                      ? "Update Entry"
                      : "Create Entry"}
                  </button>
                  <button
                    onClick={handleCancelForm}
                    disabled={isLoading}
                    className="flex-1 px-6 py-2 bg-gray-300 text-black font-semibold border-2 border-black rounded-lg hover:shadow-none transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Entries List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              All Entries ({entries.length})
            </h2>

            {isLoading ? (
              <Card className="p-6 border-2 border-black rounded-lg text-center text-muted-foreground">
                Loading entries...
              </Card>
            ) : entries.length === 0 ? (
              <Card className="p-6 border-2 border-black rounded-lg text-center text-muted-foreground">
                No entries yet. Create one to get started!
              </Card>
            ) : (
              entries.map((entry) => (
                <Card
                  key={entry.id}
                  className="overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_black] rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-foreground">
                          v{entry.version}
                        </h3>
                        <span
                          className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-md ${getCategoryColor(
                            entry.category
                          )} border border-black`}
                        >
                          {entry.category.charAt(0).toUpperCase() +
                            entry.category.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditEntry(entry)}
                        disabled={isLoading}
                        className="p-2 bg-[#3b82f6] text-white rounded-lg border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry)}
                        disabled={isLoading}
                        className="p-2 bg-[#ef4444] text-white rounded-lg border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    {entry.title}
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {entry.description}
                  </p>

                  {entry.changes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-foreground mb-3">
                        Changes:
                      </p>
                      <ul className="space-y-2">
                        {entry.changes.map((change, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <span className="text-primary font-bold">•</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}
