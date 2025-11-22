import { useState } from 'react';
import { Image, ImageProps, View, Text } from 'react-native';
import { cssInterop } from 'nativewind';

cssInterop(Image, { className: 'style' });

interface ImageWithFallbackProps extends Omit<ImageProps, 'source'> {
  src?: any;
  source?: any;
  fallbackSrc?: any;
  alt?: string;
}

export function ImageWithFallback({ src, source, fallbackSrc, alt, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const imageSource = error ? fallbackSrc : (src || source);

  if (!imageSource || error) {
      return (
          <View className={`bg-gray-200 items-center justify-center ${props.className}`} style={props.style}>
            <Text className="text-gray-400 text-xs">{alt || 'Image not found'}</Text>
          </View>
      )
  }

  return (
    <Image
      source={imageSource}
      onError={() => setError(true)}
      accessibilityLabel={alt}
      {...props}
    />
  );
}
