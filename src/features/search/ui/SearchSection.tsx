// 검색 상태, 로직 담당 컴포넌트
'use client';

import { SearchBar } from '@/shared/ui/SearchBar';
import { useState } from 'react';

export const SearchSection = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleSubmit = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) return;

    setSubmittedKeyword(trimmed);
  };

  return (
    <div>
      <SearchBar
        value={inputValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};
