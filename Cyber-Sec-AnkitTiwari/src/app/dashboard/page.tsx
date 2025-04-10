'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const features = [
  {
    name: 'Breach Monitoring Alerts',
    slug: 'breach-monitoring',
    description:
      'Real-time alerts for breaches, suspicious logins, and firewall bypass attempts. Immediate notifications empower your team to act fast and protect critical data.',
  },
  {
    name: 'AI Threat Scanner',
    slug: 'ai-threat-scanner',
    description:
      'Leverages cutting-edge AI to detect malware, phishing, and zero-day threats, ensuring proactive defense against evolving cyber risks.',
  },
  {
    name: 'Cyber Hygiene Score',
    slug: 'cyber-hygiene-score',
    description:
      'Evaluates your security practices including password strength, 2FA usage, and system updates – think of it as a credit score for your cybersecurity health.',
  },
  {
    name: 'Attack Simulation',
    slug: 'attack-simulation',
    description:
      'Simulate real-world attacks like phishing, brute-force, and SQL injection to uncover vulnerabilities and train your team in a risk-free environment.',
  },
  {
    name: 'Secure Password Vault',
    slug: 'password-vault',
    description:
      'An encrypted vault for managing your passwords safely, ensuring you use strong, unique credentials while safeguarding against unauthorized access.',
  },
  {
    name: 'Location-Based Login Alerts',
    slug: 'location-login-alerts',
    description:
      'Get notified when logins occur from unusual or distant locations, helping you quickly identify and prevent potential account takeovers.',
  },
  {
    name: 'Zero Trust Login System',
    slug: 'zero-trust-login',
    description:
      'Implements continuous, multi-step authentication that verifies every access attempt, ensuring no one is trusted by default—even if credentials are compromised.',
  },
  {
    name: 'Interactive Security Labs',
    slug: 'security-labs',
    description:
      'Hands-on labs that let you practice ethical hacking, penetration testing, and secure coding in real-time, building your skills through experience.',
  },
  {
    name: 'Malicious File & Link Analyzer',
    slug: 'malicious-analyzer',
    description:
      'Scan files and URLs for potential threats using a combination of AI and signature analysis, keeping malware, ransomware, and phishing attacks at bay.',
  },
  {
    name: 'Session & Device Management Dashboard',
    slug: 'session-device-management',
    description:
      'Gain complete visibility and control over active sessions and devices, allowing you to quickly terminate unauthorized access and secure your environment.',
  },
];


export default function DashboardPage() {
  const [userType, setUserType] = useState<string>('guest');
  const [userName, setUserName] = useState<string>('Guest');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const type = localStorage.getItem('userType') || 'guest';
        setUserType(type);
  
        if (type === 'login' || type === 'register') {
          const response = await axios.get('/api/getUserName');
          const data = response.data as { name?: string };
          
          setUserName(data.name || 'User');
        } else {
          setUserName('Guest');
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
        setUserName('Guest');
      }
    };
  
    fetchUserName();
  }, []);
  
  

  const greeting = (() => {
    if (userType === 'login') {
      return `Welcome back, ${userName}! We're thrilled to have our security expert back in action. 🔐`;
    }
    if (userType === 'register') {
      return `Welcome aboard, ${userName}! 🚀 Your journey toward a secure digital future starts here.`;
    }
    return `You're in Guest Mode 👀 – Explore our powerful features and experience top-notch cybersecurity.`;
  })();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-4 sm:px-6 md:px-8 py-10 bg-gradient-to-tr from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900"
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-blue-800 dark:text-blue-400 drop-shadow-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {greeting}
      </motion.h2>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg max-w-2xl mx-auto">
        Dive into your personalized dashboard to explore our suite of innovative cybersecurity tools.
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <Link href={`/Features/${feature.slug}`}>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
                  {feature.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// // Feature list with names, slugs, and detailed descriptions
// const features = [
//   {
//     name: 'Breach Monitoring Alerts',
//     slug: 'breach-monitoring',
//     description:
//       'Real-time alerts for breaches, suspicious logins, and firewall bypass attempts. Immediate notifications empower your team to act fast and protect critical data.',
//   },
//   {
//     name: 'AI Threat Scanner',
//     slug: 'ai-threat-scanner',
//     description:
//       'Leverages cutting-edge AI to detect malware, phishing, and zero-day threats, ensuring proactive defense against evolving cyber risks.',
//   },
//   {
//     name: 'Cyber Hygiene Score',
//     slug: 'cyber-hygiene-score',
//     description:
//       'Evaluates your security practices including password strength, 2FA usage, and system updates – think of it as a credit score for your cybersecurity health.',
//   },
//   {
//     name: 'Attack Simulation',
//     slug: 'attack-simulation',
//     description:
//       'Simulate real-world attacks like phishing, brute-force, and SQL injection to uncover vulnerabilities and train your team in a risk-free environment.',
//   },
//   {
//     name: 'Secure Password Vault',
//     slug: 'password-vault',
//     description:
//       'An encrypted vault for managing your passwords safely, ensuring you use strong, unique credentials while safeguarding against unauthorized access.',
//   },
//   {
//     name: 'Location-Based Login Alerts',
//     slug: 'location-login-alerts',
//     description:
//       'Get notified when logins occur from unusual or distant locations, helping you quickly identify and prevent potential account takeovers.',
//   },
//   {
//     name: 'Zero Trust Login System',
//     slug: 'zero-trust-login',
//     description:
//       'Implements continuous, multi-step authentication that verifies every access attempt, ensuring no one is trusted by default—even if credentials are compromised.',
//   },
//   {
//     name: 'Interactive Security Labs',
//     slug: 'security-labs',
//     description:
//       'Hands-on labs that let you practice ethical hacking, penetration testing, and secure coding in real-time, building your skills through experience.',
//   },
//   {
//     name: 'Malicious File & Link Analyzer',
//     slug: 'malicious-analyzer',
//     description:
//       'Scan files and URLs for potential threats using a combination of AI and signature analysis, keeping malware, ransomware, and phishing attacks at bay.',
//   },
//   {
//     name: 'Session & Device Management Dashboard',
//     slug: 'session-device-management',
//     description:
//       'Gain complete visibility and control over active sessions and devices, allowing you to quickly terminate unauthorized access and secure your environment.',
//   },
// ];

// export default function DashboardPage() {
//   const [userType, setUserType] = useState<string>('guest');
//   const [userName, setUserName] = useState<string>('Guest');

//   useEffect(() => {
//     const type = localStorage.getItem('userType') || 'guest';
//     const storedName = localStorage.getItem('userName');
//     setUserType(type);
//     setUserName(storedName ? storedName : type === 'guest' ? 'Guest' : 'User');
//   }, []);

//   const greeting = (() => {
//     if (userType === 'login') {
//       return `Welcome back, ${userName}! We're thrilled to have our security expert back in action. 🔐`;
//     }
//     if (userType === 'register') {
//       return `Welcome aboard, ${userName}! 🚀 Your journey towards a more secure digital future starts here.`;
//     }
//     return `You're in Guest Mode 👀 – Explore our powerful features and experience top-notch cybersecurity.`;
//   })();

//   // Animation variants for feature cards
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="p-6 max-w-7xl mx-auto"
//     >
//       <motion.h2
//         className="text-3xl sm:text-4xl font-bold mb-4 text-center text-blue-800 drop-shadow-md"
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {greeting}
//       </motion.h2>

//       <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">
//         Dive into your personalized dashboard to explore our suite of innovative cybersecurity tools.
//       </p>

//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: {},
//           visible: { transition: { staggerChildren: 0.2 } },
//         }}
//       >
//         {features.map((feature, i) => (
//           <motion.div
//             key={i}
//             variants={cardVariants}
//             whileHover={{ scale: 1.05, boxShadow: '0px 8px 20px rgba(0,0,0,0.15)' }}
//             whileTap={{ scale: 0.98 }}
//             className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
//           >
//             <Link href={`/Features/${feature.slug}`}>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-indigo-600">{feature.name}</h3>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// }