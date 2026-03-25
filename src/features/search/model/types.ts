// 프론트와 서버가 공통으로 믿고 쓸 내부 타입 정의, 데이터 모양을 정하는 파일
export type SearchResult = {
  id: string;
  name: string;
  summary: string;
  imageUrl: string;
  tags: string[];
};

export type SearchApiResponse = {
  results: SearchResult[];
};

export type FoodApiRecipeRaw = {
  RCP_SEQ?: string;
  RCP_NM?: string;
  RCP_PAT2?: string;
  HASH_TAG?: string;
  ATT_FILE_NO_MAIN?: string;
};

export type FoodApiResponseRaw = {
  COOKRCP01?: {
    row?: FoodApiRecipeRaw[];
    RESULT?: {
      CODE?: string;
      MSG?: string;
    };
    total_count?: string;
  };
};
