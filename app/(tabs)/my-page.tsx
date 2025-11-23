import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';

export default function MyPageScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 items-center justify-center bg-white"
      style={{ paddingTop: insets.top }}>
      <Icon name="person.circle" size={64} className="text-[#9810FA]" />
      <Text className="mt-4 text-[24px] font-bold text-black">마이페이지</Text>
      <Text className="mt-2 text-[16px] text-[#777D87]">Coming Soon</Text>
    </View>
  );
}
