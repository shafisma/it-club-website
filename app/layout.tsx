import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Remove these calls
// const _geist = GeistSans({ subsets: ["latin"] })
// const _geistMono = GeistMono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Motijheel IT Club - Drop Your Innovation",
  description: "Official website of the IT Club at Motijheel Model School and College",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
