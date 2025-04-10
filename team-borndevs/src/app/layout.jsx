import './globals.css';
import FloatingNavbar from '../components/Navbar';
import localFont from 'next/font/local';
import { Bricolage_Grotesque, Work_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';
import ChatBotButton from '@/components/ChatBotButton';

const circular = localFont({
  variable: '--font-paragraph',
  display: 'swap',
  src: [
    {
      path: './fonts/CircularStd-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/CircularStd-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/CircularStd-Book.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

// primary font
const work_sans = Work_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '500', '600', '700', '800'],
  variable: '--font-primary',
  display: 'swap',
});

// secondary font
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '300', '500', '600', '700', '800'],
  variable: '--font-secondary',
  display: 'swap',
});

export const metadata = {
  title: 'Vulnuris',
  description: 'Find > Fix > Fortify',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          circular.variable,
          work_sans.variable,
          bricolage.variable,
          'font-paragraph',
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
          <main>
            <FloatingNavbar />
            {children}
            <ChatBotButton />
            <div className='bg-foreground/5 backdrop-blur-sm dark:bg-white/10'>
              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}