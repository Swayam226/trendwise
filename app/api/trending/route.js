import { connectDB } from "@/lib/db";
import { Article } from "@/models/ArticleModel";
import { fetchTrendingTopics } from "@/lib/fetchTrendingTopics";

export async function POST() {
    try {
        await connectDB();

        const topics = await fetchTrendingTopics();

        if (!topics.length) {
            return Response.json({ error: "No topics found." }, { status: 404 });
        }

        const articles = topics.map(topic => generateMockArticle(topic));

        const savedArticles = await Article.insertMany(articles);

        return Response.json({ message: "Articles generated", savedArticles }, { status: 201 });

    } catch (error) {
        console.error("Trending Bot Error:", error);
        return Response.json({ error: "Failed to generate articles" }, { status: 500 });
    }
}

// 🔥 Mock Article Generator (reused)
function generateMockArticle(topic) {
    const title = `The Future of ${topic}`;
    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    const meta = `Insights on ${topic} trends.`;
    const content = `
# The Future of ${topic}

This is a mock article for demo purposes.

## Highlights:
- ${topic} is influencing global trends.
- This is placeholder content generated automatically.
`;

    return {
        title,
        slug,
        meta,
        media: [],
        content,
    };
}
