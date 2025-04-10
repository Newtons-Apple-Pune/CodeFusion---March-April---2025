"use client";

import { useState, useRef } from "react";

interface UploadHistoryEntry {
  filename: string;
  findings: string;
  filepath: string;
  reportPath: string;
}

export default function LogUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string[]>([]);
  const [reportLink, setReportLink] = useState<string>("");
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryEntry[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const res = await fetch("/api/log-analysis", {
        method: "POST",
        body: formData,
      });
  
      const text = await res.text(); 
      console.log("Raw server response:", text); 
  
      if (!text) {
        setResult(["Empty response from server"]);
        return;
      }
  
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        console.error("JSON parse error:", jsonErr);
        setResult(["Invalid JSON from server"]);
        return;
      }
  
      if (!res.ok) {
        setResult([data.error || "Unknown error"]);
        return;
      }
  
      setResult(data.report || []);
      setReportLink(data.downloadReportUrl || "");
    } catch (err) {
      console.error("Upload error:", err);
      setResult(["Upload failed"]);
    }
  };
  

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">Upload Log File</h1>

      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full border border-gray-300 rounded p-2"
      />

      <button
        onClick={handleUpload}
        disabled={!file}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Upload
      </button>

      {result.length > 0 && (
        <div>
          <h2 className="font-semibold text-lg">Vulnerability Report:</h2>
          <ul className="list-disc list-inside text-red-600">
            {result.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>

          {reportLink && (
            <a
              href={reportLink}
              download
              className="mt-4 inline-block text-blue-600 underline"
            >
              📄 Download Full Report
            </a>
          )}
        </div>
      )}

      {uploadHistory.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Upload History</h2>
          <ul className="space-y-2">
            {uploadHistory.map((entry, i) => (
              <li key={i} className="border p-3 rounded bg-gray-50">
                <div><strong>File:</strong> {entry.filename}</div>
                <div className="text-sm text-gray-600 whitespace-pre-wrap">
                  <strong>Findings:</strong> {entry.findings || "No issues found"}
                </div>
                <a
                  href={entry.reportPath}
                  className="text-blue-600 underline text-sm"
                  download
                >
                  📎 Download Report
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
