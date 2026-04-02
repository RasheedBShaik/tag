"use client"; 

import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes"; 
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Check if the current route starts with /studio
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html
      lang="en"
      // This stays here to handle the <html> attributes (like class="dark")
      suppressHydrationWarning 
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body 
        // ADD THIS: suppresses the script-injection warning from next-themes
        suppressHydrationWarning={true}
        className={`${inter.variable} min-h-full flex flex-col bg-(--background) text-(--foreground) transition-colors duration-500 font-sans`}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
        >
          {/* Only show Navbar if NOT in Sanity Studio */}
          {!isAdmin && <Navbar />}
          
          <main className="grow">{children}</main>
          
          {/* Only show Footer if NOT in Sanity Studio */}
          {!isAdmin && <Footer/>}
        </ThemeProvider>
      </body>
    </html>
  );
}