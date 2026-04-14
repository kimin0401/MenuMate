// queryFn을 쓰기 위해 API 호출 함수를 분리
export const fetchSearch = async (keyword: string) => {
  const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || '검색 요청 중 오류가 발생했습니다.');
  }

  const data = await response.json();
  return data.results;
};
