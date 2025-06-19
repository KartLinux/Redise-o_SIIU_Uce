import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';

// Hook especial de expo-router para detectar cuando una pantalla recibe foco
import { useFocusEffect } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// ----------------------------
// ✅ CONFIGURACIONES AJUSTABLES para la animación
// ----------------------------
const CONFIG = {
  initialTranslateY: screenHeight, // Comienza abajo de la pantalla
  finalUpTranslateY: -screenHeight * 0.2, // Sube al 20% superior
  centerTranslateY: 0,

  maxSlideDistance: -90,
  textSlideDuration: 2000,

  initialScale: 0.8,
  expandedScale: 1.5,
  finalScale: 1,

  rotateYDeg: 360,
  animationDurations: {
    up: 1500,
    fall: 1000,
    reset: 500,
    slide: 800,
    pause: 900,
  },
};

export default function SplashScreenQuinia() {
  // ✅ Valores compartidos (shared values) para controlar las animaciones
  const translateY = useSharedValue(CONFIG.initialTranslateY);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(CONFIG.initialScale);
  const rotateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  // ✅ Timeout para la navegación final
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  // ✅ Función que inicia toda la secuencia de animaciones
  const runAnimation = () => {
    // Reiniciar valores antes de empezar la animación
    translateY.value = CONFIG.initialTranslateY;
    translateX.value = 0;
    scale.value = CONFIG.initialScale;
    rotateY.value = 0;
    opacity.value = 0;

    // 1. Subida inicial del logo
    translateY.value = withTiming(CONFIG.finalUpTranslateY, {
      duration: CONFIG.animationDurations.up,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withTiming(CONFIG.expandedScale, {
      duration: CONFIG.animationDurations.up,
      easing: Easing.out(Easing.cubic),
    });

    // 2. Caída con rotación
    setTimeout(() => {
      translateY.value = withTiming(CONFIG.centerTranslateY, {
        duration: CONFIG.animationDurations.fall,
        easing: Easing.inOut(Easing.cubic),
      });
      rotateY.value = withTiming(CONFIG.rotateYDeg, {
        duration: CONFIG.animationDurations.fall,
        easing: Easing.inOut(Easing.cubic),
      });
    }, CONFIG.animationDurations.up);

    // 3. Ajuste final de escala
    setTimeout(() => {
      scale.value = withSpring(CONFIG.finalScale, {
        damping: 10,
        stiffness: 100,
      });
    }, CONFIG.animationDurations.up + CONFIG.animationDurations.fall);

    // 4. Movimiento lateral y aparición de texto
    setTimeout(() => {
      translateX.value = withTiming(CONFIG.maxSlideDistance, {
        duration: CONFIG.animationDurations.slide,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {
        duration: CONFIG.animationDurations.slide,
        easing: Easing.out(Easing.cubic),
      });
    }, CONFIG.animationDurations.up + CONFIG.animationDurations.fall + CONFIG.animationDurations.reset);

    // 5. Navegación a la siguiente pantalla después de todas las animaciones
    const totalDuration =
      CONFIG.animationDurations.up +
      CONFIG.animationDurations.fall +
      CONFIG.animationDurations.reset +
      CONFIG.animationDurations.slide +
      CONFIG.animationDurations.pause;

    animationTimeout.current = setTimeout(() => {
      router.push('/herramientas/chatIA');
    }, totalDuration);
  };

  // ✅ Se ejecuta cada vez que la pantalla recibe foco
  useFocusEffect(
    useCallback(() => {
      runAnimation();

      return () => {
        if (animationTimeout.current) {
          clearTimeout(animationTimeout.current);
        }
      };
    }, [])
  );

  // ✅ Estilo animado para el icono (logo)
  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale: scale.value },
        { rotateY: `${rotateY.value}deg` },
      ],
    };
  });

  // ✅ Estilo animado para el texto "QUIN-IA"
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          translateX: interpolate(
            opacity.value,
            [0, 1],
            [CONFIG.maxSlideDistance, 0]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={styles.fullScreenBackground}>
      {/* Fondo con gradiente */}
      <LinearGradient
        colors={Colors.light.gradientSecondary as any}
        style={StyleSheet.absoluteFillObject}
      >
        {/* Configuración de la pantalla para ocultar header */}
        <Stack.Screen
          options={{
            headerShown: false,
            title: '',
          }}
        />
        {/* Contenedor principal centrado */}
        <View style={styles.container}>
          {/* Icono animado */}
          <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
            <Image
              source={require('../../../assets/images/layoutTabs/herramientas/quinia_icon.png')}
              style={styles.quiniaIcon}
            />
          </Animated.View>
          {/* Texto animado */}
          <Animated.Text style={[styles.animatedText, animatedTextStyle]}>
            QUIN-IA
          </Animated.Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

// ✅ Estilos estáticos con StyleSheet
const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quiniaIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  animatedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginTop: 20,
    position: 'absolute',
  },
});