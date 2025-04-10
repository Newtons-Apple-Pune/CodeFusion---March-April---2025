import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'
import SessionProvider from '../components/SessionProvider'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from 'next-themes'
import PageWrapper from '@/components/PageWrapper' // ✅ Framer Motion wrapper

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cyber Security Enterprise',
  description: 'Providing cutting-edge security solutions across the globe',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
        <Navbar />
        <PageWrapper>{children}</PageWrapper>
        <Footer />
        </SessionProvider>
      </ThemeProvider>

      </body>
    </html>
  )
}