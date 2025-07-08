import { connectDB } from "@/lib/db";
import { Article } from "@/models/ArticleModel";

export async function GET() {
    await connectDB();
    const articles = await Article.find({}, "slug");

    const baseUrl = "https://your-deployed-domain.com";  // 🔗 Replace with your actual domain

    const urls = articles.map(article => {
        return `<url><loc>${baseUrl}/article/${article.slug}</loc></url>`;
    }).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${baseUrl}/</loc></url>
    ${urls}
  </urlset>`;

    return new Response(sitemap, {
        headers: { "Content-Type": "application/xml" },
    });
}
