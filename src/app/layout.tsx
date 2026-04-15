import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: 'MenuMate',
  description: '메뉴 레시피 조회 사이트',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
