import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"; // High-end tech trio
import "./globals.css";
import { ThemeProvider } from "next-themes"; 
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

// Display font for those massive italic headers
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

// Clean, readable body font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Sharp mono for your "Registry" and "System_Init" labels
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The TAG V.P. | Architects of Tomorrow",
  description: "A millennial-driven collective of innovators and creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning 
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className={`${inter.variable} min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500 font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}