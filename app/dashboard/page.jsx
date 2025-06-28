"use client";

import { useState, useEffect } from "react";

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getToken = () => localStorage.getItem("auth_token");

  const loadFiles = async () => {
    const token = getToken();
    if (!token) return setError("❌ Unauthorized");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch files");

      const data = await res.json();
      setFiles(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError("❌ Error loading files");
      console.error(err);
    }
  };

const handleDelete = async (fileId) => {
  const token = getToken();

  if (!window.confirm("Are you sure you want to delete this file?")) return;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file/${fileId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Delete failed");

    setSuccess("✅ File deleted");
    await loadFiles(); // Refresh the file list
  } catch (err) {
    setError("❌ Failed to delete file");
  }
};


  const handleView = (fileId) => {
    window.location.href = `/transcribe/${fileId}`;
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <>
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background Video */}
       <video
  className="fixed top-0 left-0 w-full h-full object-cover z-0 brightness-50"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/images/background.mp4" type="video/mp4" />
</video>


      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-20">
        <div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-xl shadow-xl p-8">
          <h1 style={{ fontFamily: "var(--font-manrope)" }} className="text-3xl font-bold mb-6 text-white text-center">
            Your Uploaded Files
          </h1>

          {error && <p className="text-red-300 mb-4">{error}</p>}
          {success && <p className="text-green-300 mb-4">{success}</p>}

          {files.length === 0 ? (
            <p style={{ fontFamily: "var(--font-eurostile)" }} className="text-gray-300 text-center">No files uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  style={{ fontFamily: "var(--font-eurostile)" }}
                  className="bg-white/10 backdrop-blur-md p-4 rounded flex justify-between items-center text-white"
                >
                  <div>
                    <p className="font-medium">{file.filename || "Unnamed File"}</p>
                    <p className="text-sm text-gray-200">Status: {file.status}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleView(file.id)}
                      style={{ fontFamily: "var(--font-manrope)" }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      style={{ fontFamily: "var(--font-manrope)" }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
