"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  MessageSquare,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  BrainCircuit,
  Clock,
  Sun,
  Moon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "@/hooks/use-role"

export const Sidebar = () => {
  const { user } = useUser()
  const { role, permissions, isAdminOrHR } = useRole()
  const [collapsed, setCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if dark mode is active
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  // For debugging
  useEffect(() => {
    console.log("Current user role in Sidebar:", role);
    console.log("isAdminOrHR:", isAdminOrHR());
  }, [role, isAdminOrHR]);

  return (
    <div
      className={cn(
        "bg-white text-black transition-all duration-300 flex flex-col h-screen border-r border-blue-200/60 shadow-md shadow-blue-100/20",
        collapsed ? "w-16" : "w-64",
        isDarkMode && "bg-gray-900 text-white border-gray-700 shadow-blue-900/20"
      )}
    >
      <div className={cn("flex items-center justify-between p-4 border-b border-blue-200/60", isDarkMode && "border-gray-700")}>
        {!collapsed && (
          <div className="flex items-center space-x-2 animate-slide-in-left">
            <Building2 className="h-6 w-6 text-green-600" />
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
              WorkBench
            </span>
          </div>
        )}
        {collapsed && <Building2 className="h-6 w-6 text-green-600 mx-auto animate-pulse-slow" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn("text-slate-500 p-1 rounded hover:bg-blue-50 focus:outline-none transition-colors", 
            isDarkMode && "text-gray-300 hover:bg-gray-800")}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" collapsed={collapsed} isDarkMode={isDarkMode} />
          <NavItem to="/workspace" icon={<Building2 size={20} />} label="Workspace" collapsed={collapsed} isDarkMode={isDarkMode} />

          {/* Show based on permissions */}
          <NavItem to="/employees" icon={<Users size={20} />} label="Employees" collapsed={collapsed} isDarkMode={isDarkMode} />
          <NavItem to="/attendance" icon={<Clock size={20} />} label="Attendance" collapsed={collapsed} isDarkMode={isDarkMode} />
          <NavItem to="/leave" icon={<Calendar size={20} />} label="Leave" collapsed={collapsed} isDarkMode={isDarkMode} />
          <NavItem to="/projects" icon={<ClipboardList size={20} />} label="Projects" collapsed={collapsed} isDarkMode={isDarkMode} />
          <NavItem to="/announcements" icon={<MessageSquare size={20} />} label="Announcements" collapsed={collapsed} isDarkMode={isDarkMode} />
          <NavItem to="/documents" icon={<FileText size={20} />} label="Documents" collapsed={collapsed} isDarkMode={isDarkMode} />

          {isAdminOrHR() && (
            <NavItem to="/insights" icon={<BrainCircuit size={20} />} label="AI Insights" collapsed={collapsed} isDarkMode={isDarkMode} />
          )}
        </nav>
      </div>

      {role === "admin" && (
        <div className={cn("p-2 border-t border-blue-200/60", isDarkMode && "border-gray-700")}>
          <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" collapsed={collapsed} isDarkMode={isDarkMode} />
        </div>
      )}

      <div className={cn("flex justify-between items-center p-2 border-t border-blue-200/60", isDarkMode && "border-gray-700")}>
        <button
          onClick={toggleTheme}
          className={cn("flex items-center justify-center p-2 rounded-full text-slate-500 hover:bg-blue-50 hover:text-blue-700 transition-colors",
            collapsed && "mx-auto",
            isDarkMode && "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
          )}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {!collapsed && (
          <div className="text-sm text-black dark:text-white">{isDarkMode ? "Light Mode" : "Dark Mode"}</div>
        )}
      </div>

      <div className={cn("p-4 border-t border-blue-200/60", isDarkMode && "border-gray-700")}>
        {!collapsed ? (
          <div className="flex items-center space-x-3 animate-slide-in-left">
            <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden border border-blue-200">
              {user?.imageUrl && (
                <img src={user.imageUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex flex-col">
              <span className={cn("text-sm font-medium truncate text-black", isDarkMode && "text-white")}>
                {user?.fullName || "User"}
              </span>
              <span className={cn("text-xs text-black/70 truncate", isDarkMode && "text-gray-400")}>
                {role && role.charAt(0).toUpperCase() + role.slice(1) || "User"}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden border border-blue-200 animate-pulse-slow">
              {user?.imageUrl && (
                <img src={user.imageUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
  collapsed: boolean
  isDarkMode: boolean
}

const NavItem = ({ to, icon, label, collapsed, isDarkMode }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-300",
          isActive
            ? isDarkMode 
              ? "bg-gradient-to-r from-gray-800 to-blue-900 text-blue-400 border border-blue-800/60 shadow-sm"
              : "bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border border-blue-200/60 shadow-sm"
            : isDarkMode
              ? "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
              : "text-black hover:bg-blue-50 hover:text-blue-700",
          collapsed && "justify-center",
          "group hover:scale-105 transform",
        )
      }
    >
      <div className="transition-transform duration-300 group-hover:rotate-3">{icon}</div>
      {!collapsed && <span className="transition-transform duration-300 group-hover:translate-x-1">{label}</span>}
    </NavLink>
  )
}