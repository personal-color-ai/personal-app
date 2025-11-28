import { View, Text } from 'react-native';

export default function BeautyTab() {
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
            <Text className="text-[14px] text-[#55606e]">MLBB 톤스, 코랄 핑크, 브릭 레드</Text>
          </View>

          {/* 아이섀도우 */}
          <View className="gap-[8px]">
            <Text className="text-[16px] font-semibold text-[#0f0f0f]">아이섀도우</Text>
            <Text className="text-[14px] text-[#55606e]">브라운 계열, 매트 텍스처</Text>
          </View>

          {/* 헤어 컬러 */}
          <View className="gap-[8px]">
            <Text className="text-[16px] font-semibold text-[#0f0f0f]">헤어 컬러</Text>
            <Text className="text-[14px] text-[#55606e]">초코 브라운, 애쉬 브라운</Text>
          </View>

          {/* 주얼리 */}
          <View className="gap-[8px]">
            <Text className="text-[16px] font-semibold text-[#0f0f0f]">주얼리</Text>
            <Text className="text-[14px] text-[#55606e]">옐로우 골드, 로즈 골드</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
