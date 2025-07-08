import { connectDB } from "@/lib/db";
import { Comment } from "@/models/CommentModel";

export async function GET(request) {
    await connectDB();
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
        return Response.json([], { status: 200 });
    }

    const comments = await Comment.find({ slug });
    return Response.json(comments, { status: 200 });
}

export async function POST(request) {
    await connectDB();
    const body = await request.json();

    if (!body.slug || !body.content || !body.author) {
        return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const newComment = await Comment.create(body);
    return Response.json(newComment, { status: 201 });
}
