import { Inter } from "next/font/google";
import "./globals.css";
// 1. Import your custom client provider instead of 'next-themes'
import { Providers } from "./components/Providers"; // Adjust path if it's in a different folder
import ClientWrapper from "./components/ClientWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-full flex flex-col bg-background text-foreground font-sans`}>
        {/* 2. Swap ThemeProvider out for your Client-Safe Providers wrapper */}
        <Providers>
          <ClientWrapper>{children}</ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}