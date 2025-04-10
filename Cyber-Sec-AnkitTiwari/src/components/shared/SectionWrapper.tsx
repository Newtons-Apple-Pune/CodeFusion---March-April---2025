'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
}

export default function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-6 py-10 max-w-7xl mx-auto"
    >
      {children}
    </motion.section>
  )
}
