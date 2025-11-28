import { RotateCcw } from 'lucide-react-native';
import { Button } from '@/components/nativewindui/Button';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PhotoPreview() {
  const router = useRouter();
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  const handleRetake = () => {
    console.log('다시 촬영');
    router.back();
  };

  const handleAnalyze = () => {
    console.log('분석 시작');
    // TODO: Navigate to analysis/result screen
  };

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
