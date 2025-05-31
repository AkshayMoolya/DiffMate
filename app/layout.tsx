import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DiffMate - Professional Text and File Comparison Tool",
  description:
    "Compare text, files, folders, and GitHub commits easily. The perfect tool for developers, writers, and teams.",
  keywords: [
    "text comparison",
    "file diff",
    "code comparison",
    "diff tool",
    "text diff",
  ],
  authors: [{ name: "Akshay Moolya", url: "https://akshay33.vercel.app/" }],
  creator: "Akshay Moolya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://diffmate.vercel.app/",
    title: "DiffMate - Professional Text and File Comparison Tool",
    description:
      "Compare text, files, folders, and GitHub commits easily. The perfect tool for developers, writers, and teams.",
    siteName: "DiffMate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DiffMate - Text and File Comparison Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DiffMate - Professional Text and File Comparison Tool",
    description:
      "Compare text, files, folders, and GitHub commits easily. The perfect tool for developers, writers, and teams.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
