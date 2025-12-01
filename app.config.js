module.exports = {
  expo: {
    name: 'personal-app',
    slug: 'personal-app',
    version: '1.0.0',
    scheme: 'personal-app',
    platforms: ['ios', 'android'],
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/favicon.png',
    },
    plugins: ['expo-router'],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.personalmodel.app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.personalmodel.app',
    },
    extra: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://168.107.53.130:8080',
      eas: {
        projectId: '9a7be17d-395d-4526-b377-b589b873ae70',
      },
    },
  },
};
