import { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, Alert, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';
import { evaluateProduct } from '@/lib/api/productService';
import { getPersonalColor } from '@/lib/storage';
import { PersonalColor, ProductEvaluationResponse } from '@/types/api';

export default function FittingRoom() {
  const router = useRouter();
  const [personalColor, setPersonalColor] = useState<PersonalColor | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductEvaluationResponse | null>(null);
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);

  useEffect(() => {
    loadPersonalColor();
  }, []);

  const loadPersonalColor = async () => {
    const color = await getPersonalColor();
    setPersonalColor(color);
    if (!color) {
      setShowDiagnosisModal(true);
    }
  };

  const pickImage = async () => {
    if (!personalColor) {
      setShowDiagnosisModal(true);
      return;
    }

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
      setResult(null);
    }
  };

  const takePhoto = async () => {
    if (!personalColor) {
      setShowDiagnosisModal(true);
      return;
    }

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
      setResult(null);
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
      setResult(response.result);
    } catch (error) {
      console.error('Product evaluation error:', error);
      Alert.alert('오류', '제품 평가 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  // 퍼스널 컬러가 없을 때 표시할 Empty State
  if (!personalColor) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        <View className="flex-1 items-center justify-center px-8">
          <View className="mb-6 h-32 w-32 items-center justify-center rounded-full bg-purple-50">
            <Icon name="paintpalette" size={64} className="text-[#9810fa]" />
          </View>
          <Text className="mb-3 text-center text-[24px] font-bold text-[#0f0f0f]">
            퍼스널 컬러 진단이 필요해요
          </Text>
          <Text className="mb-8 text-center text-[16px] leading-6 text-[#55606e]">
            제품이 나에게 어울리는지 확인하려면{'\n'}먼저 퍼스널 컬러 진단을 받아주세요
          </Text>
          <Pressable
            onPress={() => router.push('/diagnosis')}
            className="w-full rounded-xl bg-[#9810fa] py-4">
            <Text className="text-center text-[16px] font-semibold text-white">
              퍼스널 컬러 진단하기
            </Text>
          </Pressable>
        </View>

        {/* Diagnosis Modal */}
        <Modal
          visible={showDiagnosisModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDiagnosisModal(false)}>
          <Pressable
            className="flex-1 items-center justify-center bg-black/50"
            onPress={() => setShowDiagnosisModal(false)}>
            <Pressable className="mx-6 w-full max-w-sm rounded-3xl bg-white p-6" onPress={() => {}}>
              <View className="mb-4 items-center">
                <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-purple-50">
                  <Icon name="exclamationmark" size={40} className="text-[#9810fa]" />
                </View>
                <Text className="mb-2 text-center text-[20px] font-bold text-[#0f0f0f]">
                  퍼스널 컬러 진단 필요
                </Text>
                <Text className="text-center text-[14px] leading-6 text-[#55606e]">
                  제품 평가를 위해서는{'\n'}먼저 퍼스널 컬러 진단이 필요합니다
                </Text>
              </View>
              <View className="gap-3">
                <Pressable
                  onPress={() => {
                    setShowDiagnosisModal(false);
                    router.push('/diagnosis');
                  }}
                  className="rounded-xl bg-[#9810fa] py-4">
                  <Text className="text-center text-[16px] font-semibold text-white">
                    진단하러 가기
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setShowDiagnosisModal(false)}
                  className="rounded-xl bg-gray-100 py-4">
                  <Text className="text-center text-[16px] font-semibold text-[#55606e]">닫기</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-6 px-5 py-6">
          {/* Header */}
          <View>
            <Text className="text-[28px] font-bold text-[#0f0f0f]">제품 평가</Text>
            <Text className="mt-2 text-[15px] leading-6 text-[#55606e]">
              제품 이미지를 업로드하여{'\n'}내 퍼스널 컬러와의 어울림을 확인하세요
            </Text>
          </View>

          {/* Image Selection */}
          {selectedImage ? (
            <View className="overflow-hidden rounded-3xl shadow-lg">
              <Image source={{ uri: selectedImage }} className="h-80 w-full" resizeMode="cover" />
              <Pressable
                onPress={() => {
                  setSelectedImage(null);
                  setResult(null);
                }}
                className="absolute right-4 top-4 rounded-full bg-black/60 p-2.5">
                <Icon name="xmark" size={20} className="text-white" />
              </Pressable>
            </View>
          ) : (
            <View className="gap-4">
              <Pressable onPress={pickImage} className="overflow-hidden rounded-3xl shadow-sm">
                <LinearGradient
                  colors={['#f3e8ff', '#faf5ff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="flex-row items-center gap-4 p-6">
                  <View className="h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon name="photo" size={28} className="text-[#9810fa]" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[18px] font-bold text-[#0f0f0f]">갤러리에서 선택</Text>
                    <Text className="mt-1 text-[14px] text-[#55606e]">저장된 제품 사진 업로드</Text>
                  </View>
                  <Icon name="chevron.right" size={24} className="text-[#9810fa]" />
                </LinearGradient>
              </Pressable>

              <Pressable onPress={takePhoto} className="overflow-hidden rounded-3xl shadow-sm">
                <LinearGradient
                  colors={['#dbeafe', '#eff6ff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="flex-row items-center gap-4 p-6">
                  <View className="h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon name="camera" size={28} className="text-blue-500" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[18px] font-bold text-[#0f0f0f]">카메라로 촬영</Text>
                    <Text className="mt-1 text-[14px] text-[#55606e]">직접 제품 촬영하기</Text>
                  </View>
                  <Icon name="chevron.right" size={24} className="text-blue-500" />
                </LinearGradient>
              </Pressable>
            </View>
          )}

          {/* Evaluate Button */}
          {selectedImage && !result && (
            <Pressable
              onPress={handleEvaluate}
              disabled={loading}
              className="overflow-hidden rounded-2xl shadow-lg">
              <LinearGradient
                colors={['#a855f7', '#9333ea']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="items-center py-5">
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-[18px] font-bold text-white">AI 평가 시작하기</Text>
                )}
              </LinearGradient>
            </Pressable>
          )}

          {/* Results */}
          {result && (
            <View className="gap-5">
              {/* Score Card */}
              <View className="overflow-hidden rounded-3xl bg-white shadow-lg">
                <LinearGradient
                  colors={result.suitable ? ['#d1fae5', '#a7f3d0'] : ['#fee2e2', '#fecaca']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="p-6">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="mb-1 text-[14px] font-medium text-gray-700">
                        어울림 점수
                      </Text>
                      <Text
                        className="text-[48px] font-bold"
                        style={{ color: getScoreColor(result.score) }}>
                        {result.score}
                      </Text>
                    </View>
                    <View
                      className={`rounded-2xl px-6 py-3 ${
                        result.suitable ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                      <Text className="text-[16px] font-bold text-white">
                        {result.suitable ? '✓ 추천' : '✗ 비추천'}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              {/* Reason */}
              <View className="rounded-3xl bg-white p-6 shadow-md">
                <View className="mb-4 flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-purple-50">
                    <Icon name="lightbulb.fill" size={20} className="text-[#9810fa]" />
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
                <Text className="text-[15px] leading-7 text-[#55606e]">
                  {result.recommendation}
                </Text>
              </View>

              {/* New Evaluation Button */}
              <Pressable
                onPress={() => {
                  setSelectedImage(null);
                  setResult(null);
                }}
                className="rounded-2xl border-2 border-gray-200 bg-white py-4">
                <Text className="text-center text-[16px] font-semibold text-[#55606e]">
                  새로운 제품 평가하기
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Bottom spacing for tab bar */}
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}
