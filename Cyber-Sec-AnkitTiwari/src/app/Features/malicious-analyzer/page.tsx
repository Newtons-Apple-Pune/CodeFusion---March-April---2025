'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Link2, ShieldX, ShieldCheck } from "lucide-react"
import FeatureHeader from "@/components/shared/FeatureHeader"
import SectionWrapper from "@/components/shared/SectionWrapper"

export default function FileLinkAnalyzerPage() {
  const [analyzed, setAnalyzed] = useState(false)
  const [result, setResult] = useState<"safe" | "malicious" | null>(null)

  const handleAnalyze = () => {
    setAnalyzed(true)
    setTimeout(() => {
      // Randomize result for demo
      const isMalicious = Math.random() > 0.5
      setResult(isMalicious ? "malicious" : "safe")
    }, 1500)
  }

  return (
    <SectionWrapper>
      <FeatureHeader
        title="Malicious File/Link Analyzer"
        subtitle="Quickly check if a file or link is harmful using AI-powered analysis."
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg p-8 rounded-2xl"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Upload className="text-blue-600" />
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link2 className="text-green-600" />
            <input
              type="url"
              placeholder="Paste a suspicious link here..."
              className="w-full px-4 py-2 rounded border dark:bg-gray-900 dark:text-white"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleAnalyze}
            className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:to-blue-700 text-white py-2 px-6 rounded-xl font-semibold w-full mt-4"
          >
            Analyze Now
          </motion.button>
        </div>

        {analyzed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-6 text-center"
          >
            {result === null ? (
              <p className="text-gray-500 dark:text-gray-300 animate-pulse">Analyzing...</p>
            ) : result === "safe" ? (
              <div className="text-green-600 font-bold flex flex-col items-center">
                <ShieldCheck size={48} />
                This file/link is safe ✅
              </div>
            ) : (
              <div className="text-red-600 font-bold flex flex-col items-center">
                <ShieldX size={48} />
                Warning! Malicious content detected ❌
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  )
}
