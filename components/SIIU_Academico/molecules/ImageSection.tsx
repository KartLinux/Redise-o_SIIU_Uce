// components/SIIU_Academico/molecules/ImageSection.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageCard from '../atoms/ImageCard';

// ✅ Constantes visuales
const ESPACIO_VERTICAL_SECCION = 0; // Espacio vertical alrededor de la sección
const ESPACIO_HORIZONTAL_ENTRE_IMAGENES = 100; // Espacio horizontal entre tarjetas
const DESPLAZAMIENTO_HACIA_ABAJO = 0; // Margen adicional para mover la sección hacia abajo

type ImageSectionProps = {
  imageSource: any; // Fuente de la imagen
};

/**
 * Componente molecular: Sección de imágenes.
 * 
 * Muestra tres imágenes:
 * - Una central más grande.
 * - Dos laterales más pequeñas.
 */
const ImageSection: React.FC<ImageSectionProps> = ({ imageSource }) => {
    return (
      <View style={[styles.container, { marginTop: DESPLAZAMIENTO_HACIA_ABAJO }]}>
        {/* Imagen lateral izquierda */}
        <ImageCard
          source={imageSource}
          aspectRatio={0.5}
          alignment='left'
        />
  
        {/* Imagen central */}
        <ImageCard
          source={imageSource}
          aspectRatio={0.3}
          alignment='center'
        />
  
        {/* Imagen lateral derecha */}
        <ImageCard
          source={imageSource}
          aspectRatio={0.5}
          alignment='right'
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center', // Centra las tarjetas horizontalmente
    alignItems: 'center',     // Centra las tarjetas verticalmente
    paddingVertical: ESPACIO_VERTICAL_SECCION, // Espacio vertical
    paddingHorizontal: ESPACIO_HORIZONTAL_ENTRE_IMAGENES, // Espacio horizontal total
  },
});

export default ImageSection;