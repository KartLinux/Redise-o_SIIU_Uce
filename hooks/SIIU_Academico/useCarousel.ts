import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

/**
 * Custom Hook: `useCarousel`
 *
 * Proporciona estado y funciones para controlar un carrusel horizontal con animación de desvanecimiento.
 *
 * @param initialIndex - Índice inicial del carrusel.
 * @param itemsLength - Número total de elementos en el carrusel.
 * @param autoScrollInterval - Intervalo en milisegundos para desplazamiento automático.
 * @returns Objeto con:
 *   - currentIndex: índice actual
 *   - scrollTo: función para navegar manualmente
 *   - fadeAnim: valor animado para opacidad
 *   - resetAnimation: función para reiniciar la animación
 */
const useCarousel = (
  initialIndex: number = 0,
  itemsLength: number = 0,
  autoScrollInterval: number | null = null
) => {
  // ✅ Estado del índice actual
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  
  // ✅ Control de scroll automático
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(!!autoScrollInterval);
  
  // ✅ Animación de desvanecimiento
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // 🔶 1. Función para reiniciar la animación
  const resetAnimation = useCallback(() => {
    fadeAnim.setValue(0); // Empezar con opacidad 0
    Animated.timing(fadeAnim, {
      toValue: 1, // Animar hacia opacidad 1
      duration: 2000, // Duración razonable (500ms)
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // 🔶 2. Efecto que dispara la animación al cambiar el índice
  useEffect(() => {
    if (itemsLength > 0 && !isAutoScrolling) { // 🔶 Solo si NO es auto-scroll
      resetAnimation();
    }
  }, [currentIndex, itemsLength, resetAnimation, isAutoScrolling]);

  // 🔄 Navegación al siguiente elemento
  const scrollToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % itemsLength;
    setCurrentIndex(nextIndex);
  }, [currentIndex, itemsLength]);

  // 🔄 Navegación al elemento anterior
  const scrollToPrevious = useCallback(() => {
    const prevIndex = (currentIndex - 1 + itemsLength) % itemsLength;
    setCurrentIndex(prevIndex);
  }, [currentIndex, itemsLength]);

  // 🔄 Navegación a índice específico
  const scrollTo = useCallback((index: number) => {
    if (index >= 0 && index < itemsLength) {
      setCurrentIndex(index);
    }
  }, [itemsLength]);

  // ⏳ Lógica de scroll automático
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
  
    if (isAutoScrolling && itemsLength > 1 && autoScrollInterval) {
      intervalId = setInterval(() => {
        // 👇 Desactiva temporalmente la animación durante el auto-scroll
        setIsAutoScrolling(false); // 🔶 Desactiva animación
        scrollToNext();
        setIsAutoScrolling(true); // 🔶 Reactiva animación
      }, autoScrollInterval);
    }
  
    return () => clearInterval(intervalId);
  }, [isAutoScrolling, autoScrollInterval, scrollToNext, itemsLength]);

  // ✅ Valores retornados
  return {
    currentIndex,
    scrollTo,
    scrollToNext,
    scrollToPrevious,
    isAutoScrolling,
    setIsAutoScrolling,
    fadeAnim, // 🔶 Animación disponible para el componente
    resetAnimation, // 🔶 Función para control externo
  };
};

export default useCarousel;