'use client'

import { motion } from 'framer-motion'
import { Bug, TerminalSquare, AlertTriangle, ShieldCheck } from 'lucide-react'
import FeatureHeader from '@/components/shared/FeatureHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card-content'

type SeverityLevel = 'High' | 'Critical' | 'Medium';

const simulations: { id: number; type: string; target: string; severity: SeverityLevel; status: string; timestamp: string; }[] = [
  {
    id: 1,
    type: "SQL Injection",
    target: "Login API",
    severity: "High",
    status: "Blocked",
    timestamp: "2025-04-07 12:45",
  },
  {
    id: 2,
    type: "DDoS Attack",
    target: "Main Website",
    severity: "Critical",
    status: "Success",
    timestamp: "2025-04-06 18:20",
  },
  {
    id: 3,
    type: "XSS Attempt",
    target: "Contact Form",
    severity: "Medium",
    status: "Blocked",
    timestamp: "2025-04-05 09:58",
  },
]

const severityColor = {
  High: 'text-orange-500',
  Critical: 'text-red-600',
  Medium: 'text-yellow-500',
}

export default function AttackSimulationDashboardPage() {
  return (
    <SectionWrapper>
      <FeatureHeader
        title="Attack Simulation Dashboard"
        subtitle="Visualize simulated attack attempts and test your defenses in a controlled environment."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {simulations.map((sim, i) => (
          <motion.div
            key={sim.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="shadow-lg border-l-4 dark:bg-gray-800">
              <CardContent className="p-4 space-y-2">
                    <Bug className={`${severityColor[sim.severity as SeverityLevel]} w-5 h-5`} />
                  <div className="flex items-center gap-2">
                    <Bug className={`${severityColor[sim.severity]} w-5 h-5`} />
                    <h3 className="font-bold text-gray-800 dark:text-white">{sim.type}</h3>
                  </div>
                  <span className={`text-sm font-semibold ${severityColor[sim.severity]}`}>
                    {sim.severity}
                  </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Target: {sim.target}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Timestamp: {sim.timestamp}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  {sim.status === 'Blocked' ? (
                    <ShieldCheck className="text-green-500 w-4 h-4" />
                  ) : (
                    <AlertTriangle className="text-red-500 w-4 h-4" />
                  )}
                  <span className={`text-sm font-medium ${sim.status === 'Blocked' ? 'text-green-500' : 'text-red-500'}`}>
                    {sim.status}
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
