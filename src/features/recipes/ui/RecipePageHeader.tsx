// 레시피 페이지용 뒤로가기, 메인페이지 돌아가기 상단 바 컴포넌트
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { BrandLogo } from '@/shared/ui/BrandLogo';

const CONTAINER_STYLE =
  'flex items-center justify-between gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-4 py-3 shadow-sm';

const BACK_BUTTON_STYLE =
  'inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-[var(--mm-text)] transition hover:bg-[var(--mm-inner-card-soft)]';

export const RecipePageHeader = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={CONTAINER_STYLE}>
      <button
        type="button"
        onClick={handleBackClick}
        className={BACK_BUTTON_STYLE}
        aria-label="뒤로가기"
      >
        <ChevronLeft className="h-4 w-4" />
        뒤로가기
      </button>

      <Link href="/" aria-label="메인 페이지로 이동" className="shrink-0">
        <BrandLogo />
      </Link>
    </div>
  );
};
