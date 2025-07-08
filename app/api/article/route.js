export async function GET() {
    return Response.json([
        { id: 1, title: "Placeholder Article 1", slug: "placeholder-article-1" },
        { id: 2, title: "Placeholder Article 2", slug: "placeholder-article-2" },
    ]);
}

export async function POST(request) {
    const data = await request.json();
    return Response.json({ message: "Article created", data });
}
