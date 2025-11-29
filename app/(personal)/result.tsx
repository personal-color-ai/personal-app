import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useState, useMemo } from 'react';
import OverviewTab from '@/components/result/OverviewTab';
import FashionTab from '@/components/result/FashionTab';
import BeautyTab from '@/components/result/BeautyTab';
import { ReportResult } from '@/types/api';

export default function Result() {
  const router = useRouter();
  const { photoUri, reportData } = useLocalSearchParams<{
    photoUri?: string;
    reportData?: string;
  }>();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [scrollY, setScrollY] = useState(0);

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
    '#edb98d',
    '#cd853f',
    '#c19b6c',
    '#b9966a',
    '#deb988',
  ];
  const worstColors = report?.personalColorReportDto.color.worstColors || [
    '#4a5568',
    '#2d3748',
    '#1a202c',
    '#718096',
    '#a0aec0',
  ];

  // 첫 번째 베스트 컬러를 기본 선택
  const backgroundColor = selectedColor || bestColors[0];

  return (
    <View className="flex-1 bg-neutral-50">
      <ScrollView
        className="flex-1"
        onScroll={(event) => {
          setScrollY(event.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}>
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
                    onPress={() => setSelectedColor(color)}
                    className="relative">
                    <View
                      className={`h-[45px] w-[45px] rounded-[12px] ${selectedColor === color ? 'border-4 border-white shadow-md' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                    {selectedColor === color && (
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
                    onPress={() => setSelectedColor(color)}
                    className="relative">
                    <View
                      className={`h-[45px] w-[45px] rounded-[12px] ${selectedColor === color ? 'border-4 border-white shadow-md' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                    {selectedColor === color && (
                      <View className="absolute left-[10px] top-[11px]">
                        <Check size={24} color="white" />
                      </View>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* 이미지 카드 */}
          <View className="mt-[25px] px-[30px]">
            <View
              className="h-[275px] items-center justify-center overflow-hidden rounded-[12px] border border-neutral-200"
              style={{ backgroundColor }}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} className="h-full w-full" resizeMode="cover" />
              ) : (
                <View className="h-full w-full rounded-lg bg-gray-200" />
              )}
            </View>
          </View>

          {/* 탭 네비게이션 */}
          <View className="mt-[22px] px-[31px]">
            <View className="rounded-[16px] border border-neutral-200 bg-[#fefefd] p-[3px]">
              <View className="flex-row gap-[4px]">
                <Pressable
                  onPress={() => setSelectedTab('overview')}
                  className={`flex-1 items-center rounded-[14px] px-[22px] py-[10px] ${selectedTab === 'overview' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[14px] font-bold ${selectedTab === 'overview' ? 'text-white' : 'text-black'}`}>
                    개요
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedTab('fashion')}
                  className={`flex-1 items-center rounded-[14px] px-[22px] py-[10px] ${selectedTab === 'fashion' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[14px] font-bold ${selectedTab === 'fashion' ? 'text-white' : 'text-black'}`}>
                    패션
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedTab('beauty')}
                  className={`flex-1 items-center rounded-[14px] px-[22px] py-[10px] ${selectedTab === 'beauty' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[14px] font-bold ${selectedTab === 'beauty' ? 'text-white' : 'text-black'}`}>
                    뷰티
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
              scrollY={scrollY}
            />
          )}
          {selectedTab === 'fashion' && (
            <FashionTab fashionInfo={report?.personalColorReportDto.fashion} />
          )}
          {selectedTab === 'beauty' && (
            <BeautyTab beautyInfo={report?.personalColorReportDto.beauty} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
