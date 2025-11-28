import { RotateCcw } from 'lucide-react-native';
import { Button } from '@/components/nativewindui/Button';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { useState, useEffect } from 'react';
import { getPersonalColorReport } from '@/lib/api/reportService';
import { ReportResult } from '@/types/api';
import AnalysisLoading from '@/components/AnalysisLoading';

export default function PhotoPreview() {
  const router = useRouter();
  const navigation = useNavigation();
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 분석 중일 때 헤더 숨기기
  useEffect(() => {
    navigation.setOptions({
      headerShown: !isAnalyzing,
    });
  }, [isAnalyzing, navigation]);

  const handleRetake = () => {
    console.log('다시 촬영');
    router.back();
  };

  const handleAnalyze = async () => {
    if (!photoUri || photoUri === 'placeholder') {
      Alert.alert('오류', '사진을 먼저 촬영해주세요.');
      return;
    }

    try {
      setIsAnalyzing(true);
      console.log('분석 시작');

      // API 호출
      const response = await getPersonalColorReport({
        uri: photoUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      console.log('분석 완료:', response.result);

      // 결과 화면으로 이동
      router.push({
        pathname: '/(personal)/result',
        params: {
          photoUri: photoUri,
          reportData: JSON.stringify(response.result),
        },
      });
    } catch (error) {
      console.error('분석 오류:', error);
      Alert.alert('분석 실패', '퍼스널 컬러 분석에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 분석 중일 때 로딩 화면 표시 (헤더 없이)
  if (isAnalyzing) {
    return <AnalysisLoading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 bg-black">
        {/* 사진 미리보기 영역 */}
        <View className="flex-1 px-6 py-4">
          <View className="flex-1 overflow-hidden rounded-3xl bg-gray-800">
            {photoUri && photoUri !== 'placeholder' ? (
              <Image source={{ uri: photoUri }} className="h-full w-full" resizeMode="cover" />
            ) : (
              <View className="flex-1 items-center justify-center bg-gray-300">
                {/* 원형 영역 (얼굴) */}
                <View className="mb-4 h-40 w-40 rounded-full bg-yellow-600" />

                {/* 사각형 영역 (몸) */}
                <View className="mb-6 h-40 w-24 bg-indigo-600" />

                {/* 텍스트 */}
                <Text className="text-gray-700">Demo Photo</Text>
              </View>
            )}
          </View>
        </View>

        {/* 하단 버튼들 */}
        <View className="flex-row gap-4 px-6 pb-8 pt-4">
          <Pressable
            onPress={handleRetake}
            className="h-[58px] flex-1 items-center justify-center rounded-[13px] border-2 border-gray-700 bg-transparent active:bg-gray-900">
            <View className="flex-row items-center justify-center gap-2">
              <RotateCcw className="text-white" size={20} color="#ffffff" />
              <Text className="text-base font-medium text-white">다시 촬영</Text>
            </View>
          </Pressable>

          <Button
            onPress={handleAnalyze}
            className="h-[58px] flex-1 rounded-[13px] bg-purple-600 active:bg-purple-700">
            <Text className="text-base font-medium text-white">분석 시작</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
