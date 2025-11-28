import { View, Text } from 'react-native';

export default function OverviewTab() {
  return (
    <>
      {/* 결과 카드 */}
      <View className="mt-[18px] px-[30px]">
        <View className="rounded-[12px] border border-[#fee685] bg-[#fff9ed] p-[20px]">
          <View className="flex-row items-center gap-[16px]">
            {/* 컬러 원 */}
            <View className="relative h-[60px] w-[60px]">
              <View className="h-[60px] w-[60px] rounded-full bg-[#f2c296]" />
              <View className="absolute left-[11px] top-[7px] h-[53px] w-[39px] rounded-full bg-[#d4a574]" />
            </View>

            {/* 텍스트 */}
            <View className="flex-1">
              <Text className="mb-[8px] text-[20px] font-medium text-black">가을 웜뮤트</Text>
              <View className="flex-row gap-[12px]">
                <View className="flex-row items-center gap-[5px]">
                  <Text className="text-[16px] font-medium text-[#4a5565]">명도</Text>
                  <View className="rounded-[5px] bg-[#fef3c6] px-[9px] py-[2px]">
                    <Text className="text-[14px] font-medium text-[#973b00]">medium</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-[5px]">
                  <Text className="text-[16px] font-medium text-[#4a5565]">채도</Text>
                  <View className="rounded-[5px] bg-[#fef3c6] px-[9px] py-[2px]">
                    <Text className="text-[14px] font-medium text-[#973b00]">muted</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 주요 특징 */}
      <View className="mt-[18px] px-[30px]">
        <View className="rounded-[12px] border border-neutral-200 bg-white p-[20px]">
          <Text className="mb-[16px] text-[18px] font-semibold text-black">주요 특징</Text>
          <View className="gap-[9px]">
            {[
              '따뜻한 언더톤의 피부',
              '따뜻한 언더톤의 피부',
              '따뜻한 언더톤의 피부',
              '따뜻한 언더톤의 피부',
            ].map((text, index) => (
              <View key={index} className="flex-row items-center gap-[8px]">
                <View className="h-[19px] w-[19px] items-center justify-center rounded-full bg-[#9810fa]">
                  <View className="h-[10px] w-[10px] rounded-full bg-white" />
                </View>
                <Text className="text-[16px] font-medium text-[#475161]">{text}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
}
