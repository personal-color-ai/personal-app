// 퍼스널 컬러 타입
export type PersonalColorType = 'spring' | 'summer' | 'autumn' | 'winter';

// 확률 정보
export interface ColorProbabilities {
  spring: number;
  summer: number;
  autumn: number;
  winter: number;
}

// 분석 결과
export interface AnalysisResult {
  result: PersonalColorType;
  probs: ColorProbabilities;
}

// 퍼스널 컬러 응답
export interface PersonalColorResponse {
  message: string;
  image: AnalysisResult;
  lip: AnalysisResult;
  eye: AnalysisResult;
}

// 요약 정보
export interface Summary {
  content: string;
}

// 컬러 아이템
export interface ColorItem {
  name: string;
  hex: string;
}

// 컬러 정보
export interface ColorInfo {
  colorType: string;
  bestColors: ColorItem[];
  worstColors: ColorItem[];
}

// 패션 정보
export interface FashionInfo {
  recommendedMaterials: string[];
  recommendedPatterns: string[];
}

// 뷰티 정보
export interface BeautyInfo {
  lipColors: ColorItem[];
  eyeShadows: ColorItem[];
  hairColors: ColorItem[];
  jewelry: string[];
}

// 퍼스널 컬러 리포트
export interface PersonalColorReportDto {
  summary: Summary;
  color: ColorInfo;
  fashion: FashionInfo;
  beauty: BeautyInfo;
}

// API 응답 결과
export interface ReportResult {
  personalColorResponse: PersonalColorResponse;
  personalColorReportDto: PersonalColorReportDto;
}

// API 응답
export interface ResponseDto<T> {
  status: string;
  message: string | null;
  result: T;
}

// 전체 리포트 응답 타입
export type ReportResponse = ResponseDto<ReportResult>;

// 제품 평가 관련 타입
export enum PersonalColor {
  SPRING_WARM = 'SPRING_WARM',
  SUMMER_COOL = 'SUMMER_COOL',
  AUTUMN_WARM = 'AUTUMN_WARM',
  WINTER_COOL = 'WINTER_COOL',
}

export interface ProductEvaluationResponse {
  suitable: boolean;
  score: number;
  reason: string;
  colorAnalysis: string;
  recommendation: string;
}

export type ProductEvaluationResult = ResponseDto<ProductEvaluationResponse>;
