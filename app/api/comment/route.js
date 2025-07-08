let comments = [];  // Temporary in-memory store for now

export async function GET() {
    return Response.json(comments);
}

export async function POST(request) {
    const { slug, author, content } = await request.json();

    const newComment = {
        id: Date.now(),
        slug,
        author,
        content,
        createdAt: new Date().toISOString(),
    };

    comments.push(newComment);

    return Response.json(newComment);
}
