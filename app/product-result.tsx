import { View, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Lightbulb, ArrowLeft } from 'lucide-react-native';

import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';
import { ProductEvaluationResponse } from '@/types/api';

export default function ProductResultScreen() {
  const router = useRouter();
  const { resultData, imageUri } = useLocalSearchParams<{
    resultData?: string;
    imageUri?: string;
  }>();

  const result: ProductEvaluationResponse | null = resultData
    ? JSON.parse(resultData as string)
    : null;

  if (!result) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">결과를 불러올 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getGradientColors = (score: number) => {
    if (score >= 80) return ['#10b981', '#059669', '#047857'];
    if (score >= 60) return ['#f59e0b', '#d97706', '#b45309'];
    return ['#ef4444', '#dc2626', '#b91c1c'];
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <SafeAreaView edges={['top']}>
          <Pressable
            onPress={() => router.back()}
            className="mx-5 mt-4 h-12 w-12 items-center justify-center rounded-full bg-gray-100 active:bg-gray-200">
            <ArrowLeft size={24} color="#0f0f0f" />
          </Pressable>
        </SafeAreaView>

        <View className="gap-6 px-5 py-6">
          {/* 선택된 이미지 */}
          {imageUri && (
            <View className="overflow-hidden rounded-3xl shadow-lg">
              <Image
                source={{ uri: imageUri as string }}
                className="h-80 w-full"
                resizeMode="cover"
              />
            </View>
          )}

          {/* Beautiful Score Card */}
          <View className="overflow-hidden rounded-3xl shadow-2xl">
            <LinearGradient
              colors={getGradientColors(result.score)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ paddingHorizontal: 32, paddingVertical: 64 }}>
              {/* Score Circle */}
              <View className="items-center">
                <View className="relative mb-6">
                  {/* Outer glow circle */}
                  <View className="absolute h-48 w-48 rounded-full bg-white/10" />

                  {/* Main circle */}
                  <View className="h-48 w-48 items-center justify-center rounded-full border-8 border-white/30 bg-white/20">
                    <View className="items-center">
                      <Text className="text-[64px] font-bold text-white">{result.score}</Text>
                      <Text className="text-[14px] font-medium text-white/90">어울림 점수</Text>
                    </View>
                  </View>

                  {/* Decorative dots */}
                  <View className="absolute -right-2 top-8 h-4 w-4 rounded-full bg-white/40" />
                  <View className="absolute -left-2 bottom-12 h-3 w-3 rounded-full bg-white/30" />
                  <View className="absolute -top-1 right-8 h-2 w-2 rounded-full bg-white/50" />
                </View>

                {/* Recommendation Badge */}
                <View className="rounded-full bg-white px-8 py-3">
                  <Text
                    className="text-[18px] font-bold"
                    style={{ color: getScoreColor(result.score) }}>
                    {result.suitable ? '✓ 추천 제품' : '✗ 비추천 제품'}
                  </Text>
                </View>

                {/* Score Description */}
                <Text className="mt-4 text-center text-[15px] font-medium text-white/90">
                  {result.score >= 80
                    ? '완벽한 조화! 당신에게 딱 맞는 제품이에요'
                    : result.score >= 60
                      ? '괜찮은 선택이에요. 스타일링에 따라 달라질 수 있어요'
                      : '다른 제품을 추천드려요'}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Reason */}
          <View className="rounded-3xl bg-white p-6 shadow-md">
            <View className="mb-4 flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-purple-50">
                <Lightbulb size={20} color="#9810fa" />
              </View>
              <Text className="text-[18px] font-bold text-[#0f0f0f]">평가 이유</Text>
            </View>
            <Text className="text-[15px] leading-7 text-[#55606e]">{result.reason}</Text>
          </View>

          {/* Color Analysis */}
          <View className="rounded-3xl bg-white p-6 shadow-md">
            <View className="mb-4 flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                <Icon name="paintpalette.fill" size={20} className="text-blue-500" />
              </View>
              <Text className="text-[18px] font-bold text-[#0f0f0f]">색상 분석</Text>
            </View>
            <Text className="text-[15px] leading-7 text-[#55606e]">{result.colorAnalysis}</Text>
          </View>

          {/* Recommendation */}
          <View className="rounded-3xl bg-white p-6 shadow-md">
            <View className="mb-4 flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                <Icon name="star.fill" size={20} className="text-amber-500" />
              </View>
              <Text className="text-[18px] font-bold text-[#0f0f0f]">스타일링 추천</Text>
            </View>
            <Text className="text-[15px] leading-7 text-[#55606e]">{result.recommendation}</Text>
          </View>

          {/* New Evaluation Button */}
          <Pressable
            onPress={() => router.back()}
            className="rounded-2xl border-2 border-gray-200 bg-white py-4 shadow-sm active:bg-gray-50">
            <Text className="text-center text-[16px] font-semibold text-[#55606e]">
              새로운 제품 평가하기
            </Text>
          </Pressable>
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
