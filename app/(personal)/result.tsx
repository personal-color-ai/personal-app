import BeautyTab from '@/components/result/BeautyTab';
import ExperimentalReportTab from '@/components/result/ExperimentalReportTab';
import FashionTab from '@/components/result/FashionTab';
import OverviewTab from '@/components/result/OverviewTab';
import { savePersonalColor } from '@/lib/storage';
import { PersonalColor, ReportResult } from '@/types/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function Result() {
  const router = useRouter();
  const { photoUri, reportData } = useLocalSearchParams<{
    photoUri?: string;
    reportData?: string;
  }>();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Shared values for gestures
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startScale = useSharedValue(1);

  // API 응답 데이터 파싱
  const report = useMemo<ReportResult | null>(() => {
    if (!reportData) return null;
    try {
      return JSON.parse(reportData as string);
    } catch (error) {
      console.error('Failed to parse report data:', error);
      return null;
    }
  }, [reportData]);

  // 베스트 컬러와 피해야 할 컬러
  const bestColors = report?.personalColorReportDto.color.bestColors || [
    { name: '따뜻한 베이지', hex: '#edb98d' },
    { name: '골든 브라운', hex: '#cd853f' },
    { name: '카키', hex: '#c19b6c' },
    { name: '샌드', hex: '#b9966a' },
    { name: '페일 골드', hex: '#deb988' },
  ];
  const worstColors = report?.personalColorReportDto.color.worstColors || [
    { name: '차가운 그레이', hex: '#4a5568' },
    { name: '다크 그레이', hex: '#2d3748' },
    { name: '블랙', hex: '#1a202c' },
    { name: '스틸 그레이', hex: '#718096' },
    { name: '라이트 그레이', hex: '#a0aec0' },
  ];

  // 첫 번째 베스트 컬러를 기본 선택
  const backgroundColor = selectedColor || bestColors[0].hex;

  // 퍼스널 컬러 결과를 AsyncStorage에 저장
  useEffect(() => {
    if (report?.personalColorResponse?.image?.result) {
      const colorType = report.personalColorResponse.image.result;
      // PersonalColorType을 PersonalColor enum으로 변환
      const colorMap: Record<string, PersonalColor> = {
        spring: PersonalColor.SPRING_WARM,
        summer: PersonalColor.SUMMER_COOL,
        autumn: PersonalColor.AUTUMN_WARM,
        winter: PersonalColor.WINTER_COOL,
      };
      const personalColor = colorMap[colorType];
      if (personalColor) {
        savePersonalColor(personalColor).catch((error) =>
          console.error('Failed to save personal color:', error)
        );
      }
    }
  }, [report]);

  // Pan gesture for dragging
  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    });

  // Pinch gesture for zooming
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = Math.max(0.5, Math.min(startScale.value * event.scale, 3));
    });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View className="flex-1 bg-neutral-50">
      <ScrollView className="flex-1">
        <View className="pb-10">
          {/* 퍼스널 컬러 팔레트 섹션 */}
          <View className="mt-[21px] px-[30px]">
            <Text className="mb-[18px] text-[18px] font-semibold text-black">
              나의 퍼스널 컬러 팔레트
            </Text>

            {/* 베스트 컬러 */}
            <Text className="mb-[18px] text-[18px] font-semibold text-black">베스트 컬러</Text>
            <View className="mb-[18px] rounded-[12px] border border-neutral-200 bg-white p-[18px]">
              <Text className="mb-[16px] text-[16px] font-medium text-[#55606e]">
                색상을 탭하여 확인해보세요
              </Text>
              <View className="flex-row gap-[15px]">
                {bestColors.map((color, index) => (
                  <Pressable
                    key={`best-${index}`}
                    onPress={() => setSelectedColor(color.hex)}
                    className="relative">
                    <View
                      className={`h-[45px] w-[45px] rounded-[12px] ${selectedColor === color.hex ? 'border-4 border-white shadow-md' : ''}`}
                      style={{ backgroundColor: color.hex }}
                    />
                    {selectedColor === color.hex && (
                      <View className="absolute left-[10px] top-[11px]">
                        <Check size={24} color="white" />
                      </View>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>

            {/* 피해야 할 컬러 */}
            <Text className="mb-[18px] text-[18px] font-semibold text-black">피해야 할 컬러</Text>
            <View className="rounded-[12px] border border-neutral-200 bg-white p-[18px]">
              <Text className="mb-[16px] text-[16px] font-medium text-[#55606e]">
                색상을 탭하여 확인해보세요
              </Text>
              <View className="flex-row gap-[15px]">
                {worstColors.map((color, index) => (
                  <Pressable
                    key={`worst-${index}`}
                    onPress={() => setSelectedColor(color.hex)}
                    className="relative">
                    <View
                      className={`h-[45px] w-[45px] rounded-[12px] ${selectedColor === color.hex ? 'border-4 border-white shadow-md' : ''}`}
                      style={{ backgroundColor: color.hex }}
                    />
                    {selectedColor === color.hex && (
                      <View className="absolute left-[10px] top-[11px]">
                        <Check size={24} color="white" />
                      </View>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* 이미지 카드 with circular mask */}
          <View className="mt-[25px] px-[30px]">
            <View
              className="items-center justify-center overflow-hidden rounded-[12px] border border-neutral-200"
              style={{ backgroundColor, height: 350 }}>
              {/* Instruction text */}
              <View className="absolute left-0 right-0 top-3 z-10">
                <Text className="text-center text-xs text-gray-600">
                  드래그로 이동, 핀치로 확대/축소
                </Text>
              </View>

              {/* Circular mask container */}
              <View
                style={{
                  width: 240,
                  height: 240,
                  borderRadius: 120,
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 6,
                  elevation: 5,
                }}>
                {photoUri ? (
                  <GestureDetector gesture={composedGesture}>
                    <Animated.View style={[{ width: 240, height: 240 }, animatedStyle]}>
                      <Image
                        source={{ uri: photoUri }}
                        style={{ width: 240, height: 240 }}
                        resizeMode="cover"
                      />
                    </Animated.View>
                  </GestureDetector>
                ) : (
                  <View className="h-full w-full rounded-lg bg-gray-200" />
                )}
              </View>
            </View>
          </View>

          {/* 탭 네비게이션 */}
          <View className="mt-[22px] px-[31px]">
            <View className="rounded-[16px] border border-neutral-200 bg-[#fefefd] p-[3px]">
              <View className="flex-row gap-[4px]">
                <Pressable
                  onPress={() => setSelectedTab('overview')}
                  className={`flex-1 items-center rounded-[14px] px-[16px] py-[10px] ${selectedTab === 'overview' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[13px] font-bold ${selectedTab === 'overview' ? 'text-white' : 'text-black'}`}>
                    개요
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedTab('fashion')}
                  className={`flex-1 items-center rounded-[14px] px-[16px] py-[10px] ${selectedTab === 'fashion' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[13px] font-bold ${selectedTab === 'fashion' ? 'text-white' : 'text-black'}`}>
                    패션
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedTab('beauty')}
                  className={`flex-1 items-center rounded-[14px] px-[16px] py-[10px] ${selectedTab === 'beauty' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[13px] font-bold ${selectedTab === 'beauty' ? 'text-white' : 'text-black'}`}>
                    뷰티
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedTab('report')}
                  className={`flex-1 items-center rounded-[14px] px-[16px] py-[10px] ${selectedTab === 'report' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[13px] font-bold ${selectedTab === 'report' ? 'text-white' : 'text-black'}`}>
                    보고서
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* 탭 컨텐츠 */}
          {selectedTab === 'overview' && (
            <OverviewTab
              colorInfo={report?.personalColorReportDto.color}
              summary={report?.personalColorReportDto.summary.content}
              analysisData={report?.personalColorResponse}
            />
          )}
          {selectedTab === 'fashion' && (
            <FashionTab fashionInfo={report?.personalColorReportDto.fashion} />
          )}
          {selectedTab === 'beauty' && (
            <BeautyTab beautyInfo={report?.personalColorReportDto.beauty} />
          )}
          {selectedTab === 'report' && (
            <ExperimentalReportTab
              colorInfo={report?.personalColorReportDto.color}
              summary={report?.personalColorReportDto.summary.content}
              analysisData={report?.personalColorResponse}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
