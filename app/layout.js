import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";
import { Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

// Fonts
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export const metadata = {
  title: "TrendWise – Discover Trends, News & AI Insights",
  description: "Your ultimate source for tech, AI, and trending articles with a modern aesthetic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121212] text-[#f1f1f1]`}>
        <Providers>
          <NavBar />
          <main className="min-h-screen">{children}</main>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
