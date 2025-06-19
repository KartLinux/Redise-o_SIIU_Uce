// components/SIIU_Academico/molecules/ImageButton.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../atoms/Button';
import ImageComponent from '../atoms/Image';
import Text from '../atoms/Text';

type ImageButtonProps = {
  source: any;
  title?: string;
  onPress: () => void;
  imageSize?: number;
  variant?: 'primary' | 'secondary';
};

const TAMANO_ICONO = 30; // Tamaño del ícono dentro del botón
const ESPACIO_ENTRE_ELEMENTOS = 20; // Espacio entre el ícono y el texto

const ImageButton: React.FC<ImageButtonProps> = ({
  source,
  title,
  onPress,
  imageSize = TAMANO_ICONO,
  variant = 'secondary',
}) => {
  return (
    <Button
      onPress={onPress}
      variant={variant} // Pasamos el color correcto al botón
    >
      <View style={styles.container}>
        <ImageComponent
          source={source}
          width={imageSize}
          height={imageSize}
          resizeMode="contain"
        />
        {title && <Text variant="label">{title}</Text>}
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: ESPACIO_ENTRE_ELEMENTOS, // Espacio entre el ícono y el texto
  },
});

export default ImageButton;