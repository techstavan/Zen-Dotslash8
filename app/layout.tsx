import type { Metadata } from "next";
// import { Montserrat, Comfortaa } from "next/font/google";

import "./globals.css";
import { Merriweather, Arima } from "next/font/google";

const forte = Arima({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-forte",
  weight: ["400"]
});

const heading = Merriweather({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["700"]
});
  
export const metadata: Metadata = {
  title: "PrepHelp",
};

export const maxDuration = 5;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${forte.variable} ${heading.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
