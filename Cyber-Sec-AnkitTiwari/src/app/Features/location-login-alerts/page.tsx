'use client'

import { MapPin, Globe2, AlertCircle, Smartphone } from "lucide-react"
import { motion } from "framer-motion"
import FeatureHeader from "@/components/shared/FeatureHeader"
import SectionWrapper from "@/components/shared/SectionWrapper"
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card-content"

const loginAlerts = [
  {
    id: 1,
    ip: "192.168.0.104",
    location: "Mumbai, India",
    device: "Chrome on Windows",
    riskLevel: "High",
    time: "2025-04-06 18:42",
  },
  {
    id: 2,
    ip: "185.23.87.10",
    location: "Berlin, Germany",
    device: "Firefox on Linux",
    riskLevel: "Medium",
    time: "2025-04-05 08:12",
  },
  {
    id: 3,
    ip: "45.76.12.205",
    location: "New York, USA",
    device: "Safari on iPhone",
    riskLevel: "Low",
    time: "2025-04-04 22:33",
  },
]

export default function LocationLoginAlertsPage() {
  return (
    <SectionWrapper>
      <FeatureHeader
        title="Location-Based Login Alerts"
        subtitle="Get notified when logins happen from new or unexpected places."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {loginAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="shadow-lg dark:bg-gray-800 border-l-4 border-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe2 className="text-yellow-500" />
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                    Login Attempt
                  </h3>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-300">
                  <MapPin className="inline-block w-4 h-4 mr-1" />
                  Location: {alert.location}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-300">
                  IP: {alert.ip}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-300">
                  <Smartphone className="inline-block w-4 h-4 mr-1" />
                  Device: {alert.device}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Risk Level:{" "}
                  <span
                    className={`font-semibold ${
                      alert.riskLevel === "High"
                        ? "text-red-600"
                        : alert.riskLevel === "Medium"
                        ? "text-orange-400"
                        : "text-green-500"
                    }`}
                  >
                    {alert.riskLevel}
                  </span>
                </p>

                <p className="text-sm text-gray-400 mt-1">Time: {alert.time}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
