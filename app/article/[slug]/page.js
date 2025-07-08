import CommentSection from "@/components/CommentSection";

export default function ArticleDetailPage({ params }) {
    const { slug } = params;

    return (
        <main className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 capitalize">{slug.replace(/-/g, " ")}</h1>
            <p className="text-gray-700">Full article content for <strong>{slug}</strong> will appear here.</p>

            <CommentSection slug={slug} />

        </main>
    );
}
