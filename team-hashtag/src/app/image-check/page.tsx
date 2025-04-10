"use client";

import { useState } from "react";

export default function ImageCheckPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/image-check", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.valid ? "✅ Image is valid." : "❌ Image appears to be corrupted.");
      } else {
        setResult(data.error || "Error processing image.");
      }
    } catch (error) {
      setResult("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Image Integrity Checker</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2"
          />
          <button
            type="submit"
            disabled={loading || !selectedFile}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check Image"}
          </button>
        </form>

        {result && (
          <div className="mt-6 text-lg font-semibold text-gray-800">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
