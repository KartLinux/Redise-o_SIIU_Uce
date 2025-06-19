// app/index.tsx

import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { GradientBackground } from "../components/GradientBackground";
import { useTheme } from "../components/ThemeProvider";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { AnimatedLogo } from "../components/AnimatedLogo";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const textOffset = screenWidth * 0.1; // 10% del ancho de la pantalla

// ----------------------------
// ✅ CONFIGURACIONES AJUSTABLES
// ----------------------------

const CONFIG = {
  // POSICION INICIAL DEL LOGO
  initialTranslateY: screenHeight, // Comienza abajo
  finalUpTranslateY: -screenHeight * 0.2, // Sube al 80% superior
  centerTranslateY: 0, // Finaliza en el centro

  // MOVIMIENTO HORIZONTAL
  maxSlideDistance: -90, // Cuánto se mueve el logo/texto hacia la izquierda (menos drástico)
  textSlideDuration: 2000,

  // ESCALAS
  initialScale: 0.8,
  expandedScale: 1.5,
  finalScale: 1,

  // ROTACIÓN Y DURACIONES
  rotateYDeg: 360,
  animationDurations: {
    up: 3000,
    fall: 2000,
    reset: 2000,
    slide: 1000,
    pause: 7000,
  },
};

// Tamaño de fuente responsivo
const fontSize = Math.min(screenWidth * 0.05, 24); // Máximo 24px

export default function SplashScreenPage() {
  const { colors } = useTheme();

  // Valores animados para controlar la posición, escala y rotación del logo
  const translateY = useSharedValue(CONFIG.initialTranslateY);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(CONFIG.initialScale);
  const rotateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  // Efecto para iniciar las animaciones secuencialmente
  useEffect(() => {
    // 1. Logo sube desde abajo y crece
    translateY.value = withTiming(CONFIG.finalUpTranslateY, { duration: CONFIG.animationDurations.up });
    scale.value = withTiming(CONFIG.expandedScale, { duration: CONFIG.animationDurations.up });

    // 2. Logo cae al centro con rotación
    setTimeout(() => {
      translateY.value = withTiming(CONFIG.centerTranslateY, { duration: CONFIG.animationDurations.fall });
      rotateY.value = withTiming(CONFIG.rotateYDeg, { duration: CONFIG.animationDurations.fall });
    }, CONFIG.animationDurations.up);

    // 3. Regresar al tamaño original
    setTimeout(() => {
      scale.value = withSpring(CONFIG.finalScale, { damping: 10 });
    }, CONFIG.animationDurations.up + CONFIG.animationDurations.fall);

    // 4. Logo se mueve ligeramente a la izquierda y aparece el texto
    setTimeout(() => {
      translateX.value = withTiming(CONFIG.maxSlideDistance, { duration: CONFIG.textSlideDuration });
      opacity.value = withTiming(1, { duration: CONFIG.textSlideDuration });
    }, CONFIG.animationDurations.up + CONFIG.animationDurations.fall + CONFIG.animationDurations.reset);

    // 5. Ocultar splash screen y navegar a la página principal
    setTimeout(() => {
      SplashScreen.hideAsync();
      router.push("/SIIU_Academico");
    }, CONFIG.animationDurations.up +
      CONFIG.animationDurations.fall +
      CONFIG.animationDurations.reset +
      CONFIG.textSlideDuration +
      CONFIG.animationDurations.pause);
  }, []);

  // Estilos animados para el logo
  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale: scale.value },
        { rotateY: `${rotateY.value}deg` },
      ],
    };
  });

  // Estilos animados para el texto
  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: interpolate(opacity.value, [0, 1], [CONFIG.maxSlideDistance, 0]) }],
    };
  });

  return (
    <GradientBackground>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        {/* Logo animado */}
        <Animated.View style={animatedLogoStyle}>
          <AnimatedLogo style={{ width: 100, height: 100 }} />
        </Animated.View>

        {/* Texto de bienvenida */}
        <Animated.Text
          style={[
            {
              color: colors.text,
              fontSize: fontSize,
              fontWeight: "600",
              textAlign: "left",
              maxWidth: "70%", // Ancho máximo del texto para evitar que salga
              marginTop: 20,
              position: "absolute",
              top: "48%",
              left: "40%",
              transform: [
                { translateX: -textOffset }, // Desplaza a la izquierda según el ancho de la pantalla
                { translateY: -fontSize / 2 },
              ],
              lineHeight: fontSize * 1.2, // Mejora legibilidad
              paddingHorizontal: 20, // Espacio interno para mejor presentación
            },
            animatedTextStyles,
          ]}
        >
          Universidad Central del Ecuador
        </Animated.Text>
      </View>
    </GradientBackground>
  );
}