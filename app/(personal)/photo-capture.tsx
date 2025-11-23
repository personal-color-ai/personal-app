import { Camera, Upload, Lightbulb } from "lucide-react-native";
import { Button } from "@/components/nativewindui/Button";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';

export default function PhotoCapture() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("사진 촬영 완료:", photo);
        // Navigate to preview screen with photo URI
        router.push({
          pathname: '/photo-preview',
          params: { photoUri: photo?.uri }
        });
      } catch (error) {
        console.error("사진 촬영 실패:", error);
      }
    }
  };

  const handleSelectFromGallery = () => {
    console.log("갤러리에서 선택");
    // TODO: Implement gallery picker
  };

  if (!permission) {
    // Camera permissions are still loading
    return (
      <SafeAreaView className="flex-1 bg-black" edges={['bottom']}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-white">카메라 권한을 확인하는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView className="flex-1 bg-black" edges={['bottom']}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-white text-center mb-6">
            카메라 권한이 필요합니다.{"\n"}
            퍼스널 컬러 진단을 위해 카메라 접근을 허용해주세요.
          </Text>
          <Button
            onPress={requestPermission}
            className="h-[58px] bg-purple-600 active:bg-purple-700 px-8 rounded-[13px]"
          >
            <Text className="text-white font-medium">카메라 권한 허용</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['bottom']}>
      <ScrollView className="flex-1">
        <View className="max-w-md mx-auto min-h-screen bg-black pb-10">
          {/* 촬영 영역 */}
          <View className="px-6 py-4">
            <View className="rounded-3xl overflow-hidden aspect-square">
              <CameraView 
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                facing={facing}
              >
                {/* 점선 원 가이드 */}
                <View className="flex-1 items-center justify-center">
                  <View 
                    className="rounded-full border-2 border-dashed border-white/50" 
                    style={{ width: 280, height: 280 }}
                  />
                </View>
              </CameraView>
            </View>
          </View>

          {/* 안내 텍스트 */}
          <View className="px-6 mb-6">
            <Text className="text-sm text-gray-300 text-center">
              화면 중앙에 얼굴을 맞춰주세요{"\n"}
              자연광에서 촬영하면 더욱 정확해요
            </Text>
          </View>

          {/* 사진 촬영하기 버튼 */}
          <View className="px-6 mb-4 mt-6">
            <Button
              onPress={handleTakePhoto}
              className="w-full h-[58px] bg-white active:bg-gray-100 rounded-[13px]"
            >
              <View className="flex-row items-center justify-center gap-2">
                <Camera className="text-black" size={20} color="#000000" />
                <Text className="text-black font-medium text-base">사진 촬영하기</Text>
              </View>
            </Button>
          </View>

          {/* 또는 */}
          <View className="mb-4">
            <Text className="text-center text-gray-500 text-sm">또는</Text>
          </View>

          {/* 갤러리에서 선택 버튼 */}
          <View className="px-6 mb-6">
            <Pressable
              onPress={handleSelectFromGallery}
              className="w-full h-[58px] bg-transparent border-2 border-gray-700 active:bg-gray-900 rounded-[13px]"
            >
              <View className="flex-row items-center justify-center gap-2">
                <Upload className="text-white" size={20} color="#ffffff" />
                <Text className="text-white font-medium text-base">갤러리에서 선택</Text>
              </View>
            </Pressable>
          </View>

          {/* 촬영 팁 */}
          <View className="px-6 mb-8">
            <View className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
              <View className="flex-row items-start gap-3">
                <Lightbulb className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} color="#eab308" />
                <View className="flex-1">
                  <Text className="text-sm text-gray-300">
                    <Text className="text-gray-400">촬영 팁:</Text> 얼굴과 목이 모두 나오도록 하고, 직사광선은 피해주세요
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
