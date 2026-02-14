import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pour toi...',
  description: 'Un poème pour toi, mon amour.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
