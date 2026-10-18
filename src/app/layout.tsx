import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BUBT TAFE IELTS Academy | Official Computer-Delivered Examination Portal',
  description:
    'Product of BUBT TAFE & Developed by Masruf Rahman (www.masrufrahman.info). Complete computer-delivered IELTS simulation for Listening, Reading, Writing, and Speaking with automatic band score calculation and TRF certification.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-red-100 selection:text-red-900">
        {children}
      </body>
    </html>
  );
}
