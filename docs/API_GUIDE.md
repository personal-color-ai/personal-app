# API 연동 가이드

## 설정 파일

### 1. 환경 변수 (.env)

```
API_BASE_URL=http://168.107.53.130:8080
```

### 2. 타입 정의 (types/api.ts)

- `PersonalColorType`: 퍼스널 컬러 타입 (spring, summer, autumn, winter)
- `ReportResponse`: API 응답 타입
- `PersonalColorReportDto`: 리포트 상세 정보

### 3. Axios 클라이언트 (lib/api/client.ts)

- 기본 URL 설정
- 30초 타임아웃
- 요청/응답 인터셉터 포함

### 4. API 서비스 (lib/api/reportService.ts)

- `getPersonalColorReport`: 이미지 업로드 및 분석 요청

## 사용 예시

```typescript
import { getPersonalColorReport } from '@/lib/api/reportService';

// 이미지 파일 준비
const imageFile = {
  uri: 'file:///path/to/image.jpg',
  name: 'photo.jpg',
  type: 'image/jpeg',
};

try {
  // API 호출
  const response = await getPersonalColorReport(imageFile);

  // 결과 사용
  const { personalColorResponse, personalColorReportDto } = response.result;

  console.log('분석 결과:', personalColorResponse.image.result); // 'summer'
  console.log('베스트 컬러:', personalColorReportDto.color.bestColors);
  console.log('패션 추천:', personalColorReportDto.fashion);
  console.log('뷰티 추천:', personalColorReportDto.beauty);
} catch (error) {
  console.error('API 오류:', error);
}
```

## 응답 데이터 구조

```typescript
{
  status: "OK",
  message: null,
  result: {
    personalColorResponse: {
      message: "complete",
      image: { result: "summer", probs: {...} },
      lip: { result: "spring", probs: {...} },
      eye: { result: "summer", probs: {...} }
    },
    personalColorReportDto: {
      summary: { content: "..." },
      color: {
        colorType: "여름 쿨 라이트",
        bestColors: [...],
        worstColors: [...]
      },
      fashion: {
        recommendedMaterials: [...],
        recommendedPatterns: [...]
      },
      beauty: {
        lipColors: [...],
        eyeShadows: [...],
        hairColors: [...],
        jewelry: [...]
      }
    }
  }
}
```

## 주의사항

1. 이미지 파일은 multipart/form-data 형식으로 전송됩니다
2. 타임아웃은 30초로 설정되어 있습니다
3. 모든 API 요청/응답은 콘솔에 로그됩니다
4. 환경 변수는 app.json의 extra 섹션에서 관리됩니다
