import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';
import { getPersonalColorReport } from '@/lib/storage';
import { PersonalColor } from '@/types/api';

export default function MyPageScreen() {
  const router = useRouter();
  const [personalColor, setPersonalColor] = useState<PersonalColor | null>(null);
  const [colorTypeName, setColorTypeName] = useState<string>('');

  // 화면이 포커스될 때마다 퍼스널 컬러 다시 로드
  useFocusEffect(
    useCallback(() => {
      loadPersonalColor();
    }, [])
  );

  const loadPersonalColor = async () => {
    const report = await getPersonalColorReport();
    if (report?.personalColorReportDto?.color?.colorType) {
      setColorTypeName(report.personalColorReportDto.color.colorType);

      // enum 값도 설정 (기존 로직 호환성을 위해)
      const colorType = report.personalColorResponse?.image?.result;
      if (colorType) {
        const colorMap: Record<string, PersonalColor> = {
          spring: PersonalColor.SPRING_WARM,
          summer: PersonalColor.SUMMER_COOL,
          autumn: PersonalColor.AUTUMN_WARM,
          winter: PersonalColor.WINTER_COOL,
        };
        setPersonalColor(colorMap[colorType]);
      }
    }
  };

  const getColorKoreanName = (color: PersonalColor): string => {
    const colorNames = {
      [PersonalColor.SPRING_WARM]: '봄 웜톤',
      [PersonalColor.SUMMER_COOL]: '여름 쿨톤',
      [PersonalColor.AUTUMN_WARM]: '가을 웜톤',
      [PersonalColor.WINTER_COOL]: '겨울 쿨톤',
    };
    return colorNames[color] || '';
  };

  const getColorEmoji = (color: PersonalColor): string => {
    const colorEmojis = {
      [PersonalColor.SPRING_WARM]: '🌸',
      [PersonalColor.SUMMER_COOL]: '🌊',
      [PersonalColor.AUTUMN_WARM]: '🍂',
      [PersonalColor.WINTER_COOL]: '❄️',
    };
    return colorEmojis[color] || '🎨';
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Content */}
        <View className="flex-1 gap-6 px-5 py-6">
          {/* Profile Section */}
          <View className="flex-row items-start gap-4">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-[#c084fc]">
              <Icon name="person.fill" size={32} className="text-white" />
            </View>
            <View className="flex-1 gap-2">
              <Text className="text-[20px] font-bold text-[#0f0f0f]">김민준님</Text>
              <Text className="text-[14px] text-[#55606e]">가입일: 2024년 10월</Text>
              {colorTypeName && (
                <Text className="text-[14px] font-medium text-[#9810fa]">{colorTypeName}</Text>
              )}
            </View>
          </View>

          {/* Personal Color CTA */}
          {colorTypeName ? (
            <Pressable
              onPress={() => router.push('/diagnosis')}
              className="items-center gap-4 rounded-2xl border-2 border-[#9810fa] bg-purple-50 p-6">
              <Text className="text-[18px] font-bold text-[#9810fa]">{colorTypeName}</Text>
              <Text className="text-center text-[14px] text-[#55606e]">다시 진단받으시겠어요?</Text>
              <View className="rounded-lg bg-[#9810fa] px-6 py-2.5">
                <Text className="text-[16px] font-medium text-white">재진단 받기</Text>
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => router.push('/diagnosis')}
              className="items-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-6">
              <Icon name="paintpalette" size={32} className="text-gray-400" />
              <Text className="text-[14px] text-[#55606e]">퍼스널 컬러 진단을 받아보세요</Text>
              <View className="rounded-lg bg-black px-6 py-2.5">
                <Text className="text-[16px] font-medium text-white">진단 받기</Text>
              </View>
            </Pressable>
          )}

          {/* Usage Statistics */}
          <View>
            <Text className="mb-4 text-[18px] font-bold text-[#0f0f0f]">이용 통계</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-5">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                  <Icon name="chart.bar.fill" size={20} className="text-blue-500" />
                </View>
                <View className="items-center gap-1">
                  <Text className="text-[24px] font-bold text-blue-500">
                    {personalColor ? '1' : '0'}
                  </Text>
                  <Text className="text-[13px] text-[#55606e]">진단 횟수</Text>
                </View>
              </View>

              <View className="flex-1 items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-5">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-green-50">
                  <Icon name="star.fill" size={20} className="text-green-500" />
                </View>
                <View className="items-center gap-1">
                  <Text className="text-[24px] font-bold text-green-500">
                    {personalColor ? '완료' : '-'}
                  </Text>
                  <Text className="text-[13px] text-[#55606e]">진단 상태</Text>
                </View>
              </View>

              <View className="flex-1 items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-5">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-purple-50">
                  <Icon name="calendar" size={20} className="text-purple-500" />
                </View>
                <View className="items-center gap-1">
                  <Text className="text-[24px] font-bold text-purple-500">7</Text>
                  <Text className="text-[13px] text-[#55606e]">사용 일수</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Menu */}
          <View>
            <Text className="mb-4 text-[18px] font-bold text-[#0f0f0f]">메뉴</Text>
            <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <Pressable className="flex-row items-center justify-between border-b border-neutral-200 px-5 py-4 active:bg-gray-50">
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-purple-50">
                    <Icon name="bell.fill" size={20} className="text-purple-500" />
                  </View>
                  <Text className="text-[16px] text-[#0f0f0f]">알림 설정</Text>
                </View>
                <Icon name="chevron.right" size={20} className="text-gray-400" />
              </Pressable>

              <Pressable className="flex-row items-center justify-between px-5 py-4 active:bg-gray-50">
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                    <Icon name="questionmark.bubble.fill" size={20} className="text-blue-500" />
                  </View>
                  <Text className="text-[16px] text-[#0f0f0f]">도움말</Text>
                </View>
                <Icon name="chevron.right" size={20} className="text-gray-400" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Bottom spacing for tab bar */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
