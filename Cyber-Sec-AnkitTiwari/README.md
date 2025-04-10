# 🔐 CyberSec AI – Advanced Cybersecurity Web App

Welcome to **CyberSec AI**, a modern, AI-enhanced cybersecurity dashboard that integrates cutting-edge threat detection, secure vault management, breach monitoring, and more. Built using **Next.js**, **MySQL**, **Tailwind CSS**, and integrated with **Hugging Face AI models**, this platform offers a powerful blend of functionality, aesthetics, and performance.

---

## 🚀 Features

- ✅ **User Authentication** (Sign In / Sign Up / Guest Access) using `next-auth`
- 🔐 **Secure Password Vault** with AES-256 encryption, 2FA & import/export support
- 🧠 **AI Threat Scanner** – upload files, scripts, or URLs and get real-time threat intelligence
- 🔍 **Breach Monitoring** with AI-generated insights (Root Cause, Impact, Recommendations)
- 🌐 **10 Cybersecurity Tools** with animated UI and modern interactive design
- 📊 **Analytics, Visualizations, and CSV Export**
- 🧩 **Scalable Architecture** with clean API routing & MySQL backend

---

## 🔐 Cybersecurity Features

### 🔥 1. *Breach Monitoring Alerts*
> ✅ **What:** Displays real-time alerts for any detected data breach, suspicious logins, or firewall bypasses.
> 
> 🧠 **Why:** Quick visibility into unauthorized access attempts or sensitive data leaks.
> 
> 🔐 **Benefit:** Helps the security team respond immediately. Protects data integrity and minimizes damage during a breach.

---

### 🤖 2. *AI Threat Scanner*
> ✅ **What:** Scans your system and files using an AI model trained to detect malware patterns, phishing attempts, and zero-day threats.
> 
> 🧠 **Why:** Traditional scanning relies on known signatures; AI can predict unknown or evolving threats based on behavior and patterns.
> 
> 🔐 **Benefit:** Proactive defense. Helps detect hidden or new threats before they cause damage.

---

### 🛡 3. *Cyber Hygiene Score*
> ✅ **What:** Scores your system or personal security practices (e.g., password strength, 2FA usage, update status).
> 
> 🧠 **Why:** People often ignore basic security hygiene until it’s too late.
> 
> 🔐 **Benefit:** Encourages users to maintain good digital habits. Think of it like a “credit score” for your cybersecurity health.

---

### 🎯 4. *Attack Simulation Dashboard*
> ✅ **What:** Simulates phishing, brute-force, and SQL injection attacks on a test system.
> 
> 🧠 **Why:** “Practice like you play.” You must know how your systems react under attack conditions.
> 
> 🔐 **Benefit:** Helps teams identify weaknesses, train staff, and implement fixes before a real hacker finds them.

---

### 🔐 5. *Secure Password Vault*
> ✅ **What:** Encrypted password manager built into the platform.
> 
> 🧠 **Why:** Reusing weak passwords is one of the top vulnerabilities in the world.
> 
> 🔐 **Benefit:** Helps users store strong, unique passwords securely — protected with encryption and biometric/2FA access.

---

### 📍 6. *Location-Based Login Alerts*
> ✅ **What:** Sends notifications when logins occur from unusual or geographically distant locations.
> 
> 🧠 **Why:** If a user logs in from India and then suddenly from Brazil — that’s suspicious.
> 
> 🔐 **Benefit:** Stops account takeovers in real-time. Allows users to deny or flag access attempts.

---

### 🧬 7. *Zero Trust Login System*
> ✅ **What:** Enforces multi-step authentication for every login/session based on role, location, device, and risk.
> 
> 🧠 **Why:** “Never trust, always verify.” This is modern enterprise-grade security.
> 
> 🔐 **Benefit:** Even if credentials are stolen, attackers can’t access anything sensitive without re-verifying.

---

### 🧪 8. *Interactive Security Labs*
> ✅ **What:** Real-time hacking/defense labs for users to learn ethical hacking, penetration testing, and secure coding.
> 
> 🧠 **Why:** Theory isn’t enough — hands-on learning sticks better.
> 
> 🔐 **Benefit:** Educates users and devs. Helps your team build more secure systems, reducing overall risk.

---

### 🕵 9. *Malicious File & Link Analyzer*
> ✅ **What:** Lets users upload suspicious files or paste links — the system uses AI + signatures to scan them.
> 
> 🧠 **Why:** Email attachments and links are top malware delivery channels.
> 
> 🔐 **Benefit:** Prevents phishing, ransomware, or trojan infections. A valuable tool for both users and admins.

---

### 📱 10. *Session & Device Management Dashboard*
> ✅ **What:** Shows where and how a user is logged in (devices, IP, location). Lets them terminate sessions.
> 
> 🧠 **Why:** Attackers often persist in background sessions even after a password change.
> 
> 🔐 **Benefit:** Gives users control. Stops unauthorized devices quickly. Adds transparency and protection.

---

### 💼 Bonus: Business Value Add
- These features show that *you’re thinking like a cybersecurity product designer*, not just a developer.
- This can *attract enterprise clients, boost credibility, and increase user trust and retention*.
- They’re also *future-proof*, aligning with security standards like **ISO 27001**, **GDPR**, and **NIST**.

---

## 🖼️ Project Demo

> **Frontend Preview**: [Coming Soon]  
> **Live Link**: *For local deployment instructions, see below.*  
> **Screenshots, GIFs, and Video Walkthroughs**: Included in `/public/assets/demo`

---

## ⚙️ Tech Stack

| Frontend     | Backend      | Database | AI Model       | Styling & Animations |
|--------------|--------------|----------|----------------|----------------------|
| React + Next.js (App Router) | API Routes (Node.js in Next.js) | MySQL     | Mistral-7B via Hugging Face 🤖 | Tailwind CSS, Framer Motion ✨ |

---

## 🧠 AI Model Integration

We use **Mistral 7B** via Hugging Face for AI features like threat scanning and breach analysis.  
API Key is managed via `.env.local` for **secure handling of secrets**.

---

## 🔧 Installation & Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Ankit2004tiwari/Cyber-Sec.git
cd Cyber-Sec
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
HUGGINGFACE_API_KEY=your_huggingface_token
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=cyber_security_db
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Configure MySQL Database

Create the database and required tables:

```sql
CREATE DATABASE cyber_security_db;

USE cyber_security_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Repeat for other tables like security_logs, security_alerts
```

📄 Full schema is available in `/docs/database-schema.sql`

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to explore the dashboard.

---

## 📁 Folder Structure

```bash
src/
  app/
    api/
      auth/
      scan/
      analyze-breach/
    dashboard/
    features/
  components/
  lib/
  styles/
public/
.env.local
```

---

## 🛡️ Security Measures

- All secrets managed in `.env.local`
- Passwords are hashed with bcrypt
- 2FA implemented in Secure Vault
- AI analysis is sandboxed and token-regulated
- Sanitized inputs to avoid XSS/Injection attacks

---

## 🙌 Want to Contribute?

Pull requests are welcome! Please open an issue first to discuss changes.

---

✅ PDF documentation and visual pitch decks available upon request. 
✨ Stay secure, stay smart with **CyberSec AI**!