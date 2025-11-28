import { View, Text } from 'react-native';
import { FashionInfo } from '@/types/api';

interface FashionTabProps {
  fashionInfo?: FashionInfo;
}

export default function FashionTab({ fashionInfo }: FashionTabProps) {
  // 기본값 설정
  const materials = fashionInfo?.recommendedMaterials || ['코튼', '린넨', '스웨이드', '니트'];
  const patterns = fashionInfo?.recommendedPatterns || ['체크', '페이즐리', '스트라이프'];

  return (
    <View className="mt-[18px] px-[30px]">
      <View className="rounded-[12px] border border-neutral-200 bg-white p-[20px]">
        <Text className="mb-[20px] text-[18px] font-semibold text-black">패션 스타일링</Text>

        {/* 추천 소재 */}
        <Text className="mb-[12px] text-[16px] font-semibold text-black">추천 소재</Text>
        <View className="mb-[28px] flex-row flex-wrap gap-[10px]">
          {materials.map((material, index) => (
            <View key={index} className="rounded-[10px] bg-[#edeef2] px-[9px] py-[4px]">
              <Text className="text-[14px] font-semibold text-[#383745]">{material}</Text>
            </View>
          ))}
        </View>

        {/* 추천 패턴 */}
        <Text className="mb-[12px] text-[16px] font-semibold text-black">추천 패턴</Text>
        <View className="mb-[28px] flex-row flex-wrap gap-[10px]">
          {patterns.map((pattern, index) => (
            <View key={index} className="rounded-[10px] bg-[#edeef2] px-[9px] py-[4px]">
              <Text className="text-[14px] font-semibold text-[#383745]">{pattern}</Text>
            </View>
          ))}
        </View>

        {/* 대비감 */}
        <Text className="mb-[12px] text-[16px] font-semibold text-black">대비감</Text>
        <Text className="text-[16px] font-medium text-[#4a5565]">
          톤온톤으로 부드럽게 연결되는 코디가 잘 어울려요
        </Text>
      </View>
    </View>
  );
}
