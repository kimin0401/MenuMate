// 레시피 페이지 로딩 컴포넌트
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <LoadingSpinner size="lg" label="레시피를 불러오는 중..." className="py-10" />
    </div>
  );
}
