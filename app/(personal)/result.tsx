import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useState } from 'react';

export default function Result() {
  const router = useRouter();
  const { photoUri } = useLocalSearchParams<{ photoUri?: string }>();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <View className="flex-1 bg-neutral-50">
      <ScrollView className="flex-1">
        <View className="pb-10">
          {/* 퍼스널 컬러 팔레트 섹션 */}
          <View className="mt-[21px] px-[30px]">
            <Text className="mb-[18px] text-[18px] font-semibold text-black">
              나의 퍼스널 컬러 팔레트
            </Text>

            {/* 베스트 컬러 */}
            <Text className="mb-[18px] text-[18px] font-semibold text-black">베스트 컬러</Text>
            <View className="mb-[18px] rounded-[12px] border border-neutral-200 bg-white p-[18px]">
              <Text className="mb-[16px] text-[16px] font-medium text-[#55606e]">
                색상을 탭하여 확인해보세요
              </Text>
              <View className="flex-row gap-[15px]">
                {/* 선택된 컬러 */}
                <View className="relative">
                  <View className="h-[45px] w-[45px] rounded-[12px] border-4 border-white bg-[#edb98d] shadow-md" />
                  <View className="absolute left-[10px] top-[11px]">
                    <Check size={24} color="white" />
                  </View>
                </View>
                <View className="h-[45px] w-[45px] rounded-[12px] bg-[#cd853f]" />
                <View className="h-[45px] w-[45px] rounded-[12px] bg-[#c19b6c]" />
                <View className="h-[45px] w-[45px] rounded-[12px] bg-[#b9966a]" />
                <View className="h-[45px] w-[45px] rounded-[12px] bg-[#deb988]" />
              </View>
            </View>

            {/* 피해야 할 컬러 */}
            <Text className="mb-[18px] text-[18px] font-semibold text-black">피해야 할 컬러</Text>
            <View className="rounded-[12px] border border-neutral-200 bg-white p-[18px]">
              <Text className="mb-[16px] text-[16px] font-medium text-[#55606e]">
                색상을 탭하여 확인해보세요
              </Text>
              <View className="flex-row gap-[15px]">
                <View className="h-[45px] w-[45px] rounded-[12px] bg-[#edb98d]" />
                <View className="h-[45px] w-[45px] rounded-[12px] bg-[#cd853f]" />
                <View className="h-[45px] w-[45px] rounded-[12px] bg-[#c19b6c]" />
                <View className="h-[45px] w-[45px] rounded-[12px] bg-[#b9966a]" />
                <View className="h-[45px] w-[45px] rounded-[12px] bg-[#deb988]" />
              </View>
            </View>
          </View>

          {/* 이미지 카드 */}
          <View className="mt-[25px] px-[30px]">
            <View className="h-[275px] items-center justify-center overflow-hidden rounded-[12px] border border-neutral-200 bg-[#fff9ed]">
              {photoUri ? (
                <Image
                  source={{ uri: photoUri }}
                  className="h-[227px] w-[260px]"
                  resizeMode="cover"
                />
              ) : (
                <View className="h-[227px] w-[260px] rounded-lg bg-gray-200" />
              )}
            </View>
          </View>

          {/* 탭 네비게이션 */}
          <View className="mt-[22px] px-[31px]">
            <View className="rounded-[16px] border border-neutral-200 bg-[#fefefd] p-[3px]">
              <View className="flex-row gap-[4px]">
                <Pressable
                  onPress={() => setSelectedTab('overview')}
                  className={`flex-1 items-center rounded-[14px] px-[22px] py-[10px] ${selectedTab === 'overview' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[14px] font-bold ${selectedTab === 'overview' ? 'text-white' : 'text-black'}`}>
                    개요
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedTab('color')}
                  className={`flex-1 items-center rounded-[14px] px-[22px] py-[10px] ${selectedTab === 'color' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[14px] font-bold ${selectedTab === 'color' ? 'text-white' : 'text-black'}`}>
                    컬러
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedTab('fashion')}
                  className={`flex-1 items-center rounded-[14px] px-[22px] py-[10px] ${selectedTab === 'fashion' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[14px] font-bold ${selectedTab === 'fashion' ? 'text-white' : 'text-black'}`}>
                    패션
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedTab('beauty')}
                  className={`flex-1 items-center rounded-[14px] px-[22px] py-[10px] ${selectedTab === 'beauty' ? 'bg-[#9810fa]' : ''}`}>
                  <Text
                    className={`text-[14px] font-bold ${selectedTab === 'beauty' ? 'text-white' : 'text-black'}`}>
                    뷰티
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* 결과 카드 */}
          <View className="mt-[18px] px-[30px]">
            <View className="rounded-[12px] border border-[#fee685] bg-[#fff9ed] p-[20px]">
              <View className="flex-row items-center gap-[16px]">
                {/* 컬러 원 */}
                <View className="relative h-[60px] w-[60px]">
                  <View className="h-[60px] w-[60px] rounded-full bg-[#f2c296]" />
                  <View className="absolute left-[11px] top-[7px] h-[53px] w-[39px] rounded-full bg-[#d4a574]" />
                </View>

                {/* 텍스트 */}
                <View className="flex-1">
                  <Text className="mb-[8px] text-[20px] font-medium text-black">가을 웜뮤트</Text>
                  <View className="flex-row gap-[12px]">
                    <View className="flex-row items-center gap-[5px]">
                      <Text className="text-[16px] font-medium text-[#4a5565]">명도</Text>
                      <View className="rounded-[5px] bg-[#fef3c6] px-[9px] py-[2px]">
                        <Text className="text-[14px] font-medium text-[#973b00]">medium</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center gap-[5px]">
                      <Text className="text-[16px] font-medium text-[#4a5565]">채도</Text>
                      <View className="rounded-[5px] bg-[#fef3c6] px-[9px] py-[2px]">
                        <Text className="text-[14px] font-medium text-[#973b00]">muted</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* 주요 특징 */}
          <View className="mt-[18px] px-[30px]">
            <View className="rounded-[12px] border border-neutral-200 bg-white p-[20px]">
              <Text className="mb-[16px] text-[18px] font-semibold text-black">주요 특징</Text>
              <View className="gap-[9px]">
                {[
                  '따뜻한 언더톤의 피부',
                  '따뜻한 언더톤의 피부',
                  '따뜻한 언더톤의 피부',
                  '따뜻한 언더톤의 피부',
                ].map((text, index) => (
                  <View key={index} className="flex-row items-center gap-[8px]">
                    <View className="h-[19px] w-[19px] items-center justify-center rounded-full bg-[#9810fa]">
                      <View className="h-[10px] w-[10px] rounded-full bg-white" />
                    </View>
                    <Text className="text-[16px] font-medium text-[#475161]">{text}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
