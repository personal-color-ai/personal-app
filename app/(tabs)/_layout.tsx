import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { Icon } from '@/components/nativewindui/Icon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#9810FA',
        tabBarInactiveTintColor: '#98A1AE',
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 70 : 62,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontFamily: 'Pretendard',
          fontSize: 14,
          fontWeight: '500',
          letterSpacing: -0.56,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => <Icon name="paintpalette" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="fitting-room"
        options={{
          title: '피팅룸',
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-page"
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
