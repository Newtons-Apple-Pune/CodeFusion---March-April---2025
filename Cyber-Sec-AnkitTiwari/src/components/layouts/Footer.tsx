'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Mail, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const footerData = [
  {
    title: 'Services',
    links: [
      { href: '/services/consulting', label: 'Consulting' },
      { href: '/services/training', label: 'Training' },
      { href: '/services/auditing', label: 'Auditing' },
      { href: '/services/monitoring', label: 'Monitoring' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/whitepapers', label: 'Whitepapers' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/webinars', label: 'Webinars' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: '/contact', label: 'Get in Touch' },
      { href: '/support', label: 'Support' },
      { href: '/careers', label: 'Careers' },
    ],
  },
]

export default function Footer() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="bg-secondary text-foreground pt-14 pb-8 mt-12 border-t border-border transition-colors duration-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Logo + Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-2xl font-extrabold mb-3 tracking-tight text-primary">CyberSec</h3>
          <p className="text-muted-foreground max-w-xs">
            Protecting your digital future with cutting-edge solutions.
          </p>
          <div className="flex space-x-4 mt-4">
            <SocialIcon Icon={Facebook} href="#" />
            <SocialIcon Icon={Twitter} href="#" />
            <SocialIcon Icon={Linkedin} href="#" />
            <SocialIcon Icon={Mail} href="mailto:contact@cybersec.com" />
          </div>
        </motion.div>

        {/* Sections */}
        {footerData.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-3 text-primary">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-start"
        >
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="mt-1 flex items-center space-x-2 text-sm bg-muted hover:bg-muted/80 px-4 py-2 rounded-xl transition"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-blue-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          )}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 text-center text-sm text-muted-foreground px-4">
        &copy; {new Date().getFullYear()} CyberSec. All rights reserved.
      </div>
    </footer>
  )
}

function SocialIcon({ Icon, href }: { Icon: any; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary transition-colors"
    >
      <Icon className="w-5 h-5" />
    </a>
  )
}
