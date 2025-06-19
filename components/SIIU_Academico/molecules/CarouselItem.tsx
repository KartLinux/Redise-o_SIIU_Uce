// components/SIIU_Academico/molecules/CarouselItem.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import ImageComponent from '../atoms/Image';
import Text from '../atoms/Text';

type CarouselItemProps = {
  imageSource: any;
  title: string;
  imageSize?: number;
};

/**
 * Componente molecular: Elemento individual del carrusel.
 * 
 * @param imageSource - Fuente de la imagen.
 * @param title - Título del elemento.
 * @param imageSize - Tamaño opcional de la imagen.
 */
const CarouselItem: React.FC<CarouselItemProps> = ({
  imageSource,
  title,
  imageSize = 150,
}) => {
  return (
    <View style={styles.container}>
      <ImageComponent
        source={imageSource}
        width={imageSize}
        height={imageSize}
        resizeMode="cover"
      />
      <Text variant="body" color={Colors.light.text}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default CarouselItem;