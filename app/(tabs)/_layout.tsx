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
          height: Platform.OS === 'ios' ? 80 : 72,
          paddingBottom: Platform.OS === 'ios' ? 24 : 12,
          paddingTop: 12,
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
          tabBarIcon: ({ color, size }) => <Icon name="archivebox" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: '제품',
          tabBarIcon: ({ color, size }) => <Icon name="bag" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-page"
        options={{
          title: '마이',
          tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontFamily: 'Pretendard',
            fontSize: 18,
            fontWeight: '600',
            color: '#0f0f0f',
          },
          headerShadowVisible: true,
          headerRight: () => (
            <Icon name="gearshape" size={24} color="#0f0f0f" style={{ marginRight: 16 }} />
          ),
        }}
      />
    </Tabs>
  );
}
