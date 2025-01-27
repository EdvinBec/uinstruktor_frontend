import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UInstruktor",
  description: "Interaktivna platforma za ucenje programiranja",
  authors: [
    { name: "Aljaz krajnc" },
    { name: "Edvin Becic" },
    { name: "Muhamed Karahasanovic" },
  ],
  publisher: "Srednja elektro-računalniška šola Maribor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/icon.svg" sizes="any" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="uinstruktor-theme"
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
