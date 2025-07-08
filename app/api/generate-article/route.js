import { connectDB } from "@/lib/db";
import { Article } from "@/models/ArticleModel";

export async function POST(request) {
    try {
        await connectDB();
        const { topic } = await request.json();

        if (!topic || topic.trim() === "") {
            return Response.json({ error: "Topic is required" }, { status: 400 });
        }

        const article = generateMockArticle(topic);

        const savedArticle = await Article.create(article);

        return Response.json(savedArticle, { status: 201 });
    } catch (error) {
        console.error("Mock Article generation error:", error);
        return Response.json({ error: "Failed to generate article" }, { status: 500 });
    }
}

// ✅ Mock Article Generator Function
function generateMockArticle(topic) {
    const title = `The Future of ${topic}`;
    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    const meta = `An insightful overview of ${topic} trends.`;

    const content = `
# The Future of ${topic}

This is a mock article generated for demo purposes.

## Key Highlights:
- ${topic} is shaping the future of technology.
- Industry experts predict major breakthroughs in the coming years.
- Stay informed on the latest developments in ${topic}.

*Note: This is placeholder content for development use only.*
`;

    return {
        title,
        slug,
        meta,
        media: [],
        content,
    };
}
