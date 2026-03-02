import { cn } from '@/shared/lib/cn';

export default function HomePage() {
  return (
    <main className="min-h-dvh px-4">
      <section
        className={cn('mx-auto grid min-h-dvh place-items-center py-16', 'max-w-screen-md')}
      ></section>
    </main>
  );
}
