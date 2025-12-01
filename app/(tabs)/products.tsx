import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { getPersonalColorReport } from '@/lib/storage';

export default function ProductsScreen() {
  const [webViewUrl, setWebViewUrl] = useState('https://personal-web-sooty-one.vercel.app/');

  useEffect(() => {
    loadPersonalColorAndSetUrl();
  }, []);

  const loadPersonalColorAndSetUrl = async () => {
    try {
      const report = await getPersonalColorReport();
      if (report?.personalColorReportDto?.color?.colorType) {
        const colorType = report.personalColorReportDto.color.colorType;
        const encodedColorType = encodeURIComponent(colorType);
        setWebViewUrl(`https://personal-web-sooty-one.vercel.app/?colorType=${encodedColorType}`);
      }
    } catch (error) {
      console.error('Failed to load personal color:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <WebView
        source={{ uri: webViewUrl }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
      />
    </SafeAreaView>
  );
}
