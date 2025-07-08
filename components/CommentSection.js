"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CommentSection({ slug }) {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // Fetch existing comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment?slug=${slug}`);
                if (!res.ok) {
                    console.error("Failed to fetch comments");
                    return;
                }
                const data = await res.json();
                setComments(data);
            } catch (error) {
                console.error("Error loading comments:", error);
            }
        };
        fetchComments();
    }, [slug]);


    // Handle posting a comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    slug,
                    author: session.user.name,
                    content: newComment,
                }),
            });

            if (!res.ok) {
                console.error("Failed to post comment");
                return;
            }

            const newEntry = await res.json();
            setComments(prev => [...prev, newEntry]);
            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };


    if (!session) {
        return (
            <div className="mt-8 p-4 border rounded text-gray-500 italic">
                Please log in to view and post comments.
            </div>
        );
    }

    return (
        <div className="mt-8 p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full border p-2 rounded mb-2"
                    rows="3"
                    placeholder="Write your comment..."
                    required
                ></textarea>
                <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Post Comment
                </button>
            </form>

            <div className="space-y-2">
                {comments.length === 0 && <p className="text-gray-500 italic">No comments yet.</p>}
                {comments.map(comment => (
                    <div key={comment.id} className="border rounded p-2">
                        <p className="font-semibold">{comment.author}</p>
                        <p className="text-gray-600">{comment.content}</p>
                        <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
