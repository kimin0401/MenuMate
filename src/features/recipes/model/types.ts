// 레시피 관련 데이터의 타입 정의
export type RecipeDetailRaw = {
  RCP_SEQ?: string;
  RCP_NM?: string;
  ATT_FILE_NO_MAIN?: string;
  RCP_PARTS_DTLS?: string;
  MANUAL01?: string;
  MANUAL02?: string;
  MANUAL03?: string;
  MANUAL04?: string;
  MANUAL05?: string;
  MANUAL06?: string;
  MANUAL07?: string;
  MANUAL08?: string;
  MANUAL09?: string;
  MANUAL10?: string;
  MANUAL11?: string;
  MANUAL12?: string;
  MANUAL13?: string;
  MANUAL14?: string;
  MANUAL15?: string;
  MANUAL16?: string;
  MANUAL17?: string;
  MANUAL18?: string;
  MANUAL19?: string;
  MANUAL20?: string;
  MANUAL_IMG01?: string;
  MANUAL_IMG02?: string;
  MANUAL_IMG03?: string;
  MANUAL_IMG04?: string;
  MANUAL_IMG05?: string;
  MANUAL_IMG06?: string;
  MANUAL_IMG07?: string;
  MANUAL_IMG08?: string;
  MANUAL_IMG09?: string;
  MANUAL_IMG10?: string;
  MANUAL_IMG11?: string;
  MANUAL_IMG12?: string;
  MANUAL_IMG13?: string;
  MANUAL_IMG14?: string;
  MANUAL_IMG15?: string;
  MANUAL_IMG16?: string;
  MANUAL_IMG17?: string;
  MANUAL_IMG18?: string;
  MANUAL_IMG19?: string;
  MANUAL_IMG20?: string;
};

export type RecipeStep = {
  description: string;
  imageUrl?: string;
};

export type RecipeDetail = {
  id: string;
  name: string;
  imageUrl: string;
  ingredients: string;
  steps: RecipeStep[];
};
