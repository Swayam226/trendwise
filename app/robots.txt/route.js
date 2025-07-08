export async function GET() {
    const robots = `
    User-agent: *
    Disallow: /admin
    Sitemap: https://yourdomain.com/sitemap.xml
  `;
    return new Response(robots, {
        headers: { "Content-Type": "text/plain" },
    });
}
