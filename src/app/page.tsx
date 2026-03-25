import { cn } from '@/shared/lib/cn';
import { BrandLogo } from '@/shared/ui/BrandLogo';
import { SearchSection } from '@/features/search/ui/SearchSection';

export default function HomePage() {
  return (
    <main className="min-h-dvh px-4">
      <section className={cn('mx-auto grid min-h-dvh place-items-center py-16', 'max-w-screen-md')}>
        <BrandLogo />
        <SearchSection />
      </section>
    </main>
  );
}
