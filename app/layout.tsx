import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/toggle";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Catstagram",
  description: "Instagram for cats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <SpeedInsights/>
      <body>
        <Toaster/>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle />
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
