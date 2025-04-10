'use client'

import { ShieldCheck, XCircle, Loader2, Fingerprint, Globe2, Smartphone } from "lucide-react"
import { motion } from "framer-motion"
import FeatureHeader from "@/components/shared/FeatureHeader"
import SectionWrapper from "@/components/shared/SectionWrapper"
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card-content"

const checks = [
  {
    id: 1,
    name: "Device Trust Check",
    icon: <Smartphone className="text-blue-500" />,
    status: "passed",
    details: "Device fingerprint matched successfully.",
  },
  {
    id: 2,
    name: "IP Reputation Check",
    icon: <Globe2 className="text-yellow-500" />,
    status: "warning",
    details: "New IP detected, reputation is average.",
  },
  {
    id: 3,
    name: "Behavioral Biometrics",
    icon: <Fingerprint className="text-purple-500" />,
    status: "failed",
    details: "Typing speed and navigation inconsistent.",
  },
]

export default function ZeroTrustLoginPage() {
  return (
    <SectionWrapper>
      <FeatureHeader
        title="Zero Trust Login System"
        subtitle="Every login undergoes deep verification before access is granted."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {checks.map((check) => (
          <motion.div
            key={check.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="shadow-lg dark:bg-gray-800 border-l-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {check.icon}
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                    {check.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                  {check.details}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium">
                  {check.status === "passed" && (
                    <>
                      <ShieldCheck className="text-green-500 w-4 h-4" />
                      <span className="text-green-500">Passed</span>
                    </>
                  )}
                  {check.status === "warning" && (
                    <>
                      <Loader2 className="text-yellow-500 w-4 h-4 animate-spin" />
                      <span className="text-yellow-500">Review Required</span>
                    </>
                  )}
                  {check.status === "failed" && (
                    <>
                      <XCircle className="text-red-500 w-4 h-4" />
                      <span className="text-red-500">Failed</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 text-center"
      >
        <p className="text-xl font-bold">
          Final Decision:{" "}
          <span className="text-red-600">Access Denied</span>
        </p>
        <p className="text-gray-500 dark:text-gray-300">
          Reason: Behavioral biometrics failed.
        </p>
      </motion.div>
    </SectionWrapper>
  )
}
