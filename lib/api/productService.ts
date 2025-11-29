import apiClient from './client';
import { ProductEvaluationResult, PersonalColor } from '@/types/api';

/**
 * 제품 평가 요청
 * @param productImage - 평가할 제품 이미지 파일
 * @param personalColor - 사용자의 퍼스널 컬러 타입
 * @returns 제품 평가 결과
 */
export const evaluateProduct = async (
  productImage: {
    uri: string;
    name: string;
    type: string;
  },
  personalColor: PersonalColor
): Promise<ProductEvaluationResult> => {
  const formData = new FormData();

  // React Native에서 파일 추가
  formData.append('productImage', {
    uri: productImage.uri,
    name: productImage.name,
    type: productImage.type,
  } as any);

  const response = await apiClient.post<ProductEvaluationResult>(
    `/products/evaluate?personalColor=${personalColor}`,
    formData
  );
  return response.data;
};
