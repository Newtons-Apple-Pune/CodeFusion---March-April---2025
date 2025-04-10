'use client'

import { motion } from "framer-motion"
import { Bug, Terminal, Lock, ShieldCheck } from "lucide-react"
import FeatureHeader from "@/components/shared/FeatureHeader"
import SectionWrapper from "@/components/shared/SectionWrapper"
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card-content"

const labs = [
  {
    id: 1,
    title: "XSS Attack Simulation",
    icon: <Terminal className="text-yellow-500" />,
    description: "Understand how Cross Site Scripting works and how to defend it.",
    difficulty: "Medium",
    status: "completed",
  },
  {
    id: 2,
    title: "SQL Injection Lab",
    icon: <Bug className="text-red-500" />,
    description: "Inject queries and see how poor validation opens vulnerabilities.",
    difficulty: "Hard",
    status: "in-progress",
  },
  {
    id: 3,
    title: "CSRF Protection Setup",
    icon: <ShieldCheck className="text-green-500" />,
    description: "Learn how to implement tokens and block forged requests.",
    difficulty: "Easy",
    status: "locked",
  },
]

export default function SecurityLabsPage() {
  return (
    <SectionWrapper>
      <FeatureHeader
        title="Interactive Security Labs"
        subtitle="Explore and practice real-world security attacks and defenses in a safe environment."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {labs.map((lab) => (
          <motion.div
            key={lab.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="shadow-xl dark:bg-gray-800 border-l-4 border-indigo-500">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  {lab.icon}
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {lab.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {lab.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Difficulty: <strong>{lab.difficulty}</strong>
                  </span>
                  <span className={`text-xs font-semibold rounded px-2 py-1
                    ${lab.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                    ${lab.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${lab.status === 'locked' ? 'bg-gray-200 text-gray-600' : ''}
                  `}>
                    {lab.status === 'locked' ? 'Locked 🔒' : lab.status.replace("-", " ")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
