import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function AnalysisLoading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const progressWidth = `${progress}%`;

  return (
    <LinearGradient
      colors={['#3d2b6b', '#2d1f54', '#1e1644']}
      className="flex-1 items-center justify-center">
      <View className="items-center">
        <Text className="text-[26px] font-semibold text-white">AI 분석 진행 중</Text>
        <Text className="mt-[36px] text-[16px] font-medium text-[#bfb6d9]">
          잠시만 기다려주세요...
        </Text>

        {/* 이미지 플레이스홀더 */}
        <View className="mt-[78px] h-[188px] w-[152px] items-center justify-center rounded-[20px] bg-[#4c3996]/30">
          <Text className="text-[48px]">🎨</Text>
        </View>

        {/* 진행도 */}
        <View className="mt-[111px] w-[325px]">
          <View className="mb-[10px] flex-row items-center justify-between">
            <Text className="text-[18px] font-medium text-white">분석 진행도</Text>
            <Text className="text-[18px] font-medium text-white">{progress}%</Text>
          </View>

          {/* 프로그레스 바 */}
          <View className="h-[8px] w-full overflow-hidden rounded-[20px] bg-[#030213]">
            <View className="h-full rounded-[20px] bg-[#9810fa]" style={{ width: progressWidth }} />
          </View>
        </View>

        {/* 팁 카드 */}
        <View className="mt-[48px] w-[325px] rounded-[10px] border border-[#7849aa] bg-[#4c3996] p-[16px]">
          <Text className="mb-[8px] text-[16px] font-medium text-white">알고 계셨나요?</Text>
          <Text className="text-[14px] font-medium leading-[20px] text-[#a59cc8]">
            퍼스널 컬러는 피부톤, 눈동자, 헤어컬러의 조화로 결정됩니다. 같은 계절 타입이라도
            개인차가 있어 세부적인 컬러 추천이 중요해요
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
