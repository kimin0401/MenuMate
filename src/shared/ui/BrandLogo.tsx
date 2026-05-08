import { cn } from '@/shared/lib/cn';

type BrandLogoProps = {
  className?: string;
};

export const BrandLogo = ({ className = 'h-10' }: BrandLogoProps) => {
  return (
    <img
      src="/logo/MenuMateLogo.svg"
      alt="MenuMate logo"
      className={cn('w-auto select-none', className)}
    />
  );
};
