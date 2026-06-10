import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Browse Equipment | Geenab Infra",
  description:
    "Browse and rent heavy construction equipment in India. Excavators, Bulldozers, Cranes, Loaders and more with clear pricing and verified listings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Barlow', system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
