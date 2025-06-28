"use client";

import { useState } from "react";

export default function ExportButtons({ fileId }) {
  const [notionToken, setNotionToken] = useState("");
  const [databaseId, setDatabaseId] = useState("");
  const [message, setMessage] = useState("");
  const [notionLoading, setNotionLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showNotionForm, setShowNotionForm] = useState(false);

  const handleDownload = async (type) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setMessage("❌ User not authenticated");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/export/${type}/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Download failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `meeting_${fileId}.${type}`;
      a.click();
      window.URL.revokeObjectURL(url);

      setMessage(`✅ ${type.toUpperCase()} downloaded successfully!`);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  const handleNotionExport = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setMessage("❌ User not authenticated");
      return;
    }

    if (!notionToken || !databaseId) {
      setMessage("❌ Notion token and database ID are required.");
      return;
    }

    setNotionLoading(true);
    setMessage("");

    try {
      const query = new URLSearchParams({
        token: notionToken,
        database_id: databaseId,
      }).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/export/notion/${fileId}?${query}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to export to Notion");

      setMessage(`✅ ${data.message || "Exported to Notion successfully!"}`);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setNotionLoading(false);
    }
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    setMessage("");

    if (option === "pdf") handleDownload("pdf");
    else if (option === "csv") handleDownload("csv");
    else if (option === "notion") setShowNotionForm(true);
    else setShowNotionForm(false);
  };

  return (
    <div className="space-y-4 bg-white/20 backdrop-blur-md p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold text-black" style={{ fontFamily: "var(--font-manrope)" }}>
        Export
      </h3>

      {/* Dropdown Selector */}
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="w-150 px-3 py-2 rounded text-sm bg-white text-black"
        style={{ fontFamily: "var(--font-eurostile)" }}
      >
        <option value="">Select Export Option</option>
        <option value="pdf">Export to PDF</option>
        <option value="csv">Export to CSV</option>
        <option value="notion">Export to Notion</option>
      </select>

      {/* Notion Form */}
      {showNotionForm && (
        <div className="pt-4 space-y-2">
          <input
            type="text"
            value={notionToken}
            onChange={(e) => setNotionToken(e.target.value)}
            placeholder="Notion Integration Token"
            style={{ fontFamily: "var(--font-eurostile)" }}
            className="w-150 px-3 py-2 rounded bg-white/70 text-black placeholder-gray-500"
          />
          <input
            type="text"
            value={databaseId}
            onChange={(e) => setDatabaseId(e.target.value)}
            placeholder="Notion Database ID"
            style={{ fontFamily: "var(--font-eurostile)" }}
            className="w-150 px-3 py-2 rounded bg-white/70 text-black placeholder-gray-500"
          />
          <button
            onClick={handleNotionExport}
            disabled={!notionToken || !databaseId || notionLoading}
            style={{ fontFamily: "var(--font-manrope)" }}
            className={`w-90 bg-blue-600 text-white py-2 rounded transition ${
              notionLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {notionLoading ? "Exporting..." : "Submit to Notion"}
          </button>
        </div>
      )}

      {message && <p className="text-white pt-2">{message}</p>}
    </div>
  );
}
