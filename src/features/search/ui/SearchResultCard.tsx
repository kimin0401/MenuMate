// 검색 결과 UI 담당 컴포넌트 예정
import Link from 'next/link';
import { SearchResult } from '@/features/search/model/types';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';

type Props = {
  result: SearchResult;
};

export const SearchResultCard = ({ result }: Props) => {
  return (
    <li className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
        <ImageWithFallback
          key={`${result.id}-${result.imageUrl}`}
          src={result.imageUrl}
          alt={result.name}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-gray-900">{result.name}</h3>
          <p className="text-sm text-gray-500">{result.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {result.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {tag}
            </span>
          ))}
        </div>
        {/* 테스트용 상세 페이지 링크 */}
        <Link
          href={`/recipes/${result.id}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          레시피 페이지 테스트 →
        </Link>
      </div>
    </li>
  );
};
