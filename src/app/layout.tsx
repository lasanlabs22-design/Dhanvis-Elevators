import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Montserrat } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dhanvis Elevators Pvt Ltd | Lift Installation & Service in Tirupati",
    template: "%s · Dhanvis Elevators",
  },
  description: site.description,
  keywords: [
    "lift installation Tirupati",
    "elevators Tirupati",
    "home lift Tirupati",
    "passenger lift",
    "hospital lift",
    "goods lift",
    "capsule lift",
    "hydraulic lift",
    "MRL lift",
    "lift AMC Tirupati",
    "lift repair Tirupati",
    "Dhanvis Elevators",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: "Dhanvis Elevators | Engineered to lift. Designed to impress.",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhanvis Elevators | Lift Installation & Service in Tirupati",
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#050c24",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone.replace(/\s/g, ""),
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/icon.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street}, ${site.address.locality}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.pin,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "City", name: "Tirupati" },
  sameAs: [site.socials.instagram],
  makesOffer: [
    "Lift installation",
    "Lift AMC and maintenance",
    "Lift repair and breakdown service",
    "Lift modernisation",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${montserrat.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#about"
          className="sr-only z-[200] rounded-full bg-white px-4 py-2 text-navy-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
