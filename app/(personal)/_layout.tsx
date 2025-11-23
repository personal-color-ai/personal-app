import { Stack, useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

export default function PersonalLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({ options }) => {
          const currentStep = (options as any).currentStep || 1;
          const isDarkTheme = (options as any).darkTheme || false;
          
          return (
            <View 
              className={isDarkTheme ? "bg-black border-b border-gray-800" : "bg-white border-b border-gray-100"}
              style={{ paddingTop: insets.top }}
            >
              <View className="p-4">
                <View className="flex-row items-center justify-center relative">
                  <Pressable onPress={() => router.back()} className="absolute left-0 p-2">
                    <ArrowLeft className={isDarkTheme ? "text-white" : "text-black"} size={24} color={isDarkTheme ? "white" : "black"} />
                  </Pressable>
                  <Text className={`text-center text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>{options.title}</Text>
                </View>
              </View>
              
              {/* 진행 단계 */}
              <View className="flex-row items-center justify-center gap-4 py-6">
                <View className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep > 1 ? 'bg-gray-600' : currentStep === 1 ? 'bg-purple-600' : 'bg-gray-700'}`}>
                  <Text className={`font-bold ${currentStep >= 1 ? 'text-white' : 'text-gray-500'}`}>1</Text>
                </View>
                <View className="w-16 h-0.5 bg-gray-600"></View>
                <View className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep > 2 ? 'bg-gray-600' : currentStep === 2 ? 'bg-purple-600' : 'bg-gray-700'}`}>
                  <Text className={`font-bold ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}>2</Text>
                </View>
                <View className="w-16 h-0.5 bg-gray-600"></View>
                <View className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep > 3 ? 'bg-gray-600' : currentStep === 3 ? 'bg-purple-600' : 'bg-gray-700'}`}>
                  <Text className={`font-bold ${currentStep >= 3 ? 'text-white' : 'text-gray-500'}`}>3</Text>
                </View>
              </View>
            </View>
          );
        },
      }}
    >
      <Stack.Screen 
        name="diagnosis" 
        options={{ 
          title: '퍼스널 컬러 진단 가이드',
          currentStep: 1 
        } as any} 
      />
      <Stack.Screen 
        name="photo-capture" 
        options={{ 
          title: '사진 촬영',
          currentStep: 2,
          darkTheme: true
        } as any} 
      />
      <Stack.Screen 
        name="photo-preview" 
        options={{ 
          title: '사진 촬영',
          currentStep: 2,
          darkTheme: true
        } as any} 
      />
    </Stack>
  );
}
