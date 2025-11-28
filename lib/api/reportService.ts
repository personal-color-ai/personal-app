import apiClient from './client';
import { ReportResponse } from '@/types/api';

/**
 * 퍼스널 컬러 분석 리포트 요청
 * @param imageFile - 분석할 이미지 파일
 * @returns 퍼스널 컬러 분석 결과
 */
export const getPersonalColorReport = async (imageFile: {
  uri: string;
  name: string;
  type: string;
}): Promise<ReportResponse> => {
  const formData = new FormData();

  // React Native에서 파일 추가
  formData.append('file', {
    uri: imageFile.uri,
    name: imageFile.name,
    type: imageFile.type,
  } as any);

  const response = await apiClient.post<ReportResponse>('/reports', formData);
  return response.data;
};
