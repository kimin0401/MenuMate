// 프론트와 서버가 공통으로 믿고 쓸 내부 타입 정의, 데이터 모양을 정하는 파일
export type SearchResult = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
};

export type SearchApiResponse = {
  results: SearchResult[];
};
