"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LanguageToggle() {
  const [language, setLanguage] = useState<"en" | "bn">("en")

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === "en" ? "default" : "neutral"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="text-xs font-medium"
      >
        EN
      </Button>
      <Button
        variant={language === "bn" ? "default" : "neutral"}
        size="sm"
        onClick={() => setLanguage("bn")}
        className="text-xs font-medium"
      >
        বাং
      </Button>
    </div>
  )
}