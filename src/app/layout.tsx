import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGeo } from "@/app/lib/queries";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khelo - Sports & Recreation Hub",
  description:
    "Khelo Sporting Club - Your ultimate destination for sports, training, matches, and community.",
  icons: {
    icon: "/khelo.png",
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const geo = await getGeo();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: geo?.name || "Khelo Sporting Club",
    description: geo?.description || "",
    url: geo?.url || "",
    logo: geo?.logo || "/khelo.png",
    foundingYear: geo?.foundingYear,
    sameAs: geo?.sameAs?.filter(Boolean) || [],
  };

  return (
    <html
      lang="en"
      className={`${bebas.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#0c1b2a] font-sans">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
