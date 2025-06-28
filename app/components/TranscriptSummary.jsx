"use client";

export default function TranscriptSummary({ transcript, summary }) {
  return (
    <>
      {/* Transcript */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-black mb-2" style={{ fontFamily: "var(--font-manrope)" }}>
          Transcript
        </h2>
        <p className="whitespace-pre-wrap text-black" style={{ fontFamily: "var(--font-eurostile)" }}>
          {transcript}
        </p>
      </div>

      {/* Summary */}
      {summary?.summary && (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-black mb-2" style={{ fontFamily: "var(--font-manrope)" }}>
            Summary
          </h3>
          <p className="whitespace-pre-wrap text-black" style={{ fontFamily: "var(--font-eurostile)" }}>
            {summary.summary}
          </p>
        </div>
      )}
    </>
  );
}
