import { Search, Brain, Mail, Target, Cloud, Bell } from "lucide-react";
const colorMap = {
  blue: 'from-blue-500 to-blue-800 dark:to-blue-950',
  violet: 'from-violet-500 to-violet-800 dark:to-violet-950',
  red: 'from-red-500 to-red-800 dark:to-red-950',
  orange: 'from-orange-500 to-orange-800 dark:to-orange-950',
  cyan: 'from-cyan-500 to-cyan-800 dark:to-cyan-950',
  green: 'from-green-500 to-green-800 dark:to-green-950',
};

export default function WhatWeDo() {
  return (
    <div className="flex flex-col gap-4 py-10 md:w-2/3 mx-auto border-t">
      <h2 className="text-4xl font-bold text-center">What We Do?</h2>
      <p className="text-md text-muted-foreground text-center max-w-xl mx-auto">
        At Vulnuris, we help organizations take control of their cybersecurity posture through intelligent products and expert-led services.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {[
          { icon: Search, title: "Security Visibility & Risk Prioritization", desc: "Continuously discover assets, detect vulnerabilities with AI, and prioritize risks with context using our Insight Platform.", color: "blue" },
          { icon: Brain, title: "Tailored Threat Intelligence", desc: "Get actionable insights with curated threat feeds, dark web monitoring, and executive briefings via Vulnuris Threat Intel.", color: "violet" },
          { icon: Mail, title: "Phishing Simulation & Awareness", desc: "Empower your team with phishing simulations, automated training, and in-depth reporting through PhishGuard.", color: "red" },
          { icon: Target, title: "Offensive Security Services", desc: "Identify and remediate weaknesses with Penetration Testing and Vulnerability Assessments.", color: "orange" },
          { icon: Cloud, title: "Cloud Security Expertise", desc: "Secure your AWS, Azure, and GCP environments with expert reviews, architecture design, and real-time monitoring.", color: "cyan" },
          { icon: Bell, title: "Incident Response & Advisory", desc: "Respond fast to breaches and enhance your security strategy with our Incident Response and Security Advisory services.", color: "green" }
        ].map((item, index) => (
          <div
            key={index}
            className={`border rounded-lg px-6 py-4 bg-gradient-to-br ${colorMap[item.color]} text-white relative overflow-hidden`}
          >
            <span className="absolute -top-4 -right-2 text-8xl font-bold opacity-10">
              {`0${index + 1}`}
            </span>
            <div className="flex items-center gap-2 mb-2 relative">
              <item.icon className="w-5 h-5" />
              <h3 className="font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm relative">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
