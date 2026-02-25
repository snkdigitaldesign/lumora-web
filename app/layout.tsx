import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumora | Insight Beyond the Stars",
  description: "A premium insight and lifestyle brand focused on self-reflection, horoscopes, and tarot through elegant cosmic wisdom.",
  openGraph: {
    title: "Lumora | Insight Beyond the Stars",
    description: "Discover daily horoscopes and tarot insights with Lumora.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sarabun:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="cosmic-bg min-h-screen text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}