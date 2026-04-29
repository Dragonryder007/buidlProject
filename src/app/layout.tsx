import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://buidl3.xyz/";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadataBase = new URL(SITE_URL);

export const metadata: Metadata = {
  title: "BUIDL3 – BUIDL3 at Devcon",
  description:
    "The elite buidler pipeline for the next generation of Web3 pioneers. Join us at Devcon Mumbai and ship real products.",
  keywords: [
    "BUIDL3",
    "Web3",
    "Devcon",
    "builders",
    "startup",
    "hackathon",
  ],
  authors: [{ name: "BUIDL3 Team" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "BUIDL3 – BUIDL3 at Devcon",
    description:
      "The elite buidler pipeline for the next generation of Web3 pioneers. Join us at Devcon Mumbai and ship real products.",
    url: SITE_URL,
    siteName: "BUIDL3",
    images: [
      {
        url: `${SITE_URL}/events/og-image.png`,
        width: 1200,
        height: 630,
        alt: "BUIDL3 at Devcon Mumbai",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BUIDL3 – BUIDL3 at Devcon",
    description:
      "The elite buidler pipeline for the next generation of Web3 pioneers.",
    images: [`${SITE_URL}/events/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "BUIDL3",
      "url": SITE_URL,
      "logo": `${SITE_URL}/logos/logo.png`,
      "sameAs": [
        "https://twitter.com/",
        "https://github.com/"
      ]
    },
    {
      "@type": "WebSite",
      "url": SITE_URL,
      "name": "BUIDL3",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}', { page_path: window.location.pathname });`,
              }}
            />
          </>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
