import { cn } from '@/shared/lib/cn';

type BrandLogoProps = {
  className?: string;
};

export const BrandLogo = ({ className }: BrandLogoProps) => {
  return (
    <img
      src="/logo/MenuMateLogo.svg"
      alt="MenuMate logo"
      className={cn('h-10 w-auto select-none', className)}
    />
  );
};
