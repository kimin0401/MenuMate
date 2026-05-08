import { BrandLogo } from '@/shared/ui/BrandLogo';
import { SearchSection } from '@/features/search/ui/SearchSection';
import { Suspense } from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-dvh px-4">
      <section className="mx-auto flex min-h-dvh max-w-screen-md flex-col items-center justify-center gap-20 py-16">
        <Link href="/" aria-label="메인 페이지로 이동">
          <BrandLogo className="h-12 md:h-16 lg:h-20" />
        </Link>

        <div className="flex w-full flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="mt-4 text-sm leading-6 text-[var(--mm-text)] md:text-base">
              원하는 재료나 메뉴를 검색해보세요
            </h1>
          </div>

          <Suspense fallback="검색 중...">
            <SearchSection />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
