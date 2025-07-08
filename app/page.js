export default function HomePage() {
  const articles = [
    { id: 1, title: "Breaking Tech News", excerpt: "Latest trends in AI and Tech...", slug: "breaking-tech-news" },
    { id: 2, title: "Market Watch", excerpt: "Stocks and crypto updates...", slug: "market-watch" },
  ];

  return (
    <main className="max-w-4xl mx-auto p-4 grid gap-6">
      {articles.map(article => (
        <a key={article.id} href={`/article/${article.slug}`} className="block border rounded-lg p-4 hover:shadow-md">
          <h2 className="text-xl font-semibold">{article.title}</h2>
          <p className="mt-2 text-gray-600">{article.excerpt}</p>
        </a>
      ))}
    </main>
  );
}
