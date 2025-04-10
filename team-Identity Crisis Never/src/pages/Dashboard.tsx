"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AppLayout } from "@/components/layout/AppLayout"
import { useUser } from "@clerk/clerk-react"
import { Activity, Users, Calendar, Building2, TrendingUp } from "lucide-react"
import { THEME_COLORS } from "@/lib/theme"

// --- Main Dashboard Component ---
const Dashboard = () => {
  const { user } = useUser()
  const userRole = (user?.publicMetadata?.role as string) || "Employee"

  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.id || entry.target.getAttribute("data-widget-id")
          if (elementId && entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible((prev) => ({ ...prev, [elementId]: true }))
            }, 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px", threshold: 0.1 },
    )

    const sections = document.querySelectorAll(".animate-on-scroll")
    sections.forEach((section) => {
      if (section.id || section.getAttribute("data-widget-id")) observer.observe(section)
    })

    return () =>
      sections.forEach((section) => {
        if (section.id || section.getAttribute("data-widget-id")) observer.unobserve(section)
      })
  }, [])

  const getAnimationClass = (id: string, delay = "delay-0") => {
    const baseTransition = "transition-all duration-700 ease-out"
    const loadedClass = isLoaded ? "opacity-100" : "opacity-0 translate-y-6"
    const visibleClass = isVisible[id] ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
    return `${baseTransition} ${isLoaded ? visibleClass : loadedClass} ${delay} hover:scale-102 hover:shadow-lg transition-transform duration-300`
  }

  return (
    <AppLayout>
      <div className={`space-y-8 p-4 md:p-6 lg:p-8 ${THEME_COLORS.primaryGradient} min-h-screen text-black dark:text-white`}>
        <div
          id="dashboard-header"
          data-widget-id="dashboard-header"
          className={`flex items-center justify-between mb-8 animate-on-scroll ${getAnimationClass("dashboard-header")}`}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-green-500">
              Dashboard Overview
            </h1>
            <p className={`mt-2 ${THEME_COLORS.textSecondary}`}>
              Welcome back, {user?.firstName || "User"}! Here's what's happening today.
            </p>
          </div>
          <span
            className={`text-sm px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} text-black dark:text-white`}
          >
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            id="stat-employees"
            data-widget-id="stat-employees"
            className={`animate-on-scroll ${getAnimationClass("stat-employees", "delay-100")}`}
          >
            <QuickStat
              title="Total Employees"
              value="60"
              change="+2"
              icon={<Users className={`h-6 w-6 ${THEME_COLORS.iconColorGreen}`} />}
            />
          </div>
          <div
            id="stat-utilization"
            data-widget-id="stat-utilization"
            className={`animate-on-scroll ${getAnimationClass("stat-utilization", "delay-200")}`}
          >
            <QuickStat
              title="Workspace Use %"
              value="78%"
              change="+5%"
              icon={<Building2 className={`h-6 w-6 ${THEME_COLORS.iconColor}`} />}
            />
          </div>
          <div
            id="stat-projects"
            data-widget-id="stat-projects"
            className={`animate-on-scroll ${getAnimationClass("stat-projects", "delay-300")}`}
          >
            <QuickStat
              title="Active Projects"
              value="18"
              change="+3"
              icon={<Activity className={`h-6 w-6 ${THEME_COLORS.iconColorTeal}`} />}
            />
          </div>
          <div
            id="stat-leaves"
            data-widget-id="stat-leaves"
            className={`animate-on-scroll ${getAnimationClass("stat-leaves", "delay-[400ms]")}`}
          >
            <QuickStat
              title="Upcoming Leaves"
              value="9"
              change="-1"
              icon={<Calendar className={`h-6 w-6 ${THEME_COLORS.accentBlue}`} />}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

// --- Enhanced QuickStat Component with Animations ---
const QuickStat = ({
  title,
  value,
  change,
  icon,
}: { title: string; value: string; change: string; icon: React.ReactNode }) => {
  const isPositive = change.startsWith("+")
  const changeColor = isPositive ? THEME_COLORS.positiveChange : THEME_COLORS.negativeChange

  return (
    <Card
      className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium text-black dark:text-gray-300 mb-1 capitalize`}>{title}</p>
            <p className={`text-2xl font-bold text-black dark:text-white animate-pulse-subtle`}>{value}</p>
            <p className={`text-xs mt-1 ${changeColor} flex items-center`}>
              {change}
              <span className="ml-1 text-xs">vs last week</span>
            </p>
          </div>
          <div
            className={`h-12 w-12 ${THEME_COLORS.inputBg} rounded-full flex items-center justify-center ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-transform duration-300 hover:scale-110`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Add custom animations
const styles = `
  @keyframes pulse-subtle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  .animate-pulse-subtle {
    animation: pulse-subtle 3s infinite;
  }
  @keyframes slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-slide-up {
    animation: slide-up 0.7s ease-out;
  }
  .hover\:scale-102:hover {
    transform: scale(1.02);
  }
  .animation-delay-100 {
    animation-delay: 100ms;
  }
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  .animation-delay-300 {
    animation-delay: 300ms;
  }
  .animation-delay-400 {
    animation-delay: 400ms;
  }
  .animation-delay-500 {
    animation-delay: 500ms;
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
`

const styleSheet = document.createElement("style")
styleSheet.textContent = styles
document.head.appendChild(styleSheet)

export default Dashboard