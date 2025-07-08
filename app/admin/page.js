"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Pencil, Trash2, X } from "lucide-react";

export default function AdminPage() {
    const { data: session, status } = useSession();

    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [articles, setArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null);

    useEffect(() => {
        if (session) {
            const fetchArticles = async () => {
                try {
                    const res = await fetch(`/api/articles?search=${encodeURIComponent(search)}`);
                    const data = await res.json();
                    setArticles(data);
                } catch (err) {
                    console.error("Failed to load articles:", err);
                }
            };
            fetchArticles();
        }
    }, [search, session]);

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

    const handleTrending = async () => {
        const res = await fetch("/api/trending", { method: "POST" });
        const data = await res.json();
        alert(data.message || data.error);
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
            if (res.ok) {
                setArticles(prev => prev.filter(article => article._id !== id));
            } else {
                alert("Failed to delete article.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    const handleEditSave = async () => {
        try {
            const res = await fetch(`/api/articles/${editingArticle._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: editingArticle.title,
                    meta: editingArticle.meta
                }),
            });

            if (res.ok) {
                const updated = await res.json();
                setArticles(prev => prev.map(a => (a._id === updated._id ? updated : a)));
                setEditingArticle(null);
                window.location.reload();
            } else {
                alert("Failed to update article.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    if (status === "loading") {
        return <div className="flex items-center justify-center min-h-screen text-gray-300">Loading...</div>;
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4 text-gray-100">Access Denied</h2>
                    <button
                        onClick={() => signIn("google")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Admin – Manage Articles</h1>

            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic (e.g., AI Trends 2024)"
                className="border border-[#2a2a2a] bg-[#1f1f1f] text-[#f1f1f1] rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <div className="flex gap-3 mb-6">
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className={`flex-1 px-4 py-2 rounded-lg text-white ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {loading ? "Generating..." : "Generate Article"}
                </button>

                <button
                    onClick={handleTrending}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                    Generate Trending Articles
                </button>
            </div>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="border border-[#2a2a2a] bg-[#1f1f1f] text-[#f1f1f1] rounded-lg p-3 w-full mb-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <ul className="grid gap-5">
                {articles.length === 0 && <p className="text-gray-500 text-center">No articles found.</p>}

                {articles.map(article => (
                    <li
                        key={article._id}
                        className="bg-[#1f1f1f] rounded-2xl p-5 shadow-md border border-[#2a2a2a] hover:border-blue-500 transition"
                    >
                        <h3 className="text-base font-semibold text-white mb-1">{article.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{article.meta.length > 100 ? `${article.meta.slice(0, 100)}...` : article.meta}</p>
                        <div className="flex items-center justify-between mt-2">
                            <a href={`/article/${article.slug}`} className="text-blue-500 hover:text-blue-400 text-sm">View →</a>
                            <div className="flex space-x-3">
                                <button onClick={() => setEditingArticle(article)}>
                                    <Pencil size={18} className="text-gray-400 hover:text-blue-500" />
                                </button>
                                <button onClick={() => handleDelete(article._id)}>
                                    <Trash2 size={18} className="text-gray-400 hover:text-red-500" />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {editingArticle && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-[#1f1f1f] rounded-2xl p-6 shadow-xl w-96 border border-[#2a2a2a]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Edit Article</h3>
                            <button onClick={() => setEditingArticle(null)}>
                                <X size={18} className="text-gray-400 hover:text-white" />
                            </button>
                        </div>

                        <input
                            type="text"
                            value={editingArticle.title}
                            onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                            className="border border-[#2a2a2a] bg-[#1f1f1f] text-[#f1f1f1] rounded-lg p-2 w-full mb-3"
                        />
                        <input
                            type="text"
                            value={editingArticle.meta}
                            onChange={(e) => setEditingArticle({ ...editingArticle, meta: e.target.value })}
                            className="border border-[#2a2a2a] bg-[#1f1f1f] text-[#f1f1f1] rounded-lg p-2 w-full mb-4"
                        />

                        <button
                            onClick={handleEditSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}