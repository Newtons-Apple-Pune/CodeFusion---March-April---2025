'use client'

import { motion } from 'framer-motion'

interface FeatureHeaderProps {
  title: string
  subtitle: string
}

export default function FeatureHeader({ title, subtitle }: FeatureHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8 text-center"
    >
      <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">{subtitle}</p>
    </motion.div>
  )
}
