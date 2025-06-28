"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TranscriptSummary from "@/app/components/TranscriptSummary";
import ActionItemTable from "@/app/components/ActionItemTable";
import ExportButtons from "@/app/components/ExportButton";

export default function FileDetailPage() {
  const params = useParams();
  const id = params.file_id; // ✅ FIXED
  const [result, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("❌ User not authenticated");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transcribe/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.detail || "Failed to load data");

        setData(json);
        setError("");
      } catch (err) {
        setError(`❌ ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <video
        className="fixed inset-0 w-full h-full object-cover z-0 brightness-50"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/images/background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 pt-10">
        <div className="max-w-4xl w-full bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl">
          <button
            onClick={() => window.history.back()}
            className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ← Back
          </button>

          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-300">{error}</p>}

          {result && (
            <div className="space-y-6">
              <TranscriptSummary transcript={result.transcribed_text} summary={result.summary} />
              <ActionItemTable actionItems={result.summary?.action_items} />
              <ExportButtons fileId={id} /> {/* ✅ Added correctly now */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
