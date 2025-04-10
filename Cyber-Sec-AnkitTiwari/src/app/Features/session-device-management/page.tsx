'use client'

import { motion } from "framer-motion"
import { Laptop, Smartphone, MapPin, XCircle } from "lucide-react"
import FeatureHeader from "@/components/shared/FeatureHeader"
import SectionWrapper from "@/components/shared/SectionWrapper"

const sessions = [
  {
    id: 1,
    device: "Laptop",
    os: "Windows 11",
    browser: "Chrome",
    ip: "192.168.1.102",
    location: "Surat, India",
    current: true,
    time: "Active now",
  },
  {
    id: 2,
    device: "Smartphone",
    os: "Android 14",
    browser: "Brave",
    ip: "192.168.1.57",
    location: "Mumbai, India",
    current: false,
    time: "Last seen: 1 hour ago",
  },
  {
    id: 3,
    device: "Laptop",
    os: "Ubuntu",
    browser: "Firefox",
    ip: "192.168.1.44",
    location: "Delhi, India",
    current: false,
    time: "Last seen: 3 days ago",
  },
]

export default function SessionDeviceManagementPage() {
  return (
    <SectionWrapper>
      <FeatureHeader
        title="Session & Device Management"
        subtitle="Track and manage your active logins, devices, and session history."
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 max-w-4xl mx-auto space-y-6"
      >
        {sessions.map((session) => (
          <motion.div
            key={session.id}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`flex items-center justify-between bg-white dark:bg-gray-800 shadow p-6 rounded-xl border-l-4 ${
              session.current ? "border-green-500" : "border-gray-400"
            }`}
          >
            <div className="flex items-center gap-4">
              {session.device === "Laptop" ? (
                <Laptop className="text-blue-500" />
              ) : (
                <Smartphone className="text-purple-500" />
              )}
              <div>
                <h4 className="text-lg font-semibold dark:text-white">
                  {session.device} • {session.os}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {session.browser} • {session.ip}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-400 flex items-center gap-1">
                  <MapPin size={14} /> {session.location}
                </p>
                <p
                  className={`text-xs font-medium mt-1 ${
                    session.current ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {session.time}
                </p>
              </div>
            </div>
            {!session.current && (
              <button className="text-red-600 hover:text-red-800 transition">
                <XCircle size={24} />
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
