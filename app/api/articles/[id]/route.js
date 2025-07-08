import { connectDB } from "@/lib/db";
import { Article } from "@/models/ArticleModel";

export async function GET(request) {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const query = search
        ? { title: { $regex: search, $options: "i" } }
        : {};

    const articles = await Article.find(query).sort({ _id: -1 }).lean();

    return Response.json(articles);
}
