Project Name: CyberSecureDocs

Team Members: Ayushi Singh, Himani Rane, Himanshi Sharma, Siddhi Misal

CyberSecureDocs is a cybersecurity-enterprise-focused website that allows users to upload log files and images for automated analysis. The system detects potential vulnerabilities in logs (e.g., XSS, SQL Injection) and checks whether uploaded image files are corrupted. Secure file management, user authentication, and historical tracking are core components of the site.

---

## 🚀 Features

- 🔐 **User Authentication** with NextAuth (Signup/Login)
- 📄 **Log File Vulnerability Detection** (XSS, SQLi, Access Breaches, etc.)
- 🖼️ **Image File Corruption Check**
- 📊 **Personal Dashboard** with:
  - "My Documents"
  - "Uploaded Images"
  - "Analysis"
- 💾 **Secure File Uploads** (log files & images)
- 📥 **Downloadable Analysis Reports**
- 🧠 **Real-Time Vulnerability Parsing**
- 🗃️ **User-Based Upload History**
- 🌐 **Responsive UI** built with TailwindCSS and shadcn/ui

---

## 🛠️ Tech Stack

| Layer              | Technologies |
|-------------------|--------------|
| **Frontend**       | Next.js (App Router), React, Tailwind CSS, shadcn/ui, TypeScript |
| **Backend**        | API Routes (Next.js), Node.js |
| **Authentication** | NextAuth |
| **Database**       | PostgreSQL, Prisma ORM, Neon Console |
| **Storage**        | Local filesystem (`/public/uploads`) |
| **Analysis Logic** | Custom-built parsers for logs and image checks |
| **Icons**          | Lucide |

---

## ⚙️ Setup & Usage Instructions

1️⃣ Clone the Repository
git clone https://github.com/your-username/cybersecuredocs.git
cd cybersecuredocs

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables
DATABASE_URL=your_postgres_connection_string
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

You can generate a secret using:
openssl rand -base64 32

4️⃣ Prisma Setup
npx prisma generate
npx prisma migrate dev --name init

5️⃣ Run the App
npm run dev
Visit: http://localhost:3000

Folder Structure:
/app
  /api
    /log-analysis
    /image-check
    /user
      /documents
      /images
  /dashboard
  /auth
  /upload
/lib
  analyzeLog.ts
  imageCheck.ts
  auth.ts
  prisma.ts
/public/uploads
/prisma
  schema.prisma

DEMO.mp4
https://github.com/user-attachments/assets/c65592d4-3f04-4427-bc6a-86040550454b
provided in repo

NOTE: node_modules and .next folder aren't included in src
