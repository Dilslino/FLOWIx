import "./globals.css";
import { ThemeProvider } from 'next-themes'

export const metadata = {
  title: "FlowIQ - Blog Psikologi",
  description: "Jelajahi wawasan psikologi untuk hidup lebih baik",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
