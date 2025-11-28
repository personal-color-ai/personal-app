import { Camera, Upload, Lightbulb, X } from 'lucide-react-native';
import { Button } from '@/components/nativewindui/Button';
import { View, Text, ScrollView, Pressable, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';

export default function PhotoCapture() {
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const handleTakePhoto = async () => {
    console.log('사진 촬영');

    // Request camera permission
    if (!permission) {
      const result = await requestPermission();
      if (!result.granted) {
        alert('카메라 권한이 필요합니다.');
        return;
      }
    } else if (!permission.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        alert('카메라 권한이 필요합니다.');
        return;
      }
    }

    // Show camera view
    setShowCamera(true);
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('사진 촬영 완료:', photo);
        setShowCamera(false);

        // Navigate to preview screen with photo URI
        router.push({
          pathname: '/(personal)/photo-preview',
          params: { photoUri: photo?.uri || 'placeholder' },
        });
      } catch (error) {
        console.error('사진 촬영 실패:', error);
        alert('사진 촬영에 실패했습니다.');
      }
    }
  };

  const handleCancelCamera = () => {
    setShowCamera(false);
  };

  const handleSelectFromGallery = async () => {
    console.log('갤러리에서 선택');

    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('갤러리 접근 권한이 필요합니다.');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      // Navigate to preview with selected image
      router.push({
        pathname: '/(personal)/photo-preview',
        params: { photoUri: result.assets[0].uri },
      });
    }
  };

  // Camera Modal
  if (showCamera) {
    return (
      <Modal visible={showCamera} animationType="slide">
        <SafeAreaView className="flex-1 bg-black">
          <View className="flex-1 bg-black">
            {/* Camera View */}
            <View className="flex-1">
              <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing={facing}>
                {/* Close button */}
                <View className="absolute right-4 top-4 z-10">
                  <Pressable
                    onPress={handleCancelCamera}
                    className="h-10 w-10 items-center justify-center rounded-full bg-black/50">
                    <X size={24} color="#ffffff" />
                  </Pressable>
                </View>

                {/* Guide circle */}
                <View className="flex-1 items-center justify-center">
                  <View
                    className="rounded-full border-2 border-dashed border-white/50"
                    style={{ width: 280, height: 280 }}
                  />
                </View>
              </CameraView>
            </View>

            {/* Capture button */}
            <View className="px-6 pb-8 pt-4">
              <Button
                onPress={handleCapture}
                className="h-[58px] w-full rounded-[13px] bg-white active:bg-gray-100">
                <View className="flex-row items-center justify-center gap-2">
                  <Camera className="text-black" size={20} color="#000000" />
                  <Text className="text-base font-medium text-black">사진 촬영</Text>
                </View>
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1">
        <View className="bg-black pb-10">
          {/* 촬영 영역 */}
          <View className="px-6 py-4">
            <View className="aspect-square rounded-3xl bg-gray-800 p-8">
              <View className="relative flex-1 items-center justify-center">
                {/* 점선 원 */}
                <View
                  className="absolute rounded-full border-2 border-dashed border-gray-500"
                  style={{ width: '70%', height: '70%' }}
                />

                {/* 중앙 카메라 아이콘 */}
                <View className="flex-col items-center gap-6">
                  {/* 이중 원형 카메라 아이콘 */}
                  <View className="relative">
                    <View className="h-28 w-28 items-center justify-center rounded-full border-4 border-gray-500">
                      <View className="h-20 w-20 items-center justify-center rounded-full border-4 border-gray-500">
                        <Camera className="text-gray-400" size={40} color="#9ca3af" />
                      </View>
                    </View>
                  </View>

                  <View className="max-w-[220px] text-center">
                    <Text className="text-center text-sm text-gray-300">
                      화면 중앙에 얼굴을 맞춰주세요{'\n'}
                      자연광에서 촬영하면 더욱 정확해요
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* 사진 촬영하기 버튼 */}
          <View className="mb-4 mt-6 px-6">
            <Button
              onPress={handleTakePhoto}
              className="h-[58px] w-full rounded-[13px] bg-white active:bg-gray-100">
              <View className="flex-row items-center justify-center gap-2">
                <Camera className="text-black" size={20} color="#000000" />
                <Text className="text-base font-medium text-black">사진 촬영하기</Text>
              </View>
            </Button>
          </View>

          {/* 또는 */}
          <View className="mb-4">
            <Text className="text-center text-sm text-gray-500">또는</Text>
          </View>

          {/* 갤러리에서 선택 버튼 */}
          <View className="mb-6 px-6">
            <Pressable
              onPress={handleSelectFromGallery}
              className="h-[58px] w-full items-center justify-center rounded-[13px] border-2 border-gray-700 bg-transparent active:bg-gray-900">
              <View className="flex-row items-center justify-center gap-2">
                <Upload className="text-white" size={20} color="#ffffff" />
                <Text className="text-base font-medium text-white">갤러리에서 선택</Text>
              </View>
            </Pressable>
          </View>

          {/* 촬영 팁 */}
          <View className="mb-8 px-6">
            <View className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
              <View className="flex-row items-start gap-3">
                <Lightbulb
                  className="mt-0.5 flex-shrink-0 text-yellow-500"
                  size={20}
                  color="#eab308"
                />
                <View className="flex-1">
                  <Text className="text-sm text-gray-300">
                    <Text className="text-gray-400">촬영 팁:</Text> 얼굴과 목이 모두 나오도록 하고,
                    직사광선은 피해주세요
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
