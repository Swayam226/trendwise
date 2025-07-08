"use client";

import { useSession, signIn } from "next-auth/react";
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
            } else {
                alert("Failed to update article.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    if (status === "loading") {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
                    <button
                        onClick={() => signIn("google")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">🛠 Admin – Generate & Manage Articles</h1>

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
                className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
                {loading ? "Generating..." : "Generate Article"}
            </button>

            <button
                onClick={handleTrending}
                className="mt-4 ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
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

            <hr className="my-8" />

            <h2 className="text-2xl font-semibold mb-4">🔍 Search Existing Articles</h2>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles by title..."
                className="border rounded w-full p-2 mb-4"
            />

            <ul className="space-y-4">
                {articles.length === 0 && <p className="text-gray-500">No articles found.</p>}

                {articles.map(article => (
                    <li key={article._id} className="border rounded p-4 flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">{article.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{article.meta}</p>
                            <a href={`/article/${article.slug}`} className="text-blue-600 hover:underline text-sm">
                                View Article →
                            </a>
                        </div>

                        <div className="flex space-x-2 mt-1">
                            <button onClick={() => setEditingArticle(article)}>
                                <Pencil size={18} className="text-gray-600 hover:text-blue-600" />
                            </button>
                            <button onClick={() => handleDelete(article._id)}>
                                <Trash2 size={18} className="text-gray-600 hover:text-red-600" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingArticle && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 shadow-xl w-96 border">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Edit Article</h3>
                            <button onClick={() => setEditingArticle(null)}>
                                <X size={18} className="text-gray-500 hover:text-black" />
                            </button>
                        </div>

                        <input
                            type="text"
                            value={editingArticle.title}
                            onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                            className="border rounded-lg p-2 w-full mb-3 text-sm"
                        />
                        <input
                            type="text"
                            value={editingArticle.meta}
                            onChange={(e) => setEditingArticle({ ...editingArticle, meta: e.target.value })}
                            className="border rounded-lg p-2 w-full mb-4 text-sm"
                        />

                        <button
                            onClick={handleEditSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full text-sm"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
