import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Supreme Group | Soft Trims and NVH Solutions",
  description: "Performance in motion - Evolving the drive with 360-degree nonwoven solutions for seamless rides",
  keywords: ["Supreme Group", "Automotive", "NVH Solutions", "Soft Trims", "Nonwoven", "Commercial Vehicles", "Passenger Vehicles"],
  authors: [{ name: "Supreme Group" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Supreme Group | Soft Trims and NVH Solutions",
    description: "Performance in motion - Evolving the drive with 360-degree nonwoven solutions",
    type: "website",
    locale: "en_US",
    siteName: "Supreme Group",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supreme Group | Soft Trims and NVH Solutions",
    description: "Performance in motion - Evolving the drive with 360-degree nonwoven solutions",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0067B1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent flash of unstyled content and handle theme
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
                document.documentElement.classList.add('preload');
              } catch (e) {
                // Fallback if localStorage is not available
              }
              
              window.addEventListener('load', () => {
                setTimeout(() => {
                  document.documentElement.classList.remove('preload');
                  document.documentElement.classList.add('dark-transition');
                }, 100);
              });
            `,
          }}
        />
      </head>
      <body className="font-manrope antialiased overflow-x-hidden">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
