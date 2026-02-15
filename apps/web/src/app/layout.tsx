
import type { Metadata } from 'next';
import { Inter, Outfit, Space_Grotesk } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Rverity - Absolute Truth for Your Digital Mind',
  description: 'Unify your fragmented existence. Rverity syncs your code, docs, and knowledge into one living, queryable graph.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} font-sans bg-black text-white min-h-screen selection:bg-cyan-500/30`}>
        {children}
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
