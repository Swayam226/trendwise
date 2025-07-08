import { connectDB } from "@/lib/db";
import { Article } from "@/models/ArticleModel";

export const dynamic = "force-dynamic";

export default async function ArticlesPage({ searchParams }) {
    const search = searchParams?.search || "";
    const page = parseInt(searchParams?.page || "1");
    const limit = 5;  // articles per page
    const skip = (page - 1) * limit;

    await connectDB();

    const query = search
        ? { title: { $regex: search, $options: "i" } }
        : {};

    const totalArticles = await Article.countDocuments(query);
    const articles = await Article.find(query)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(totalArticles / limit);

    return (
        <main className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">📰 All Articles</h1>

            <form method="get" className="mb-6">
                <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Search articles..."
                    className="border rounded p-2 w-full"
                />
                <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Search
                </button>
            </form>

            {articles.length === 0 && <p>No articles found.</p>}

            <ul className="space-y-4">
                {articles.map(article => (
                    <li key={article._id} className="border rounded p-4">
                        <h2 className="text-xl font-semibold">{article.title}</h2>
                        <p className="text-gray-500 text-sm mb-2">{article.meta}</p>
                        <a
                            href={`/article/${article.slug}`}
                            className="text-blue-600 hover:underline"
                        >
                            Read More →
                        </a>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center mt-8 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <a
                            key={i}
                            href={`/articles?page=${i + 1}${search ? `&search=${search}` : ""}`}
                            className={`px-3 py-1 rounded ${i + 1 === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                        >
                            {i + 1}
                        </a>
                    ))}
                </div>
            )}
        </main>
    );
}
