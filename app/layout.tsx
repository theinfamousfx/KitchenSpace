import type { Metadata, Viewport } from "next";

// Separate metadata
export const metadata: Metadata = {
  title: "Kitchen Database",
  description: "Professional culinary management system",
};

// Separate viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2c3e50',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          // ... your CSS here
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
