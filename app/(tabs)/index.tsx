import { View, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingTop: insets.top }}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="px-[34px] pt-[42px]">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[26px] font-bold text-[#0F0F0F]" style={{ fontFamily: 'System' }}>
              Color Me
            </Text>
            <Text className="mt-1 text-[16px] font-light text-black">
              AI 퍼스널 컬러 진단 서비스
            </Text>
          </View>
          <Pressable>
            <Icon name="person.circle" size={24} className="text-[#0F0F0F]" />
          </Pressable>
        </View>
      </View>

      {/* Illustration - Placeholder */}
      <View className="mt-8 items-center justify-center px-[78px]">
        <View className="h-[276px] w-[223px] items-center justify-center rounded-full bg-purple-100">
          <Icon name="person.fill" size={120} className="text-purple-400" />
        </View>
      </View>

      {/* Main Action Button */}
      <View className="mt-8 px-[29px]">
        <Pressable className="h-[58px] flex-row items-center justify-center gap-2 rounded-[13px] bg-[#9810FA]">
          <Icon name="paintpalette" size={22} className="text-white" />
          <Text className="text-[18px] font-medium text-white">내 퍼스널 컬러 진단받기</Text>
        </Pressable>
      </View>

      {/* Today's Color Tip Section */}
      <View className="mt-8 px-[34px]">
        <Text className="text-[18px] font-semibold text-black">오늘의 컬러 팁</Text>

        <View className="mt-4 rounded-[12px] border border-[#FFD6A7] bg-[#FEFCE9] p-4">
          <View className="flex-row">
            {/* Icon */}
            <View className="mr-4 h-[43px] w-[43px] items-center justify-center rounded-full bg-orange-100">
              <Icon name="sparkle" size={24} className="text-orange-600" />
            </View>

            {/* Content */}
            <View className="flex-1">
              <Text className="text-[18px] font-semibold text-black">가을 시즌 컬러 트렌드</Text>
              <Text className="mt-1 text-[14px] font-semibold text-[#777D87]">
                따듯하고 차분한 톤의 컬러가 인기 입니다.
              </Text>
              <View className="mt-2 self-start rounded-[5px] bg-[#EDEEF2] px-2 py-1">
                <Text className="text-[12px] font-semibold text-black">#가을웜뮤트#어스톤</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom spacing for tab bar */}
      <View className="h-24" />
    </ScrollView>
  );
}
