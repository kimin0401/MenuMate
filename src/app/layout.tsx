import type { Metadata } from 'next';
import { pretendard } from '@/styles/fonts/fonts';
import '../styles/globals.css';

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
        className={`${pretendard.variable} min-h-dvh bg-[var(--mm-bg)] text-[var(--mm-text)] antialiased`}
      >
        {/* 전역 공통 레이아웃 뼈대: main + footer 같은 걸 나중에 추가 가능 */}
        {children}
      </body>
    </html>
  );
}
