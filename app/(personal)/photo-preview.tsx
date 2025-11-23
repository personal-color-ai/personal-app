import { RotateCcw } from "lucide-react-native";
import { Button } from "@/components/nativewindui/Button";
import { View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function PhotoPreview() {
  const router = useRouter();
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  const handleRetake = () => {
    console.log("다시 촬영");
    router.back();
  };

  const handleAnalyze = () => {
    console.log("분석 시작");
    // TODO: Navigate to analysis screen or start analysis
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['bottom']}>
      <View className="max-w-md mx-auto min-h-screen bg-black flex flex-col">
        {/* 사진 미리보기 영역 */}
        <View className="px-6 py-4 flex-1">
          <View className="rounded-3xl overflow-hidden h-full max-h-[500px] bg-gray-800">
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-400">사진을 불러올 수 없습니다</Text>
              </View>
            )}
          </View>
        </View>

        {/* 하단 버튼들 */}
        <View className="px-6 pb-8 pt-4 flex-row gap-4">
          <Pressable
            onPress={handleRetake}
            className="flex-1 h-[58px] bg-transparent border-2 border-gray-700 active:bg-gray-900 rounded-[13px]"
          >
            <View className="flex-row items-center justify-center gap-2">
              <RotateCcw className="text-white" size={20} color="#ffffff" />
              <Text className="text-white font-medium text-base">다시 촬영</Text>
            </View>
          </Pressable>
          
          <Button
            onPress={handleAnalyze}
            className="flex-1 h-[58px] bg-purple-600 active:bg-purple-700 rounded-[13px]"
          >
            <Text className="text-white font-medium text-base">분석 시작</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
