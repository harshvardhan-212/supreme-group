import { 
  Header, 
  Footer 
} from "@/components/layout";
import { 
  HeroSection, 
  ServicesSection, 
  ContactSection 
} from "@/components/sections";
import type { Metadata } from "next";

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

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}