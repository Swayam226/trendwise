"use client";

import { useState } from "react";

export default function AdminPage() {
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch("/api/generate-article", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to generate article");
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // ✅ BUTTON MOVED INSIDE RETURN
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">🛠 Admin – Generate Article</h1>

            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic (e.g., AI Trends 2024)"
                className="border rounded w-full p-2 mb-4"
            />

            <button
                onClick={handleGenerate}
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {loading ? "Generating..." : "Generate Article"}
            </button>

            {/* 🔥 Trending Articles Button */}
            <button
                onClick={async () => {
                    const res = await fetch("/api/trending", { method: "POST" });
                    const data = await res.json();
                    alert(data.message || data.error);
                }}
                className="mt-4 ml-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
                Generate Trending Articles
            </button>

            {error && <p className="mt-4 text-red-500">{error}</p>}

            {result && (
                <div className="mt-6 border rounded p-4 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
                    <p className="text-sm text-gray-500 mb-4">{result.meta}</p>
                    <pre className="text-sm whitespace-pre-wrap">{result.content}</pre>
                </div>
            )}
        </main>
    );
}
