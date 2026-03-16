import type { Metadata } from "next";
import { Geist, Geist_Mono ,Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "sonner"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Station | Premium Restaurant & Delivery",
  description: "Experience the best delicious food in town with fast delivery and an award-winning chef team. Order daily meals, biryani, burgers, and more.",
  keywords: ["Food", "Restaurant", "Delivery", "Biryani", "Burger", "Fast Food", "Dining", "Eat", "Order Food"],
  authors: [{ name: "Food Station Team" }],
  creator: "Food Station",
  publisher: "Food Station",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://foodstation.example.com",
    title: "Food Station | Premium Restaurant & Delivery",
    description: "Experience the best delicious food in town with fast delivery and an award-winning chef team.",
    siteName: "Food Station",
    images: [
      {
        url: "/images/chicken-biryani.png",
        width: 1200,
        height: 630,
        alt: "Food Station Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Station | Premium Restaurant & Delivery",
    description: "Experience the best delicious food in town with fast delivery and an award-winning chef team.",
    images: ["/images/chicken-biryani.png"],
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
        suppressHydrationWarning
      >
        <Header/>
        {children}
        <Footer/>
        <Toaster richColors />
      </body>
    </html>
  );
}
