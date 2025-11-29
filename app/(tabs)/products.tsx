import { View, ScrollView } from 'react-native';

import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';

export default function ProductsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Icon name="bag" size={64} className="text-[#9810FA]" />
      <Text className="mt-4 text-[24px] font-bold text-black">제품</Text>
      <Text className="mt-2 text-[16px] text-[#777D87]">Coming Soon</Text>
    </View>
  );
}
