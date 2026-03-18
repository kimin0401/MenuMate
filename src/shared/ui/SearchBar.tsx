import { Search } from 'lucide-react';

const searchBarWrapperClassName =
  'flex h-[56px] items-center rounded-full border border-[var(--mm-primary)] bg-white focus-within:border-[var(--mm-primary-hover)] focus-within:ring-4 focus-within:ring-[var(--mm-primary-soft)] md:h-[60px] lg:h-[64px]';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
};

export const SearchBar = ({ value, onChange, onSubmit, placeholder, disabled }: SearchBarProps) => {
  return (
    <form
      role="search"
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={searchBarWrapperClassName}>
        <input
          type="search"
          name="query"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-full min-w-0 flex-1 bg-transparent pr-2 pl-5 text-sm outline-none placeholder:text-gray-400 md:text-base"
          placeholder={placeholder || '검색어를 입력하세요'}
          disabled={disabled}
          aria-label="검색어 입력"
        />
        <button
          type="submit"
          className="group flex h-full shrink-0 items-center justify-center px-4 focus:outline-none"
          aria-label="검색"
          disabled={disabled}
        >
          <Search className="size-5 text-gray-400 transition-colors group-hover:text-[var(--mm-primary)]" />
        </button>
      </div>
    </form>
  );
};
