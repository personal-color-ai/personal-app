import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FittingRoom() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <WebView
        source={{ uri: 'https://personal-web-sooty-one.vercel.app/' }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
      />
    </SafeAreaView>
  );
}
