import { cn } from '@/shared/lib/cn';
import { BrandLogo } from '@/shared/ui/BrandLogo';
import { SearchSection } from '@/features/search/ui/SearchSection';
import { Suspense } from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-dvh px-4">
      <section className={cn('mx-auto grid min-h-dvh place-items-center py-16', 'max-w-screen-md')}>
        <Link href="/" aria-label="메인 페이지로 이동">
          <BrandLogo />
        </Link>
        <Suspense fallback="검색 중...">
          <SearchSection />
        </Suspense>
      </section>
    </main>
  );
}
