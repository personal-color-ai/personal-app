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

// 컬러 정보
export interface ColorInfo {
  colorType: string;
  bestColors: string[];
  worstColors: string[];
}

// 패션 정보
export interface FashionInfo {
  recommendedMaterials: string[];
  recommendedPatterns: string[];
}

// 뷰티 정보
export interface BeautyInfo {
  lipColors: string[];
  eyeShadows: string[];
  hairColors: string[];
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
