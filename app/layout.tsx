import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const titre = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const texte = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const prix = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Palier — Black Friday : les prix chutent quand le stock part",
  description:
    "Black Friday 2026 : chaque palier de vente fait baisser le prix. Plus on est nombreux à acheter, plus le prix baisse pour tout le monde.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${titre.variable} ${texte.variable} ${prix.variable}`}
    >
      <body className="bg-papier font-texte text-encre antialiased">
        {children}
      </body>
    </html>
  );
}