import { View, Text } from 'react-native';
import { BeautyInfo } from '@/types/api';

interface BeautyTabProps {
  beautyInfo?: BeautyInfo;
}

export default function BeautyTab({ beautyInfo }: BeautyTabProps) {
  // 기본값 설정
  const lipColors = beautyInfo?.lipColors || ['소프트 핑크', '코랄', '라이트 베리'];
  const eyeShadows = beautyInfo?.eyeShadows || ['라벤더', '소프트 브라운', '쿨 그레이'];
  const hairColors = beautyInfo?.hairColors || ['애쉬 블론드', '쿨 브라운', '다크 애쉬'];
  const jewelry = beautyInfo?.jewelry || ['실버', '화이트 골드', '플래티넘'];

  return (
    <View className="mt-[18px] px-[30px]">
      <View className="rounded-[16px] border border-neutral-200 bg-white p-[20px]">
        <View className="mb-[20px] flex-row items-center gap-[8px]">
          <Text className="text-[18px] font-semibold text-[#0f0f0f]">뷰티 추천</Text>
        </View>

        <View className="gap-[20px]">
          {/* 립 컬러 */}
          <View className="gap-[8px]">
            <Text className="text-[16px] font-semibold text-[#0f0f0f]">립 컬러</Text>
            <Text className="text-[14px] text-[#55606e]">{lipColors.join(', ')}</Text>
          </View>

          {/* 아이섀도우 */}
          <View className="gap-[8px]">
            <Text className="text-[16px] font-semibold text-[#0f0f0f]">아이섀도우</Text>
            <Text className="text-[14px] text-[#55606e]">{eyeShadows.join(', ')}</Text>
          </View>

          {/* 헤어 컬러 */}
          <View className="gap-[8px]">
            <Text className="text-[16px] font-semibold text-[#0f0f0f]">헤어 컬러</Text>
            <Text className="text-[14px] text-[#55606e]">{hairColors.join(', ')}</Text>
          </View>

          {/* 주얼리 */}
          <View className="gap-[8px]">
            <Text className="text-[16px] font-semibold text-[#0f0f0f]">주얼리</Text>
            <Text className="text-[14px] text-[#55606e]">{jewelry.join(', ')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
