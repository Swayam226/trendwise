import { connectDB } from "@/lib/db";
import { Article } from "@/models/ArticleModel";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
    await connectDB();
    const article = await Article.findOne({ slug: params.slug });

    if (!article) {
        return {
            title: "Article Not Found – TrendWise",
            description: "The article you’re looking for does not exist.",
        };
    }

    return {
        title: `${article.title} – TrendWise`,
        description: article.meta,
    };
}

export default async function ArticleDetailPage({ params }) {
    const { slug } = params;
    await connectDB();
    const article = await Article.findOne({ slug });

    if (!article) {
        return (
            <main className="max-w-2xl mx-auto py-10 px-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                <p className="text-gray-600">The article you're looking for doesn’t exist.</p>
            </main>
        );
    }

    return (
        <main className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-600 text-sm mb-6">{article.meta}</p>

            <article className="prose prose-lg">
                {article.content
                    .split("\n")
                    .filter(line => line.trim() !== "")
                    .map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
            </article>
        </main>
    );
}
