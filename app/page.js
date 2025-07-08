// 🔥 Updated Landing Page with Limited Text Previews

import { connectDB } from "@/lib/db";
import { Article } from "@/models/ArticleModel";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await connectDB();
  const articles = await Article.find().sort({ _id: -1 });

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">

      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to <span className="text-blue-500">TrendWise</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Discover the latest trends, tech breakthroughs, and AI-powered insights—all curated and delivered with style.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Feed</h2>

      {articles.length === 0 && (
        <p className="text-gray-500 text-center">No articles found. Check back soon!</p>
      )}

      <div className="grid gap-6">
        {articles.map(article => (
          <a
            key={article._id}
            href={`/article/${article.slug}`}
            className="bg-[#1f1f1f] rounded-2xl p-6 shadow-md border border-[#2a2a2a] hover:border-blue-600 transition"
          >
            <h2 className="text-lg font-semibold text-[#f1f1f1] mb-1">{article.title}</h2>
            <p className="text-sm text-gray-400 mb-2">
              {article.meta.length > 100 ? `${article.meta.slice(0, 100)}...` : article.meta}
            </p>
            <span className="text-blue-500 hover:text-blue-400 text-sm">Read More →</span>
          </a>
        ))}
      </div>

    </main>
  );
}