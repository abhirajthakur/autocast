import { Providers } from "@/components/providers";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@autocast/ui/globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Autocast - Turn Long-Form Content into Media Assets",
  description:
    "Automate your content pipeline with event-driven workflows. Convert blogs and podcasts into short-form videos, tweets, and audio snippets instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
