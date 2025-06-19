// components/SIIU_Academico/atoms/Image.tsx
import React from 'react';
import { Image } from 'react-native';

type ImageProps = {
  source: any;
  width?: number;
  height?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch';
};

const ImageComponent: React.FC<ImageProps> = ({
  source,
  width = 100,
  height = 100,
  resizeMode = 'cover',
}) => {
  return (
    <Image
      source={source}
      style={{
        width,
        height,
        resizeMode,
        //borderColor: Colors.light.primary, // Ejemplo opcional
        //borderWidth: 1,
      }}
    />
  );
};

export default ImageComponent;