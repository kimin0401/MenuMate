import { cn } from '@/shared/lib/cn';
import { BrandLogo } from '@/shared/ui/brandLogo';
import { SearchBar } from '@/shared/ui/SearchBar';

export default function HomePage() {
  return (
    <main className="min-h-dvh px-4">
      <section className={cn('mx-auto grid min-h-dvh place-items-center py-16', 'max-w-screen-md')}>
        <BrandLogo />
        <SearchBar />
      </section>
    </main>
  );
}
