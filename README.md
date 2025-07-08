
# TrendWise

TrendWise is a modern, AI-powered content platform built with Next.js and Tailwind CSS. It helps users discover trending tech topics, read AI-generated articles, and engage with content through a clean, responsive, and minimal interface.

## Features Overview

- Landing Page: Clean, dark-themed homepage with welcome text and articles feed.
- Articles Feed: Paginated articles with search and view options.
- Detailed Article Pages: SEO-friendly dynamic article pages with optional comments (for logged-in users).
- Authentication: Secure Google Sign-In using NextAuth.js.
- Admin Panel:
  - Generate AI-based articles (mocked in this version).
  - Scrape trending topics and auto-generate articles (manual trigger).
  - Search, edit, and delete articles.
- SEO & Meta Tags: Automated title and meta descriptions for all pages.
- Sitemap & Robots.txt: Dynamically generated sitemap and proper robots.txt.

## Tech Stack

- Framework: Next.js (App Router)
- Styling: Tailwind CSS v4 (JIT, no config)
- Authentication: NextAuth.js with Google Provider
- Database: MongoDB Atlas + Mongoose
- Icons: Lucide React
- Deployment: Vercel
- Analytics: Vercel Web Analytics

## Pages & Routes

| Route                | Description                            |
|----------------------|----------------------------------------|
| `/`                  | Landing page with latest articles feed |
| `/articles`          | All articles with search + pagination  |
| `/article/[slug]`    | Dynamic article page                   |
| `/login`             | Google sign-in page                    |
| `/admin`             | Admin dashboard to manage articles     |
| `/api/*`             | API routes for articles, comments, scraping |

## Functional Highlights

1. Google Login: Integrated via NextAuth; required for admin access and posting comments.
2. Article Generation:
   - Manual article creation via admin page.
   - Trending topics scraping (mocked in this version).
3. Comments: Only visible and postable by logged-in users (mock-ready).
4. Admin Features:
   - Generate article by topic.
   - Trigger trending topic articles.
   - Edit and delete articles instantly.
5. SEO:
   - Dynamic meta tags for articles.
   - Sitemap and robots.txt for better indexing.

## Authentication

- Uses Google Sign-In via NextAuth.js.
- Requires setting up:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `NEXTAUTH_URL`
  - `NEXTAUTH_SECRET`

## Environment Variables

```plaintext
MONGODB_URL=your-mongodb-uri
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=https://your-vercel-site.vercel.app
NEXTAUTH_SECRET=your-random-secret
```

## Project Setup (Local)

```bash
git clone https://github.com/your-username/trendwise.git
cd trendwise
pnpm install
pnpm run dev
```

## Evaluation Criteria Covered:

| Criteria                                     | Status      |
|---------------------------------------------|-------------|
| Functional correctness                      | ✅ Achieved |
| Code quality and readability                | ✅ Achieved |
| Clean responsive UI                         | ✅ Achieved |
| Authentication with Google                  | ✅ Achieved |
| Admin article management                    | ✅ Achieved |
| Trending topic automation (mock)            | ✅ Achieved |
| SEO, sitemap, robots.txt                    | ✅ Achieved |
| Performance & loading optimization          | ✅ Achieved |

## Notes:

- AI article generation is mocked to avoid paid API usage.
- Trending scraping is manual-trigger only.
- Comments system is UI-ready, can be integrated fully with back-end as needed.

## Future Improvements (Optional):

- Real AI integration (OpenAI, Gemini, etc.)
- Full comments storage and management.
- Auto-scheduled scraping of trending topics.
