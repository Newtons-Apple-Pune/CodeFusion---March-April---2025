
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";

// Pages
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Projects from "./pages/Projects";
import Announcements from "./pages/Announcements";
import Documents from "./pages/Documents";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import DeskManagementLanding from "./components/landing/DeskManagementLanding";

// Add proper interface for ImportMeta to fix TypeScript error
declare global {
  interface ImportMeta {
    env: {
      VITE_CLERK_PUBLISHABLE_KEY: string;
      [key: string]: any;
    };
  }
}

// Use environment variable for Clerk publishable key
const CLERK_PUBLISHABLE_KEY = import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_••••••••••••••••••••••••••••••••••";

// Initialize QueryClient
const queryClient = new QueryClient();

const App = () => {
  if (!CLERK_PUBLISHABLE_KEY || CLERK_PUBLISHABLE_KEY.startsWith("pk_test_•")) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">
        <div className="text-center max-w-md p-6 bg-gray-900/80 backdrop-blur-lg rounded-lg shadow-xl border border-blue-900/50">
          <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
          <p className="text-red-400 mb-4">Clerk publishable key is missing or invalid.</p>
          <p className="mb-4">To fix this:</p>
          <ol className="text-left space-y-2 mb-4">
            <li>1. Sign up for a Clerk account at <a href="https://clerk.com" className="text-blue-400 hover:underline">clerk.com</a></li>
            <li>2. Create a new application in the Clerk dashboard</li>
            <li>3. Copy your publishable key from the API Keys section</li>
            <li>4. Create a <code className="bg-blue-900/50 px-1 rounded">.env</code> file in the project root with:</li>
          </ol>
          <pre className="bg-blue-900/50 p-2 rounded text-left mb-4">
            VITE_CLERK_PUBLISHABLE_KEY=your_actual_key_here
          </pre>
          <p>Then restart your development server.</p>
          <p className="mt-4 text-yellow-300">Note: To assign admin or HR roles to users, go to your Clerk Dashboard, select the user, and add a "role" field with value "admin" or "hr" in public metadata.</p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Home/Landing page route */}
              <Route 
                path="/" 
                element={<DeskManagementLanding />} 
              />
              
              {/* Public routes */}
              <Route 
                path="/sign-in/*" 
                element={
                  <SignedOut>
                    <SignIn />
                  </SignedOut>
                } 
              />
              <Route 
                path="/sign-up/*" 
                element={
                  <SignedOut>
                    <SignUp />
                  </SignedOut>
                } 
              />
              
              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                }
              />
              <Route
                path="/workspace"
                element={
                  <SignedIn>
                    <Workspace />
                  </SignedIn>
                }
              />
              <Route
                path="/employees"
                element={
                  <SignedIn>
                    <Employees />
                  </SignedIn>
                }
              />
              <Route
                path="/attendance"
                element={
                  <SignedIn>
                    <Attendance />
                  </SignedIn>
                }
              />
              <Route
                path="/leave"
                element={
                  <SignedIn>
                    <Leave />
                  </SignedIn>
                }
              />
              <Route
                path="/projects"
                element={
                  <SignedIn>
                    <Projects />
                  </SignedIn>
                }
              />
              <Route
                path="/announcements"
                element={
                  <SignedIn>
                    <Announcements />
                  </SignedIn>
                }
              />
              <Route
                path="/documents"
                element={
                  <SignedIn>
                    <Documents />
                  </SignedIn>
                }
              />
              
              {/* Settings route */}
              <Route
                path="/settings"
                element={
                  <SignedIn>
                    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">
                      <AppLayout>
                        <h1 className="text-2xl font-bold mb-6">Settings</h1>
                        <div className="bg-gray-900/30 p-6 rounded-lg border border-blue-900/50">
                          <p className="text-xl mb-4">Admin Settings</p>
                          <p className="text-gray-300">Configure application settings, permissions, and system preferences.</p>
                        </div>
                      </AppLayout>
                    </div>
                  </SignedIn>
                }
              />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

// Import AppLayout at the end to avoid circular dependency issues
import { AppLayout } from "./components/layout/AppLayout";

export default App;
