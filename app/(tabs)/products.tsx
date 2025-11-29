import { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Camera, Upload, Lightbulb, X } from 'lucide-react-native';

import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';
import { Button } from '@/components/nativewindui/Button';
import { evaluateProduct } from '@/lib/api/productService';
import { getPersonalColor } from '@/lib/storage';
import { PersonalColor } from '@/types/api';

export default function ProductsScreen() {
  const router = useRouter();
  const [personalColor, setPersonalColor] = useState<PersonalColor | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 화면이 포커스될 때마다 퍼스널 컬러 다시 로드
  useFocusEffect(
    useCallback(() => {
      loadPersonalColor();
    }, [])
  );

  const loadPersonalColor = async () => {
    const color = await getPersonalColor();
    console.log('Loaded personal color:', color);
    setPersonalColor(color);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '카메라 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleEvaluate = async () => {
    if (!selectedImage || !personalColor) return;

    setLoading(true);
    try {
      const imageFile = {
        uri: selectedImage,
        name: 'product.jpg',
        type: 'image/jpeg',
      };

      const response = await evaluateProduct(imageFile, personalColor);

      // Navigate to result page
      router.push({
        pathname: '/product-result',
        params: {
          resultData: JSON.stringify(response.result),
          imageUri: selectedImage,
        },
      });

      // Reset state
      setSelectedImage(null);
    } catch (error) {
      console.error('Product evaluation error:', error);
      Alert.alert('오류', '제품 평가 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 퍼스널 컬러가 없을 때 Empty State
  if (!personalColor) {
    return (
      <SafeAreaView className="flex-1 bg-black" edges={['top']}>
        <View className="flex-1 items-center justify-center px-8">
          <View className="mb-6 h-32 w-32 items-center justify-center rounded-full bg-gray-800">
            <Icon name="paintpalette" size={64} className="text-purple-400" />
          </View>
          <Text className="mb-3 text-center text-[24px] font-bold text-white">
            퍼스널 컬러 진단이 필요해요
          </Text>
          <Text className="mb-8 text-center text-[16px] leading-6 text-gray-400">
            제품이 나에게 어울리는지 확인하려면{'\n'}먼저 퍼스널 컬러 진단을 받아주세요
          </Text>
          <Button
            onPress={() => router.push('/diagnosis')}
            className="h-[58px] w-full rounded-[13px] bg-white active:bg-gray-100">
            <Text className="text-base font-medium text-black">퍼스널 컬러 진단하기</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
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

                {/* 중앙 아이콘 */}
                <View className="flex-col items-center gap-6">
                  {/* 이중 원형 아이콘 */}
                  <View className="relative">
                    <View className="h-28 w-28 items-center justify-center rounded-full border-4 border-gray-500">
                      <View className="h-20 w-20 items-center justify-center rounded-full border-4 border-gray-500">
                        <Camera className="text-gray-400" size={40} color="#9ca3af" />
                      </View>
                    </View>
                  </View>

                  <View className="max-w-[220px] text-center">
                    <Text className="text-center text-sm text-gray-300">
                      제품 사진을 촬영하거나{'\n'}갤러리에서 선택해주세요
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* 사진 촬영하기 버튼 */}
          <View className="mb-4 mt-6 px-6">
            <Button
              onPress={takePhoto}
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
              onPress={pickImage}
              className="h-[58px] w-full items-center justify-center rounded-[13px] border-2 border-gray-700 bg-transparent active:bg-gray-900">
              <View className="flex-row items-center justify-center gap-2">
                <Upload className="text-white" size={20} color="#ffffff" />
                <Text className="text-base font-medium text-white">갤러리에서 선택</Text>
              </View>
            </Pressable>
          </View>

          {/* 선택된 이미지 미리보기 */}
          {selectedImage && (
            <View className="mb-6 px-6">
              <View className="relative overflow-hidden rounded-3xl">
                <Image source={{ uri: selectedImage }} className="h-80 w-full" resizeMode="cover" />
                <Pressable
                  onPress={() => setSelectedImage(null)}
                  className="absolute right-4 top-4 h-10 w-10 items-center justify-center rounded-full bg-black/60">
                  <X size={24} color="#ffffff" />
                </Pressable>
              </View>

              {/* 평가하기 버튼 */}
              <View className="mt-4">
                <Button
                  onPress={handleEvaluate}
                  disabled={loading}
                  className="h-[58px] w-full rounded-[13px] bg-purple-600 active:bg-purple-700">
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-base font-medium text-white">AI 평가 시작하기</Text>
                  )}
                </Button>
              </View>
            </View>
          )}

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
                    <Text className="text-gray-400">촬영 팁:</Text> 제품이 잘 보이도록 밝은 곳에서
                    촬영해주세요
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
