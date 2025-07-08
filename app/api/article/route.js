import { connectDB } from "@/lib/db";
import { Article } from "@/models/article";

export async function GET() {
    await connectDB();
    const articles = await Article.find();
    return Response.json(articles);
}

export async function POST(request) {
    await connectDB();
    const body = await request.json();
    const newArticle = await Article.create(body);
    return Response.json(newArticle);
}
