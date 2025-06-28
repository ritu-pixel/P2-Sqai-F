"use client";

import { useState } from "react";
import TranscriptSummary from "../components/TranscriptSummary";
import ActionItemTable from "../components/ActionItemTable";
import ExportButtons from "../components/ExportButton"; // 👈 Import this


export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    const validTypes = ["audio/mp3", "audio/mpeg", "audio/wav", "audio/x-m4a"];
    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setResult(null);
      setError("");
    } else {
      setFile(null);
      setError("❌ Unsupported file type. Please upload .mp3, .wav, or .m4a only.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("❌ User not authenticated");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.detail || "Upload failed");

      const fileId = uploadData.id;

      const transcribeRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transcribe/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const transcribeData = await transcribeRes.json();
      if (!transcribeRes.ok) throw new Error(transcribeData.detail || "Transcription failed");

      setResult({ ...transcribeData, fileId });
    } catch (err) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <video className="absolute inset-0 w-full h-full object-cover z-0 brightness-50" autoPlay muted loop playsInline>
        <source src="/images/background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl mb-8 mt-10">
          <h1 className="text-3xl font-bold text-center text-white mb-6" style={{ fontFamily: "var(--font-manrope)" }}>
            Upload Audio
          </h1>

          <div className="mb-4">
            <label
              htmlFor="audio-upload"
              className="cursor-pointer bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition"
              style={{ fontFamily: "var(--font-eurostile)" }}
            >
              Choose File
            </label>
            <input
              id="audio-upload"
              type="file"
              accept=".mp3, .wav, .m4a"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="mt-2 text-sm" style={{ fontFamily: "var(--font-eurostile)" }}>
              {file ? `Selected: ${file.name}` : "No file chosen"}
            </p>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {loading ? "Transcribing..." : "Upload & Transcribe"}
          </button>

          {error && <p className="text-sm mt-4 text-red-300 whitespace-pre-wrap">{error}</p>}
        </div>

        {result && (
          <div className="max-w-4xl w-full bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl">
            <div className="space-y-6">
            <TranscriptSummary transcript={result.transcribed_text} summary={result.summary} />
            <ActionItemTable actionItems={result.summary?.action_items} />
            {result.fileId && <ExportButtons fileId={result.fileId} />}


            </div>
          </div>
        )}
      </div>
    </div>
  );
}
