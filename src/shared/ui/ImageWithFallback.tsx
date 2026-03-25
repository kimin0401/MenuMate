// 이미지 실패 상황 처리용 fallback 컴포넌트
'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

const FALLBACK_IMAGE_SRC = '/images/recipe-fallback.png';

export const ImageWithFallback = ({ src, alt, sizes, className }: Props) => {
  const [hasError, setHasError] = useState(false);

  const normalizedSrc = src.trim();
  const finalSrc = !normalizedSrc || hasError ? FALLBACK_IMAGE_SRC : normalizedSrc;

  const handleImageError = () => {
    if (finalSrc !== FALLBACK_IMAGE_SRC) {
      setHasError(true);
    }
  };

  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={handleImageError}
    />
  );
};
