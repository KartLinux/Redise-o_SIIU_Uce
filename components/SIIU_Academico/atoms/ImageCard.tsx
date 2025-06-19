// components/SIIU_Academico/atoms/ImageCard.tsx
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

// ✅ Constantes visuales
const TAMAÑO_BORDES_REDONDEADOS = 16; // Bordes redondeados
const ESPACIO_ENTRE_IMAGENES = 10;     // Espacio horizontal entre tarjetas

type ImageCardProps = {
  source: any;
  aspectRatio?: number; // Proporción de aspecto (ancho/alto)
  alignment?: 'left' | 'right' | 'center'; // Alineación de la imagen
  fitToCard?: boolean; // ¿La imagen debe ajustarse al contenedor?
};

/**
 * Componente atómico: Tarjeta de imagen.
 * 
 * Muestra una imagen con bordes redondeados.
 */
const ImageCard: React.FC<ImageCardProps> = ({ source, aspectRatio = 0.5, alignment = 'center', fitToCard = true }) => {
  const screenWidth = Dimensions.get('window').width; // Ancho de la pantalla
  const cardWidth = screenWidth / 3 - 2 * ESPACIO_ENTRE_IMAGENES; // Ancho del contenedor
  const cardHeight = cardWidth / aspectRatio; // Alto basado en la proporción

  // ✅ Calculamos la transformación para alinear la imagen
  const getTransform = () => {
    switch (alignment) {
      case 'left':
        return [{ translateX: -cardWidth / 30 }]; // Desplaza la imagen hacia la izquierda
      case 'right':
        return [{ translateX: cardWidth / 30 }]; // Desplaza la imagen hacia la derecha
      default:
        return [];
    }
  };

  return (
    <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
      <Image
        source={source}
        style={[
          styles.image,
          fitToCard && { height: cardHeight }, // ← Solo ajusta si `fitToCard` es true
          { transform: getTransform() },
        ]}
        resizeMode={fitToCard ? 'cover' : 'contain'} // ← Cambia el modo de ajuste
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden', // Para cortar lo que sobrepase el borde
    borderRadius: TAMAÑO_BORDES_REDONDEADOS,
    marginHorizontal: ESPACIO_ENTRE_IMAGENES,
  },
  image: {
    width: '100%', // ← La imagen ocupa todo el ancho de la tarjeta
    borderRadius: TAMAÑO_BORDES_REDONDEADOS, // Asegura que la imagen tenga bordes redondeados
  },
});

export default ImageCard;