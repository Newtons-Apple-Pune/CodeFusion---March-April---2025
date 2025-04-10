'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const router = useRouter();
  const [confetti, setConfetti] = useState(false);

  const handleSelect = (type: 'login' | 'signup' | 'guest') => {
    localStorage.setItem('userType', type);
    setConfetti(true);

    setTimeout(() => {
      if (type === 'login') {
        router.push('/signin');
      } else if (type === 'signup') {
        router.push('/signup');
      } else {
        router.push('/dashboard');
      }
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6 text-center"
    >
      {confetti && <Confetti recycle={false} numberOfPieces={300} />}

      <motion.h1
        className="text-4xl sm:text-6xl font-bold mb-8 text-gray-800"
        whileHover={{ scale: 1.05 }}
      >
        Welcome to CyberGuard Platform 🛡️
      </motion.h1>

      <p className="text-lg text-gray-600 mb-10 max-w-xl">
        Secure your digital world with powerful features, threat detection, and user-friendly security tools.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => handleSelect('login')} className="text-white bg-blue-600 hover:bg-blue-700">
          Sign In
        </Button>
        <Button onClick={() => handleSelect('signup')} className="text-white bg-blue-600 hover:bg-blue-700">
          Sign Up
        </Button>
        <Button onClick={() => handleSelect('guest')} className="text-white bg-gray-600 hover:bg-gray-700">
          Continue as Guest
        </Button>
      </div>
    </motion.div>
  );
}
