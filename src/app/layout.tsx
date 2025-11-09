import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ClearSkin - Know What\'s in Your Skincare',
  description: 'Cut through the marketing hype. Analyze skincare product ingredients instantly using AI.',
  keywords: ['skincare', 'ingredient analysis', 'cosmetics', 'beauty', 'AI'],
  authors: [{ name: 'ClearSkin Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#000000',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ClearSkin',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
