// 공용 로딩 스피너
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
};

const SIZE_MAP = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export const LoadingSpinner = ({ size = 'md', label, className }: Props) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <LoaderCircle className={cn('animate-spin text-[var(--mm-primary)]', SIZE_MAP[size])} />
      {label && <p className="text-sm text-[var(--mm-text-muted)]">{label}</p>}
    </div>
  );
};
