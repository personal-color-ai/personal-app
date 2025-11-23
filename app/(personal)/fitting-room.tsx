import { CheckCircle2, XCircle, Camera, ArrowLeft, Sun, Smile } from "lucide-react-native";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Button } from "@/components/nativewindui/Button";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Placeholder for the missing asset
const exampleImage = { uri: "https://via.placeholder.com/400x300" };

export default function PhotoGuide() {
  const router = useRouter();

  const handleConfirm = () => {
    console.log("가이드 확인 완료");
    // Navigate back or to next step
    // router.back(); 
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="max-w-md mx-auto min-h-screen bg-white pb-10">
          {/* 헤더 */}
          <View className="bg-white border-b border-gray-100 p-4">
            <View className="flex-row items-center justify-center relative">
              <Pressable onPress={() => router.back()} className="absolute left-0 p-2">
                <ArrowLeft className="text-black" size={24} color="black" />
              </Pressable>
              <Text className="text-center text-lg font-bold">퍼스널 컬러 진단 가이드</Text>
            </View>
          </View>

          {/* 진행 단계 */}
          <View className="flex-row items-center justify-center gap-4 py-6">
            <View className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <Text className="text-white font-bold">1</Text>
            </View>
            <View className="w-16 h-0.5 bg-gray-200"></View>
            <View className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Text className="text-gray-400 font-bold">2</Text>
            </View>
            <View className="w-16 h-0.5 bg-gray-200"></View>
            <View className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Text className="text-gray-400 font-bold">3</Text>
            </View>
          </View>

          {/* 카메라 아이콘 */}
          <View className="flex-row justify-center py-4">
            <View className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
              <Camera className="text-purple-600" size={40} color="#9333ea" />
            </View>
          </View>

          {/* 메인 제목 및 설명 */}
          <View className="px-6 space-y-2 mb-6 items-center">
            <Text className="text-xl font-bold text-center">정확한 진단을 위한 가이드</Text>
            <Text className="text-sm text-gray-500 text-center leading-5">
              AI가 정확하게 분석할 수 있도록{"\n"}
              아래 가이드를 따라주세요
            </Text>
          </View>

          {/* 가이드 카드들 */}
          <View className="px-6 gap-3 mb-8">
            <View className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100 flex-row gap-3">
              <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Sun className="text-yellow-500" size={20} color="#eab308" />
              </View>
              <View className="flex-1">
                <Text className="font-medium mb-1 text-base">자연광에서 촬영</Text>
                <Text className="text-sm text-gray-600">창가나 야외에서 자연스러운 밝기로 촬영해주세요</Text>
              </View>
            </View>

            <View className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex-row gap-3">
              <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Smile className="text-blue-500" size={20} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="font-medium mb-1 text-base">화장은 지우고</Text>
                <Text className="text-sm text-gray-600">자연스러운 피부 톤 분석을 위해 화장을 지워주세요</Text>
              </View>
            </View>

            <View className="bg-green-50 rounded-2xl p-4 border border-green-100 flex-row gap-3">
              <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Camera className="text-green-500" size={20} color="#22c55e" />
              </View>
              <View className="flex-1">
                <Text className="font-medium mb-1 text-base">정면을 바라봐 주세요</Text>
                <Text className="text-sm text-gray-600">얼굴에 그림자가 생기지 않게 정면을 바라봐주세요</Text>
              </View>
            </View>
          </View>

          {/* 촬영 예시 제목 */}
          <View className="px-6 mb-4">
            <Text className="text-center text-lg font-bold">촬영 예시</Text>
          </View>

          {/* GOOD/BAD 예시 그리드 */}
          <View className="px-6 pb-6">
            <View className="flex-row gap-4">
              {/* GOOD 카드 */}
              <View className="flex-1 bg-green-50 rounded-2xl p-4 border-2 border-green-200">
                <View className="relative aspect-[4/3] bg-white rounded-xl overflow-hidden mb-3">
                  <ImageWithFallback
                    source={exampleImage}
                    alt="Good example"
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <CheckCircle2 className="text-green-500" size={20} color="#22c55e" />
                  </View>
                </View>
                <View className="gap-1">
                  <Text className="text-green-600 font-bold">GOOD</Text>
                  <Text className="text-sm text-gray-700">자연광, 화장X</Text>
                </View>
              </View>

              {/* BAD 카드 */}
              <View className="flex-1 bg-red-50 rounded-2xl p-4 border-2 border-red-200">
                <View className="relative aspect-[4/3] bg-gray-200 rounded-xl mb-3 flex items-center justify-center">
                  <Camera className="text-gray-400" size={48} color="#9ca3af" />
                  <View className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <XCircle className="text-red-500" size={20} color="#ef4444" />
                  </View>
                </View>
                <View className="gap-1">
                  <Text className="text-red-600 font-bold">BAD</Text>
                  <Text className="text-sm text-gray-700">어두운 조명</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 추가 팁 */}
          <View className="px-6 mb-8">
            <View className="bg-purple-50 rounded-2xl p-5 border-2 border-purple-100">
              <View className="flex-row items-center gap-2 mb-3">
                <Text className="text-lg">💡</Text>
                <Text className="text-base font-bold">추가 팁</Text>
              </View>
              <View className="gap-2">
                <View className="flex-row items-start gap-2">
                  <Text className="text-gray-400 mt-0.5">•</Text>
                  <Text className="text-sm text-gray-700 flex-1">배경은 단색이나 밝으면 적절해요</Text>
                </View>
                <View className="flex-row items-start gap-2">
                  <Text className="text-gray-400 mt-0.5">•</Text>
                  <Text className="text-sm text-gray-700 flex-1">컬러 렌즈나 안경은 제거해주세요</Text>
                </View>
                <View className="flex-row items-start gap-2">
                  <Text className="text-gray-400 mt-0.5">•</Text>
                  <Text className="text-sm text-gray-700 flex-1">목까지 나오도록 촬영해주세요</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 확인 버튼 */}
          <View className="px-6">
            <Button
              onPress={handleConfirm}
              className="w-full bg-purple-600 active:bg-purple-700 py-4 rounded-2xl"
              size="lg"
            >
              <Text className="text-white font-bold text-lg">가이드를 확인했어요</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
