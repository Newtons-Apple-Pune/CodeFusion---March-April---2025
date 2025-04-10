"use client"
import { Bell, Search } from "lucide-react"
import { useUser, UserButton } from "@clerk/clerk-react"
import { Input } from "@/components/ui/input"
import { THEME_COLORS } from "@/lib/theme"
import { cn } from "@/lib/utils"

export const TopBar = () => {
  const { user } = useUser()

  return (
    <header className={`bg-white border-b ${THEME_COLORS.borderMuted} sticky top-0 z-10 ${THEME_COLORS.cardShadow}`}>
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Search Bar Section */}
        <div className="flex-1 flex items-center">
          <div className="relative w-full max-w-xs md:max-w-sm animate-slide-in-left">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
              <Search className="h-4 w-4" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              className={cn(
                `pl-10 w-full h-9 rounded-md ${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.textPrimary}`,
                `focus:outline-none focus:ring-1 ${THEME_COLORS.inputFocusBorder}`,
                `transition-colors duration-200`,
              )}
            />
          </div>
        </div>
        {/* Right side actions */}
        <div className="flex items-center space-x-4 md:space-x-5 animate-slide-in-right">
          {/* Notifications Button */}
          <div className="relative">
            <button
              className={`p-1.5 rounded-full ${THEME_COLORS.iconColor} ${THEME_COLORS.iconColorHover} ${THEME_COLORS.hoverBg} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            >
              <Bell className="h-5 w-5" />
              {/* Notification Dot - adjusted for new theme */}
              <span className="absolute top-0.5 right-0.5 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
            </button>
            {/* Add Dropdown logic here if needed */}
          </div>
          {/* Clerk User Button */}
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8",
                userButtonPopoverCard: `${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow}`,
                userButtonPopoverMain: `${THEME_COLORS.textPrimary}`,
                userButtonPopoverActions: `${THEME_COLORS.textSecondary}`,
              },
            }}
          />
        </div>
      </div>
    </header>
  )
}
