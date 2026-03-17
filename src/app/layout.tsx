import type { Metadata } from 'next';
import { pretendard } from '@/styles/fonts/fonts';
import '@/styles/globals.css';
import { cn } from '@/shared/lib/cn';

export const metadata: Metadata = {
  title: 'MenuMate',
  description: '재료/메뉴명으로 레시피를 검색하는 메뉴 추천 도우미',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(pretendard.variable, 'bg-[var(--mm-bg)] text-[var(--mm-text)] antialiased')}
      >
        {children}
      </body>
    </html>
  );
}
