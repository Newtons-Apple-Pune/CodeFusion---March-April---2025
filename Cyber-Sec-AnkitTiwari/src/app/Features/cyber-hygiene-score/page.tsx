'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, XCircle } from 'lucide-react'
import FeatureHeader from '@/components/shared/FeatureHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card-content'

const hygieneFactors = [
  { id: 1, name: '2FA Enabled', score: 20, status: true },
  { id: 2, name: 'Strong Passwords', score: 25, status: true },
  { id: 3, name: 'Recent Data Breach', score: -30, status: false },
  { id: 4, name: 'Security Updates Applied', score: 20, status: true },
  { id: 5, name: 'Login Location Monitoring', score: 15, status: true },
]

export default function CyberHygieneScorePage() {
  const totalScore = hygieneFactors.reduce((acc, item) => acc + (item.status ? item.score : 0), 0)
  const statusLabel = totalScore >= 75 ? 'Excellent' : totalScore >= 50 ? 'Good' : 'Needs Improvement'
  const statusColor = totalScore >= 75 ? 'text-green-500' : totalScore >= 50 ? 'text-yellow-500' : 'text-red-500'

  return (
    <SectionWrapper>
      <FeatureHeader
        title="Cyber Hygiene Score"
        subtitle="Analyze your current security health and get personalized suggestions to improve your digital safety."
      />

      <div className="flex flex-col md:flex-row gap-6 mt-10">
        {/* Score Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2"
        >
          <Card className="text-center p-6 shadow-md dark:bg-gray-800">
            <CardContent>
              <p className="text-lg text-gray-500 dark:text-gray-300 mb-2">Your Hygiene Score</p>
              <h1 className={`text-6xl font-extrabold ${statusColor}`}>{totalScore}</h1>
              <p className={`text-xl font-semibold mt-2 ${statusColor}`}>{statusLabel}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 space-y-4"
        >
          {hygieneFactors.map(factor => (
            <Card key={factor.id} className="flex items-center gap-4 p-4 border-l-4 shadow-sm dark:bg-gray-800">
              <CardContent className="flex items-center gap-4">
                {factor.status ? (
                  <ShieldCheck className="text-green-500" />
                ) : (
                  <XCircle className="text-red-500" />
                )}
                <div>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                    {factor.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {factor.status ? `+${factor.score}` : `-${Math.abs(factor.score)}`} points
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}