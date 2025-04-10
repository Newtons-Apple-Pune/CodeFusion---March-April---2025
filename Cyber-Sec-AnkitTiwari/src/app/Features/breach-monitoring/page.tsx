"use client";

import { SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent } from "@/components/ui/card";

// Import Lucide icons safely with fallback
import * as LucideIcons from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const NoSSRCSVLink = dynamic(
  () => import("react-csv").then((mod) => mod.CSVLink),
  {
    ssr: false,
  }
);

const breachIcons = {
  Malware: <LucideIcons.Bug className="text-red-400" size={24} />,
  Phishing: <LucideIcons.AlertTriangle className="text-yellow-400" size={24} />,
  "Unauthorized Access": (
    <LucideIcons.Shield className="text-blue-400" size={24} />
  ),
  "Network Intrusion": (
    <LucideIcons.WifiOff className="text-pink-400" size={24} />
  ),
};

const severityColor = {
  High: "bg-red-600 text-white",
  Medium: "bg-yellow-300 text-black",
  Low: "bg-green-500 text-white",
};

interface Breach {
  id: number;
  type: string;
  severity: string;
  description: string;
  mitigation: string;
  timestamp: string;
  aiInsights?: {
    rootCause?: string;
    impact?: string;
    recommendation?: string;
  };
}

const analyzeBreachWithAI = async (description: string) => {
  try {
    const res = await fetch("/api/analyze-breach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    if (!res.ok) throw new Error("Failed to analyze breach");

    const data = await res.json();
    return data; // { rootCause, impact, recommendation }
  } catch (error) {
    console.error("AI analysis error:", error);
    return null;
  }
};

const exportData = (format: "csv" | "pdf" | "json", breachData: Breach[]) => {
  // Implementation for different export formats
  switch (format) {
    case "csv":
      // Your existing CSV export
      break;
    case "pdf":
      toast.info("Generating PDF report...");
      // Implement PDF export
      break;
    case "json":
      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(breachData, null, 2)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "breach_data.json";
      link.click();
      break;
  }
};

// Create a separate component for the floating particles
const FloatingParticles = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      top: number;
      left: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            animation: `float ${particle.duration}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

// Create a separate component for the monitoring status using dynamic import
const MonitoringStatus = dynamic(
  () =>
    Promise.resolve(() => {
      const [currentTime, setCurrentTime] = useState(new Date());

      useEffect(() => {
        const timer = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
      }, []);

      return (
        <p className="text-sm text-gray-600 mt-1">
          Last checked: {currentTime.toLocaleTimeString()}
        </p>
      );
    }),
  {
    ssr: false, // This ensures the component only renders on the client
  }
);

export default function BreachMonitoringPage() {
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [selectedInsights, setSelectedInsights] = useState<{
    rootCause: string;
    impact: string;
    recommendation: string;
  } | null>(null);

  const [breachData, setBreachData] = useState<Breach[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);

  const breachesPerPage = 5;

  const [monitoringStatus, setMonitoringStatus] = useState({
    active: true,
    lastChecked: new Date(),
    systemsMonitored: 12,
  });

  const [showQuickActions, setShowQuickActions] = useState(false);

  const [prompt, setPrompt] = useState(""); // State to store the user-entered prompt
  const [aiResponse, setAiResponse] = useState<{
    rootCause?: string;
    impact?: string;
    recommendation?: string;
  } | null>(null); // State to store AI response

  const handleAnalyzeWithAI = async () => {
    try {
      const res = await fetch("/api/analyze-breach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: prompt }), // Send the prompt to the backend
      });

      if (!res.ok) {
        throw new Error(`Analysis failed: ${res.statusText}`);
      }

      const data = await res.json();
      setAiResponse(data); // Store the AI response
    } catch (error) {
      console.error("AI analysis error:", error);
      toast.error("Failed to analyze breach with AI");
    }
  };

  useEffect(() => {
    const fetchBreachData = async () => {
      try {
        const response = await fetch("/api/analyze-breach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: "Malware detected on internal server node-17.",
          }),
        });
        const data = await response.json();
        const formattedData = [
          {
            id: 1,
            type: "Malware",
            severity: "High",
            description: "Malware detected on internal server node-17.",
            mitigation: "Isolate the server and run deep antivirus scans.",
            timestamp: "2025-04-08 14:23",
            aiInsights: data,
          },
          {
            id: 2,
            type: "Network Intrusion",
            severity: "Low",
            description:
              "Unusual port scanning activity detected from external IP.",
            mitigation:
              "Updated firewall rules and blocked suspicious IP addresses.",
            timestamp: "2025-04-09 09:30",
            aiInsights: {
              rootCause:
                "Automated port scanning tool detected probing network vulnerabilities",
              impact:
                "Minimal impact as all critical services are properly secured",
              recommendation:
                "Continue monitoring for repeated attempts and consider implementing IPS",
            },
          },
          {
            id: 3,
            type: "Phishing",
            severity: "Medium",
            description: "Phishing email targeting employees.",
            mitigation: "Educate employees and block malicious domains.",
            timestamp: "2025-04-09 10:15",
          },
        ];

        setBreachData(formattedData);
      } catch (error: any) {
        console.error("Error fetching breach data:", error.message || error);
      }
    };

    fetchBreachData();
  }, []);

  useEffect(() => {
    const critical = breachData.find((b) => b.severity === "High");
    if (critical) {
      toast.error("High severity breach detected: " + critical.description);
    }
  }, [breachData]);

  const filtered = breachData.filter(
    (b) =>
      (severityFilter === "All" || b.severity === severityFilter) &&
      (searchTerm === "" ||
        b.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const currentBreaches = filtered.slice(
    currentPage * breachesPerPage,
    (currentPage + 1) * breachesPerPage
  );

  const chartCounts = [
    "Malware",
    "Phishing",
    "Unauthorized Access",
    "Network Intrusion",
  ].map((type) => filtered.filter((b) => b.type === type).length);

  const chartData = {
    labels: ["Malware", "Phishing", "Unauthorized Access", "Network Intrusion"],
    datasets: [
      {
        data: chartCounts,
        backgroundColor: ["#e11d48", "#eab308", "#3b82f6", "#f97316"],
      },
    ],
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd] dark:from-[#0c4a6e] dark:via-[#082f49] dark:to-[#1e3a8a]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse top-[-200px] left-[-200px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-300/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 top-[30%] right-[-100px]"></div>
        <div className="absolute w-[300px] h-[300px] bg-cyan-300/20 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000 bottom-[-100px] left-[40%]"></div>

        {/* Replace the old particles with the new component */}
        <FloatingParticles />
      </div>

      {/* Updated title with darker colors */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 pt-8 pb-4"
      >
        <h1 className="text-center text-5xl font-extrabold mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-purple-800 to-cyan-800 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            🚨 AI-Powered Breach Monitoring
          </span>
        </h1>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-700 to-purple-700 rounded-full"></div>
      </motion.div>

      {/* Input and Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-wrap md:flex-nowrap justify-center items-center gap-4 mx-4 md:mx-8 my-10 p-6 rounded-xl bg-white/30 backdrop-blur-xl border border-gray-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
      >
        {/* Textarea */}
        <textarea
          className="w-full md:w-2/3 p-3 rounded-lg bg-white/50 backdrop-blur border border-gray-400 placeholder-gray-600 text-gray-800 focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter a description of the breach to analyze..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
        />

        {/* Button */}
        <button
          className="py-2.5 px-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md font-medium text-white text-sm shadow-md hover:shadow-lg transition"
          onClick={handleAnalyzeWithAI}
        >
          Analyze with AI
        </button>
      </motion.div>

      {/* Display AI Response */}
      {aiResponse && (
        <div className="relative z-10 mx-4 md:mx-8 mt-6 p-6 rounded-xl bg-white/50 backdrop-blur-xl border border-gray-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
          <h2 className="text-xl font-bold text-blue-800 mb-4">AI Response</h2>
          <p className="text-gray-800">
            <strong>Root Cause:</strong> {aiResponse.rootCause || "N/A"}
          </p>
          <p className="text-gray-800">
            <strong>Impact:</strong> {aiResponse.impact || "N/A"}
          </p>
          <p className="text-gray-800">
            <strong>Recommendation:</strong>{" "}
            {aiResponse.recommendation || "N/A"}
          </p>
        </div>
      )}

      {/* Updated search controls with darker text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-wrap justify-center gap-6 mx-4 md:mx-8 p-6 rounded-xl bg-white/30 backdrop-blur-xl border border-gray-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
      >
        <input
          type="text"
          placeholder="🔍 Search breaches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-3 rounded-lg bg-white/50 backdrop-blur border border-gray-400 placeholder-gray-600 text-gray-800 focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="p-3 rounded-lg bg-white/50 backdrop-blur border border-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <div className="relative group">
          <button className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-white shadow-md hover:shadow-lg transition">
            📥 Export Data
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-lg shadow-lg invisible group-hover:visible transition-all">
            <button
              onClick={() => exportData("csv", breachData)}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 rounded-t-lg"
            >
              Export as CSV
            </button>
            <button
              onClick={() => exportData("pdf", breachData)}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50"
            >
              Export as PDF
            </button>
            <button
              onClick={() => exportData("json", breachData)}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 rounded-b-lg"
            >
              Export as JSON
            </button>
          </div>
        </div>
      </motion.div>

      {/* Updated chart container */}
      <div className="max-w-md mx-auto my-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/50 p-6 rounded-xl 
                     border border-gray-400/50
                     shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
                     backdrop-blur-xl"
        >
          <Doughnut data={chartData} />
        </motion.div>
      </div>

      {/* Updated breach cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mx-4 md:mx-8">
        {currentBreaches.map((breach, idx) => (
          <motion.div
            key={breach.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="transform transition-all duration-300"
          >
            <Card className="bg-white/50 backdrop-blur-xl border border-gray-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)]">
              <CardContent className="p-6 text-gray-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100/80 p-2 rounded-full">
                    {breachIcons[breach.type as keyof typeof breachIcons]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-800">
                      {breach.type}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                        severityColor[
                          breach.severity as keyof typeof severityColor
                        ]
                      }`}
                    >
                      {breach.severity}
                    </span>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="font-bold text-purple-800">📄 Description:</p>
                  <p className="text-gray-700">{breach.description}</p>
                </div>

                <div className="text-sm">
                  <p className="font-bold text-blue-800">🛠️ Mitigation:</p>
                  <p className="text-gray-700">{breach.mitigation}</p>
                </div>

                <div className="bg-white/70 rounded-lg p-4 border border-gray-400 shadow-inner space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-blue-800">
                    <LucideIcons.BrainCircuit size={18} /> AI Insight
                  </div>
                  <p>
                    <span className="text-purple-800 font-semibold">
                      🔍 Root:
                    </span>{" "}
                    {breach.aiInsights?.rootCause || "🔍 Not analyzed yet"}
                  </p>
                  <p>
                    <span className="text-red-800 font-semibold">
                      💥 Impact:
                    </span>{" "}
                    {breach.aiInsights?.impact || "N/A"}
                  </p>
                  <p>
                    <span className="text-green-800 font-semibold">
                      🛡️ Advice:
                    </span>{" "}
                    {breach.aiInsights?.recommendation || "N/A"}
                  </p>
                </div>

                <div className="text-xs text-right text-gray-600 pt-2">
                  📅 {breach.timestamp}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Updated pagination */}
      <ReactPaginate
        pageCount={Math.ceil(filtered.length / breachesPerPage)}
        onPageChange={(event) => setCurrentPage(event.selected)}
        containerClassName="flex justify-center mt-10 mb-8 gap-4 relative z-10"
        activeClassName="font-bold text-blue-800 scale-110 transform transition-all duration-300"
        pageClassName="text-gray-800 hover:scale-105 transition-transform duration-300"
        previousClassName="text-gray-800 hover:scale-105 transition-transform duration-300"
        nextClassName="text-gray-800 hover:scale-105 transition-transform duration-300"
        previousLabel="⬅️"
        nextLabel="➡️"
      />

      <ToastContainer />

      {/* Updated modal */}
      {showInsightsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white/90 text-gray-800 p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-xl w-full max-w-xl relative border border-gray-400/50"
          >
            <button
              onClick={() => setShowInsightsModal(false)}
              className="absolute top-3 right-4 text-red-600 hover:text-red-800 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              🔍 AI Breach Insights
            </h2>

            {!selectedInsights ? (
              <div className="text-center py-8 animate-pulse text-blue-800">
                Analyzing with AI...
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="font-bold text-purple-800">Root Cause:</span>{" "}
                  {selectedInsights.rootCause}
                </div>
                <div>
                  <span className="font-bold text-red-800">Impact:</span>{" "}
                  {selectedInsights.impact}
                </div>
                <div>
                  <span className="font-bold text-green-800">
                    Recommendation:
                  </span>{" "}
                  {selectedInsights.recommendation}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Add keyframes for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(10px);
          }
          50% {
            transform: translateY(0px) translateX(20px);
          }
          75% {
            transform: translateY(10px) translateX(10px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/30 backdrop-blur-xl rounded-lg p-4 border border-gray-400/50"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                monitoringStatus.active
                  ? "bg-green-500 animate-pulse"
                  : "bg-red-500"
              }`}
            />
            <span className="text-gray-800 font-semibold">
              Monitoring Status
            </span>
          </div>
          <MonitoringStatus />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/30 backdrop-blur-xl rounded-lg p-4 border border-gray-400/50"
        >
          <div className="text-gray-800">
            <span className="font-semibold">Systems Monitored:</span>{" "}
            {monitoringStatus.systemsMonitored}
          </div>
          <div className="text-sm text-gray-600 mt-1">Active Protection</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/30 backdrop-blur-xl rounded-lg p-4 border border-gray-400/50"
        >
          <div className="text-gray-800">
            <span className="font-semibold">Total Breaches:</span>{" "}
            {breachData.length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Historical Data</div>
        </motion.div>
      </div>

      {/* Add this component after the chart */}
      <div className="max-w-4xl mx-auto my-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 p-6 rounded-xl border border-gray-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-xl"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Breach Timeline
          </h3>
          <div className="space-y-4">
            {breachData
              .sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime()
              )
              .map((breach, index) => (
                <div key={breach.id} className="flex items-start gap-4">
                  <div className="w-24 text-sm text-gray-600">
                    {new Date(breach.timestamp).toLocaleDateString()}
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${
                      breach.severity === "High"
                        ? "bg-red-500"
                        : breach.severity === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-semibold">
                      {breach.type}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {breach.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Add this component after the search controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <LucideIcons.Plus
            size={24}
            className={`transform transition-transform ${
              showQuickActions ? "rotate-45" : ""
            }`}
          />
        </button>

        {showQuickActions && (
          <div className="absolute bottom-16 right-0 bg-white/90 backdrop-blur-xl rounded-lg shadow-lg p-4 w-64 border border-gray-400/50">
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 rounded-lg flex items-center gap-2">
                <LucideIcons.Shield size={18} /> Run Security Scan
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 rounded-lg flex items-center gap-2">
                <LucideIcons.Bell size={18} /> Configure Alerts
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 rounded-lg flex items-center gap-2">
                <LucideIcons.Download size={18} /> Download Report
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Add this component before the chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 mb-8">
        {["High", "Medium", "Low"].map((severity) => {
          const count = breachData.filter(
            (b) => b.severity === severity
          ).length;
          const percentage = (count / breachData.length) * 100 || 0;

          return (
            <motion.div
              key={severity}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/30 backdrop-blur-xl rounded-lg p-4 border border-gray-400/50"
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-semibold ${
                    severity === "High"
                      ? "text-red-800"
                      : severity === "Medium"
                      ? "text-yellow-800"
                      : "text-green-800"
                  }`}
                >
                  {severity} Severity
                </span>
                <span className="text-2xl font-bold text-gray-800">
                  {count}
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-full rounded-full ${
                    severity === "High"
                      ? "bg-red-500"
                      : severity === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {percentage.toFixed(1)}% of total
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
