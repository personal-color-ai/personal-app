import { CheckCircle2, XCircle, Camera, Sun, Smile } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Button } from '@/components/nativewindui/Button';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Placeholder for the missing asset
const exampleImage = { uri: 'https://via.placeholder.com/400x300' };

export default function PhotoGuide() {
  const router = useRouter();

  const handleConfirm = () => {
    console.log('가이드 확인 완료');
    router.push('/photo-capture');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="bg-white pb-10">
          {/* 카메라 아이콘 */}
          <View className="flex-row justify-center py-4">
            <View className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
              <Camera className="text-purple-600" size={40} color="#9333ea" />
            </View>
          </View>

          {/* 메인 제목 및 설명 */}
          <View className="mb-6 items-center space-y-2 px-6">
            <Text className="text-center text-xl font-bold">정확한 진단을 위한 가이드</Text>
            <Text className="text-center text-sm leading-5 text-gray-500">
              AI가 정확하게 분석할 수 있도록{'\n'}
              아래 가이드를 따라주세요
            </Text>
          </View>

          {/* 가이드 카드들 */}
          <View className="mb-8 gap-3 px-6">
            <View className="flex-row gap-3 rounded-2xl border border-yellow-100 bg-yellow-50 p-4">
              <View className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white">
                <Sun className="text-yellow-500" size={20} color="#eab308" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-base font-medium">자연광에서 촬영</Text>
                <Text className="text-sm text-gray-600">
                  창가나 야외에서 자연스러운 밝기로 촬영해주세요
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <View className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white">
                <Smile className="text-blue-500" size={20} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-base font-medium">화장은 지우고</Text>
                <Text className="text-sm text-gray-600">
                  자연스러운 피부 톤 분석을 위해 화장을 지워주세요
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3 rounded-2xl border border-green-100 bg-green-50 p-4">
              <View className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white">
                <Camera className="text-green-500" size={20} color="#22c55e" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-base font-medium">정면을 바라봐 주세요</Text>
                <Text className="text-sm text-gray-600">
                  얼굴에 그림자가 생기지 않게 정면을 바라봐주세요
                </Text>
              </View>
            </View>
          </View>

          {/* 촬영 예시 제목 */}
          <View className="mb-4 px-6">
            <Text className="text-center text-lg font-bold">촬영 예시</Text>
          </View>

          {/* GOOD/BAD 예시 그리드 */}
          <View className="px-6 pb-6">
            <View className="flex-row gap-4">
              {/* GOOD 카드 */}
              <View className="flex-1 rounded-2xl border-2 border-green-200 bg-green-50 p-4">
                <View className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-white">
                  <ImageWithFallback
                    source={exampleImage}
                    alt="Good example"
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                  <View className="absolute right-2 top-2 rounded-full bg-white p-1">
                    <CheckCircle2 className="text-green-500" size={20} color="#22c55e" />
                  </View>
                </View>
                <View className="gap-1">
                  <Text className="font-bold text-green-600">GOOD</Text>
                  <Text className="text-sm text-gray-700">자연광, 화장X</Text>
                </View>
              </View>

              {/* BAD 카드 */}
              <View className="flex-1 rounded-2xl border-2 border-red-200 bg-red-50 p-4">
                <View className="relative mb-3 flex aspect-[4/3] items-center justify-center rounded-xl bg-gray-200">
                  <Camera className="text-gray-400" size={48} color="#9ca3af" />
                  <View className="absolute right-2 top-2 rounded-full bg-white p-1">
                    <XCircle className="text-red-500" size={20} color="#ef4444" />
                  </View>
                </View>
                <View className="gap-1">
                  <Text className="font-bold text-red-600">BAD</Text>
                  <Text className="text-sm text-gray-700">어두운 조명</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 추가 팁 */}
          <View className="mb-8 px-6">
            <View className="rounded-2xl border-2 border-purple-100 bg-purple-50 p-5">
              <View className="mb-3 flex-row items-center gap-2">
                <Text className="text-lg">💡</Text>
                <Text className="text-base font-bold">추가 팁</Text>
              </View>
              <View className="gap-2">
                <View className="flex-row items-start gap-2">
                  <Text className="mt-0.5 text-gray-400">•</Text>
                  <Text className="flex-1 text-sm text-gray-700">
                    배경은 단색이나 밝으면 적절해요
                  </Text>
                </View>
                <View className="flex-row items-start gap-2">
                  <Text className="mt-0.5 text-gray-400">•</Text>
                  <Text className="flex-1 text-sm text-gray-700">
                    컬러 렌즈나 안경은 제거해주세요
                  </Text>
                </View>
                <View className="flex-row items-start gap-2">
                  <Text className="mt-0.5 text-gray-400">•</Text>
                  <Text className="flex-1 text-sm text-gray-700">목까지 나오도록 촬영해주세요</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 확인 버튼 */}
          <View className="px-6">
            <Button
              onPress={handleConfirm}
              className="h-[58px] w-full rounded-[13px] bg-purple-600 active:bg-purple-700">
              <Text className="text-lg font-bold text-white">가이드를 확인했어요</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
