"use client"; 
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { FileSearch, UploadCloud, ScanLine } from "lucide-react";

// 🧠 Utility functions for AI response parsing
function extractRiskLevel(text: string): string {
  const match = text.match(/Risk Level:\s*(\w+)/i);
  return match ? match[1] : "Unknown";
}

function extractTags(text: string): string[] {
  const match = text.match(/Tags:\s*\[([^\]]+)\]/i);
  return match ? match[1].split(",").map(tag => tag.trim()) : [];
}

function extractThreatInfo(text: string, label: string): string {
  const match = text.match(new RegExp(`${label}:\\s*([\\s\\S]*?)(\\n[A-Z][a-z]+:|$)`, "i"));
  return match ? match[1].trim() : "";
}

export default function AIThreatScanner() {
  const [scanType, setScanType] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const handleScan = async () => {
    setScanning(true);
    setAiResult("");
  
    const prompt = `
  You are an AI cyber threat scanner. Analyze the following input and return:
  
  Risk Level: (High / Medium / Low)
  Tags: [comma-separated keywords]
  Threat: (brief description)
  Mitigation: (how to protect against it)
  
  Input: ${scanType === "file" ? "Uploaded file data" : inputValue}
    `;
  
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await res.json();
  
      // ✅ Fix: extract generated_text string safely
      const resultText = Array.isArray(data.result)
        ? data.result[0]?.generated_text || "❌ Invalid AI response"
        : typeof data.result === "string"
        ? data.result
        : "❌ Unexpected AI output format";
  
      setAiResult(resultText);
    } catch (err) {
      setAiResult("❌ Error occurred while scanning.");
    }
  
    setScanning(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 relative overflow-hidden">
      <motion.h1
        className="text-4xl font-bold text-center text-indigo-700 mb-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        AI Threat Scanner
      </motion.h1>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Left Card: Input */}
        <Card className="backdrop-blur-md bg-white/40 shadow-lg">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <FileSearch className="text-indigo-600" />
              <h2 className="text-lg font-semibold">Input Type</h2>
            </div>
            <Select onValueChange={(val) => setScanType(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Scan Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text / Code</SelectItem>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="file">File Upload</SelectItem>
              </SelectContent>
            </Select>

            {scanType === "file" ? (
              <div className="flex items-center gap-2">
                <UploadCloud className="text-purple-500" />
                <Input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
            ) : (
              <Textarea
                className="resize-none"
                placeholder={
                  scanType === "url"
                    ? "Enter URL to scan..."
                    : "Paste code or text here..."
                }
                rows={6}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            )}

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={handleScan}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-purple-600 hover:to-pink-500 transition"
              >
                <ScanLine className="mr-2" /> Start Scan
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Right Card: AI Output */}
        <Card className="backdrop-blur-md bg-white/40 shadow-lg">
          <CardContent className="p-6">
            {scanning ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-lg text-indigo-700"
              >
                🔍 Scanning for threats...
              </motion.div>
            ) : aiResult ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Risk Level:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold
                    ${
                      extractRiskLevel(aiResult) === "High"
                        ? "bg-red-500 text-white"
                        : extractRiskLevel(aiResult) === "Medium"
                        ? "bg-yellow-400 text-black"
                        : extractRiskLevel(aiResult) === "Low"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {extractRiskLevel(aiResult)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {extractTags(aiResult).map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded-full shadow"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-indigo-600">
                    🔎 Threat Description:
                  </h4>
                  <p className="text-sm">
                    {extractThreatInfo(aiResult, "Threat")}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-purple-600">
                    🛡️ Mitigation:
                  </h4>
                  <p className="text-sm">
                    {extractThreatInfo(aiResult, "Mitigation")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-600">
                Results will appear here after scanning.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}