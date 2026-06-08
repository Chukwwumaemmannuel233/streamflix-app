import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ConditionalFooter } from "@/components/conditional-footer"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StreamFlix - Premium Streaming Experience",
  description: "Stream thousands of movies, TV shows, and exclusive originals. Watch anywhere, anytime, on any device.",
    generator: 'v0.app',
     icons: {
    icon: '/streamflix-favicon.ico',      // or '/favicon.png'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <ConditionalFooter>
              <SiteFooter />
            </ConditionalFooter>
            <Toaster position="top-right" richColors closeButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
