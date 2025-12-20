"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { ChangelogEntry } from "@/lib/changelog";

const getCategoryColor = (category: string) => {
  switch (category) {
    case "release":
      return "bg-[#10b981] text-white border-2 border-black";
    case "feature":
      return "bg-[#3b82f6] text-white border-2 border-black";
    case "improvement":
      return "bg-[#a855f7] text-white border-2 border-black";
    case "fix":
      return "bg-[#ef4444] text-white border-2 border-black";
    default:
      return "bg-gray-500 text-white border-2 border-black";
  }
};

const getCategoryLabel = (category: string) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export default function Changelog() {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch entries from API on mount
  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch("/api/changelog");
        const data = await response.json();
        setChangelog(data || []);
        setExpandedVersion(data?.[0]?.version || null);
      } catch (error) {
        console.error("Failed to fetch changelog:", error);
        setChangelog([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChangelog();
  }, []);

  return (
    <main className="min-h-screen bg-background dark:bg-[#011627]">
      <Header />

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Changelog
            </h1>
            <p className="text-lg text-muted-foreground">
              Track updates, features, and improvements to the Motijheel Model
              IT Club website
            </p>
            <div className="mt-8 inline-block">
              <span className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-all gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-[oklch(0%_0_0)] bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none px-6 py-2">
                Version History
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {loading ? (
              <Card className="p-8 border-2 border-black rounded-lg text-center">
                <p className="text-muted-foreground">Loading changelog...</p>
              </Card>
            ) : changelog.length === 0 ? (
              <Card className="p-8 border-2 border-black rounded-lg text-center">
                <p className="text-muted-foreground">
                  No changelog entries yet
                </p>
              </Card>
            ) : (
              changelog.map((entry, index) => (
                <div key={entry.version} className="relative">
                  {/* Timeline connector */}
                  {index !== changelog.length - 1 && (
                    <div className="absolute left-6 top-20 h-6 w-0.5 bg-gradient-to-b from-current to-transparent"></div>
                  )}

                  {/* Entry Card */}
                  <Card
                    className="overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer rounded-lg bg-white"
                    onClick={() =>
                      setExpandedVersion(
                        expandedVersion === entry.version ? null : entry.version
                      )
                    }
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          {/* Timeline dot */}
                          <div
                            className={`w-6 h-6 rounded-full border-2 border-black ${
                              getCategoryColor(entry.category).split(" ")[0]
                            } flex-shrink-0`}
                          ></div>

                          {/* Version and Date */}
                          <div>
                            <div className="flex items-center gap-3">
                              <h2 className="text-2xl dark:text-black font-bold text-foreground">
                                v{entry.version}
                              </h2>
                              <span
                                className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-semibold ${getCategoryColor(
                                  entry.category
                                )}`}
                              >
                                {getCategoryLabel(entry.category)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(entry.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold dark:text-black text-foreground mb-2">
                        {entry.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {entry.description}
                      </p>

                      {/* Expandable Changes */}
                      {expandedVersion === entry.version && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm underline font-semibold dark:text-black text-foreground mb-3">
                            What's Changed:
                          </p>
                          <ul className="space-y-2">
                            {entry.changes.map((change, changeIndex) => (
                              <li
                                key={changeIndex}
                                className="flex items-start gap-3 text-sm dark:text-black text-foreground"
                              >
                                <span className="text-primary font-bold mt-0.5">
                                  •
                                </span>
                                <span>{change}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Expand indicator */}
                      <div className="flex justify-end mt-4">
                        <span className="text-xs text-[#10B981]">
                          {expandedVersion === entry.version ? "−" : "+"}{" "}
                          Details
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
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
