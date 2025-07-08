import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";  // Adjust path if needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
