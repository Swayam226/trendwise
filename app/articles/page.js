import { connectDB } from "@/lib/db";
import { Article } from "@/models/ArticleModel";

export const dynamic = "force-dynamic";

export default async function ArticlesPage({ searchParams }) {
    const search = searchParams?.search || "";
    const page = parseInt(searchParams?.page || "1");
    const limit = 5;
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
        <main className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">All Articles</h1>

            <form method="get" className="mb-8">
                <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Search articles..."
                    className="border border-[#2a2a2a] bg-[#1f1f1f] text-[#f1f1f1] rounded-lg p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
                >
                    Search
                </button>
            </form>

            {articles.length === 0 && (
                <p className="text-gray-500 text-center">No articles found.</p>
            )}

            <ul className="grid gap-5">
                {articles.map(article => (
                    <li
                        key={article._id}
                        className="bg-[#1f1f1f] rounded-2xl p-5 shadow-md border border-[#2a2a2a] hover:border-blue-500 transition"
                    >
                        <h2 className="text-lg font-semibold text-[#f1f1f1] mb-1">{article.title}</h2>
                        <p className="text-sm text-gray-400 mb-2">
                            {article.meta.length > 100 ? `${article.meta.slice(0, 100)}...` : article.meta}
                        </p>
                        <a
                            href={`/article/${article.slug}`}
                            className="text-blue-500 hover:text-blue-400 text-sm"
                        >
                            Read More →
                        </a>
                    </li>
                ))}
            </ul>

            {totalPages > 1 && (
                <div className="flex items-center justify-center mt-10 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <a
                            key={i}
                            href={`/articles?page=${i + 1}${search ? `&search=${search}` : ""}`}
                            className={`px-3 py-1 rounded-lg text-sm ${i + 1 === page
                                ? "bg-blue-600 text-white"
                                : "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
                                }`}
                        >
                            {i + 1}
                        </a>
                    ))}
                </div>
            )}
        </main>
    );
}
