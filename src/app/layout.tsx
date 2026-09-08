import type { Metadata, Viewport } from "next";
import { Calistoga, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/lib/demo-store";
import { ToastProvider } from "@/components/ui/Toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-next",
  display: "swap",
});

const calistoga = Calistoga({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-calistoga-next",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-next",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shortellers — a marketplace for local content",
    template: "%s · Shortellers",
  },
  description:
    "Shortellers connects local businesses with nearby photographers and videographers. See real portfolios, compare packages, book in minutes.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5f2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${calistoga.variable} ${jetbrains.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <DemoProvider>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
            <MobileTabBar />
          </ToastProvider>
        </DemoProvider>
      </body>
    </html>
  );
}
