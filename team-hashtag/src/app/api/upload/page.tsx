"use client";

import { useState, useRef } from "react";

interface UploadHistoryEntry {
  filename: string;
  findings: string;
  filepath: string;
  reportPath: string;
}

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<string[]>([]);
  const [reportLink, setReportLink] = useState<string>("");
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/log-analysis", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.report || []);
      setReportLink(data.downloadReportUrl || "");

      setUploadHistory((prev) => [
        {
          filename: selectedFile.name,
          findings: data.report?.join("\n") || "",
          filepath: data.filepath,
          reportPath: data.downloadReportUrl,
        },
        ...prev,
      ]);

      setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">🧾 Upload Log File</h1>

        <div className="mb-4">
          <input
            id="file-input"
            type="file"
            accept=".log,.txt"
            ref={fileInputRef}
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl disabled:opacity-50 transition"
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>

        {result.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-red-600">🚨 Vulnerability Report:</h2>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              {result.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>

            {reportLink && (
              <a
                href={reportLink}
                download
                className="inline-block mt-4 text-blue-600 hover:underline font-medium"
              >
                📥 Download Full Report
              </a>
            )}
          </div>
        )}

        {uploadHistory.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">📚 Upload History</h2>
            <ul className="space-y-4">
              {uploadHistory.map((entry, i) => (
                <li key={i} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="font-medium text-gray-700 mb-1">
                    📄 <strong>File:</strong> {entry.filename}
                  </div>
                  <div className="text-sm text-gray-600 whitespace-pre-wrap">
                    <strong>Findings:</strong>{" "}
                    {entry.findings || "No issues found."}
                  </div>
                  <a
                    href={entry.reportPath}
                    download
                    className="text-blue-500 hover:underline text-sm mt-2 inline-block"
                  >
                    📥 Download Report
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
