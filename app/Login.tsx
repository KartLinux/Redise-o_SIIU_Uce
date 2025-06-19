// app/Login.tsx

// Importaciones necesarias
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';

// Constantes globales utilizadas en el diseño
const { width: WINDOW_WIDTH } = Dimensions.get('window');
const CURVE_HEIGHT = 80; // Altura base para calcular los arcos
const SMILE_RADIUS = WINDOW_WIDTH * 1.2; // Radio grande para la sonrisa
const SMILE_TOP = -SMILE_RADIUS * 0.6; // Para que solo se vea la parte inferior
const LOGIN_BOX_RADIUS = 20; // Radio de bordes del cuadro de inicio de sesión
const INPUT_HEIGHT = 44; // Altura de los campos de entrada
const BUTTON_HEIGHT = 44; // Altura del botón de inicio de sesión
const SHADOW_OFFSET = { width: 0, height: 4 }; // Offset común para sombras
const SHADOW_OPACITY = 0.2; // Opacidad común para sombras
const SHADOW_RADIUS = 8; // Radio común para sombras

// Componente de barras animadas (ecualizador)
const AudioBars = () => {
  // Animación de barras
  const BAR_COUNT = 20; // Número de barras en el ecualizador
  const animations = useRef(Array.from({ length: BAR_COUNT }).map(() => new Animated.Value(1))).current;

  useEffect(() => {
    const animate = (bar: Animated.Value, index: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue: 2, // Escala máxima de la barra
            duration: 300 + index * 40, // Duración variable para cada barra
            useNativeDriver: true,
          }),
          Animated.timing(bar, {
            toValue: 1, // Escala mínima de la barra
            duration: 300 + index * 40,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animations.forEach((anim, index) => animate(anim, index));
  }, [animations]);

  return (
    <View style={styles.audioBarsContainer}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              transform: [{ scaleY: anim }], // Escala vertical animada
            },
          ]}
        />
      ))}
    </View>
  );
};

// Componente principal de la pantalla de inicio de sesión
export default function LoginScreen() {
  const router = useRouter();

  // Función para manejar el login y navegar al home
  const handleLogin = () => {
    // Aquí podrías validar usuario/contraseña antes de navegar
    router.push(`/home`);
  };

  return (
    <View style={styles.container}>
      {/* Fondo degradado */}
      <LinearGradient
        colors={Colors.light.gradientPrimary as [string, string]}
        style={StyleSheet.absoluteFill}
      />

      {/* Curvas decorativas superiores como una sonrisa */}
      <View style={styles.smileWrapper}>
        {/* Rojo (fondo, el más grande) */}
        <View style={[styles.smileCurve, styles.smileRed, { top: SMILE_TOP + 32, zIndex: 1 }]} />
        {/* Azul oscuro (medio) */}
        <View style={[styles.smileCurve, styles.smileDark, { top: SMILE_TOP + 14, zIndex: 2 }]} />
        {/* Azul claro (arriba, el más pequeño) */}
        <View style={[styles.smileCurve, styles.smileLight, { top: SMILE_TOP, zIndex: 3 }]} />
      </View>

      {/* Área de inicio de sesión */}
      <View style={styles.loginBox}>
        {/* Fondo degradado solo para el cuadro de inicio de sesión */}
        <LinearGradient
          colors={[Colors.light.background, Colors.light.primary]}
          style={[StyleSheet.absoluteFill, { borderRadius: LOGIN_BOX_RADIUS }]}
        />
        {/* Contenido del loginBox */}
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          {/* Botón de audio y ecualizador animado */}
          <View style={styles.audioRow}>
            <TouchableOpacity style={styles.audioButton}>
              <Ionicons name="play" size={18} color={Colors.light.secondary} />
            </TouchableOpacity>
            <AudioBars />
          </View>
          {/* Título de la pantalla */}
          <Text style={styles.title}>INICIAR SESIÓN</Text>
          {/* Campo de entrada para el usuario */}
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario"
            placeholderTextColor={Colors.light.label}
          />
          {/* Campo de entrada para la contraseña */}
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={Colors.light.label}
            secureTextEntry
          />
          {/* Botón de ingresar */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },

  // Contenedor de las curvas decorativas
  smileWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: CURVE_HEIGHT * 3, // suficiente para mostrar la sonrisa
    overflow: 'hidden',
    zIndex: 2,
  },

  smileCurve: {
    position: 'absolute',
    left: -(SMILE_RADIUS - WINDOW_WIDTH) / 2,
    width: SMILE_RADIUS,
    height: SMILE_RADIUS,
    borderRadius: SMILE_RADIUS / 2,
    borderWidth: 0,
  },

  smileLight: {
    backgroundColor: Colors.light.background,
  },

  smileDark: {
    backgroundColor: Colors.light.secondary,

  },

  smileRed: {
    backgroundColor: Colors.light.accentRed,

  },

  // Cuadro de inicio de sesión
  loginBox: {
    marginTop: 100,
    width: '75%',
    height: '50%',
    backgroundColor: Colors.light.primary,
    borderRadius: LOGIN_BOX_RADIUS,
    padding: 34,
    alignItems: 'center',
    shadowColor: Colors.light.accentRed,
    shadowOffset: SHADOW_OFFSET,
    shadowOpacity: SHADOW_OPACITY,
    shadowRadius: SHADOW_RADIUS,
    elevation: 8,
  },

  // Contenedor del botón de audio y ecualizador
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },

  // Botón de audio
  audioButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Contenedor de las barras animadas
  audioBarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },

  // Estilo individual de cada barra animada
  bar: {
    width: 5,
    height: 20,
    marginHorizontal: 1,
    borderRadius: 3,
    backgroundColor: Colors.light.secondary,
  },

  // Título de la pantalla
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: Colors.light.secondary,
    marginVertical: 12,
    alignSelf: 'center',
  },

  // Campos de entrada de texto
  input: {
    width: '100%',
    height: INPUT_HEIGHT,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.background,
    backgroundColor: Colors.light.surface,
    color: Colors.light.text,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
  },

  // Botón de inicio de sesión
  loginButton: {
    width: '100%',
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT / 2,
    backgroundColor: Colors.light.accentRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: Colors.light.secondary,
    shadowOffset: SHADOW_OFFSET,
    shadowOpacity: 0.3,
    shadowRadius: SHADOW_RADIUS,
    elevation: 8,
  },

  // Texto del botón de inicio de sesión
  loginButtonText: {
    color: Colors.light.onBackground,
    fontSize: 18,
    fontWeight: 'bold',
  },
});