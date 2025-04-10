"use client"

import type React from "react"
import { useEffect } from "react"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"
import { useUser } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"
import { useRole } from "@/hooks/use-role"

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { isSignedIn, user, isLoaded } = useUser()

  // Add dark mode styles to the document
  useEffect(() => {
    // Add dark mode class to html element
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };
    
    // Set initial dark mode based on system preference
    if (darkModeMediaQuery.matches) {
      document.documentElement.classList.add('dark');
    }
    
    // Listen for changes in system dark mode preference
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-950">
        <div className="animate-pulse flex space-x-4 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-blue-200/60 dark:border-blue-900/60">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-100 dark:bg-blue-900 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-100 dark:bg-blue-900 rounded"></div>
              <div className="h-4 bg-blue-100 dark:bg-blue-900 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-green-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-950 text-black dark:text-white">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="secure-container animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  )
}