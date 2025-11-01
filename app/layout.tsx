import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Chef Virtu Kitchen Database',
  description: 'Professional kitchen database and management system for chefs',
  viewport: 'width=device-width, initial-scale=1',
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
        <meta name="version" content="2.1" />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
