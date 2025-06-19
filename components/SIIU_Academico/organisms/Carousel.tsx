// components/SIIU_Academico/organisms/Carousel.tsx
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Pressable, StyleSheet, View } from 'react-native';

// ✅ Constantes visuales
const TAMAÑO_OPCION_NORMAL = 90; // Tamaño normal de una opción
const TAMAÑO_OPCION_SELECCIONADA = 100; // Tamaño aumentado de la opción seleccionada
const ESPACIO_ENTRE_OPCIONES = 90; // Espacio entre las opciones
const BORDES_REDONDEADOS = 12; // Bordes redondeados para las imágenes
const ANCHO_PANTALLA = Dimensions.get('window').width; // Ancho de la pantalla
const TAMANO_TITULO_NORMAL = 8; // Tamaño normal del título
const TAMANO_TITULO_SELECCIONADO = 12; // Tamaño aumentado del título
const MARGEN_TITULO_IMAGEN = 0; // Margen entre el título y la imagen

type CarouselProps = {
  items: Array<{ 
    imageSource: any; 
    title: string;
    route: '/SIIU_Academico' | '/Login' | string; // propiedad para la ruta de la pantalla
  }>;
  onItemSelected: (index: number) => void;
  onItemPress: (route: '/SIIU_Academico' | '/Login' | string) => void;
};

/**
 * Componente organismo: Carrusel inferior centrado.
 * 
 * Muestra opciones (imágenes) que cambian de tamaño al moverse.
 */
const Carousel: React.FC<CarouselProps> = ({ items, onItemSelected }) => {
  const flatListRef = useRef<FlatList>(null); // Referencia al FlatList
  const [selectedIndex, setSelectedIndex] = useState(0); // Índice de la opción seleccionada
  const scrollX = useRef(new Animated.Value(0)).current; // Valor animado para el desplazamiento

  // 👇 Cálculo del desplazamiento inicial para centrar la primera opción
  const OFFSET_INICIAL = (ANCHO_PANTALLA - TAMAÑO_OPCION_SELECCIONADA) / 4;

  // Función para calcular el tamaño dinámico de cada opción
  const getSizeForIndex = (index: number) => {
    const inputRange = [
      (index - 1) * (TAMAÑO_OPCION_NORMAL + ESPACIO_ENTRE_OPCIONES),
      index * (TAMAÑO_OPCION_NORMAL + ESPACIO_ENTRE_OPCIONES),
      (index + 1) * (TAMAÑO_OPCION_NORMAL + ESPACIO_ENTRE_OPCIONES),
    ];

    return scrollX.interpolate({
      inputRange,
      outputRange: [TAMAÑO_OPCION_NORMAL, TAMAÑO_OPCION_SELECCIONADA, TAMAÑO_OPCION_NORMAL],
      extrapolate: 'clamp',
    });
  };

  // Función para calcular el tamaño del título
  const getTitleSizeForIndex = (index: number) => {
    const inputRange = [
      (index - 2) * (TAMAÑO_OPCION_NORMAL + ESPACIO_ENTRE_OPCIONES),
      index * (TAMAÑO_OPCION_NORMAL + ESPACIO_ENTRE_OPCIONES),
      (index + 2) * (TAMAÑO_OPCION_NORMAL + ESPACIO_ENTRE_OPCIONES),
    ];

    return scrollX.interpolate({
      inputRange,
      outputRange: [TAMANO_TITULO_NORMAL, TAMANO_TITULO_SELECCIONADO, TAMANO_TITULO_NORMAL],
      extrapolate: 'clamp',
    });
  };

  // Función para detectar el índice visible en el centro
  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setSelectedIndex(newIndex);
      onItemSelected(newIndex); // Notifica al padre qué opción está en el centro
    }
  };

  return (
    <View style={styles.container}>
      {/* 👇 FlatList con ajustes para centrar la primera opción */}
      <Animated.FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={TAMAÑO_OPCION_NORMAL + ESPACIO_ENTRE_OPCIONES} // Asegura que las opciones se alineen al centro
        decelerationRate="fast" // Desaceleración rápida para un efecto más preciso
        contentContainerStyle={{ paddingHorizontal: OFFSET_INICIAL }} // 👈 Agrega espacio inicial para centrar la primera opción
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50, // Considera visible si al menos el 50% está en pantalla
        }}
        renderItem={({ item, index }) => {
          const size = getSizeForIndex(index);
          const titleSize = getTitleSizeForIndex(index);

          return (
            <Pressable onPress={() => router.push(item.route)}>
            <Animated.View
              style={[
                styles.option,
                {
                  width: size,
                  height: size,
                  marginHorizontal: ESPACIO_ENTRE_OPCIONES / 2, // 👈 Restauramos el margen horizontal
                },
              ]}
            >
              {/* 👇 Título encima de la imagen */}
              <Animated.Text
                style={[
                  styles.title,
                  { fontSize: titleSize, marginBottom: MARGEN_TITULO_IMAGEN }, // Margen entre título e imagen
                ]}
              >
                {item.title}
              </Animated.Text>
              <Animated.Image
                source={item.imageSource}
                style={[
                  styles.image,
                  { borderRadius: BORDES_REDONDEADOS, width: size, height: size },
                ]}
                resizeMode="cover"
              />
            </Animated.View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical:0,
    //borderWidth: 1, // ❗️ Borde temporal para depuración
    //borderColor: 'orange',
    height: 140,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 3, // ❗️ Borde temporal para depuración
    //borderColor: 'blue',
    width: '100%',
  },
  image: {
    borderRadius: BORDES_REDONDEADOS, // Bordes redondeados
    //borderWidth: 1, // ❗️ Borde temporal para depuración
    //borderColor: 'red',
  },
  title: {
    color: '#FFFFFF', // Color del texto
    fontWeight: 'bold', // Negrita para destacar
    textAlign: 'center', // Centrado horizontal
    //borderWidth: 1, // ❗️ Borde temporal para depuración
    //borderColor: 'green',
    paddingTop: 40,
  },
});

export default Carousel;