import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../../constants/Colors';

// =====================
// Constantes de opciones de desbloqueo
// =====================
const unlockOptions = [
  {
    key: 'transcripcion',
    title: 'Transcripción completa',
    desc: 'Descargar en PDF',
  },
  {
    key: 'linea',
    title: 'Línea de tiempo interactiva',
    desc: 'Minutos con mayor importancia',
  },
  {
    key: 'palabras',
    title: 'Palabras y conceptos clave',
    desc: 'Línea de tiempo',
  },
  {
    key: 'temas',
    title: 'Temas principales detectados',
    desc: 'Temas con mas importancia',
  },
];

const AUDIO_DURATION = 195; // 3:15 en segundos

export default function ReproduccionGrabacionScreen() {
  // Estado para la opción seleccionada
  const [selected, setSelected] = useState('transcripcion');
  // Estado para el tiempo actual del audio
  const [currentTime, setCurrentTime] = useState(25); // ejemplo: 0:25

  // Animación de barras de audio
  const BARS = 34;
  const MIN_HEIGHT = 18;
  const MAX_HEIGHT = 68;
  const animatedValues = useRef([...Array(BARS)].map(() => new Animated.Value(MIN_HEIGHT))).current;

  useEffect(() => {
    animatedValues.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: MAX_HEIGHT,
            duration: 400,
            delay: i * 60,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: MIN_HEIGHT,
            duration: 400,
            delay: 0,
            useNativeDriver: false,
          }),
        ])
      ).start();
    });
  }, [animatedValues]);

  // Formatea segundos a mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any}
      style={styles.container}
    >
      {/* Header con flecha de regreso */}
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.replace('/detallesGrabacion/OpcionesGrabacion')} style={styles.backButton}>
          <Image
            source={require('../../../assets/images/layoutTabs/carnet/back_arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Título y subtítulo */}
      <Text style={styles.title}>¿Qué dijo el profe?</Text>
      <Text style={styles.subtitle}>Hoy vamos a introducirnos</Text>

      {/* Imagen y barras animadas */}
      <View style={styles.audioVisualRow}>
        <Image
          source={require('../../../assets/images/layoutTabs/Grabacion/profe_icon.png')}
          style={styles.profeIcon}
        />
        <View style={styles.barsContainer}>
          {animatedValues.map((anim, idx) => (
            <Animated.View
              key={idx}
              style={[
                styles.bar,
                {
                  height: anim,
                  backgroundColor: Colors.light.primary,
                  marginLeft: idx === 0 ? 0 : 2,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Slider de tiempo (simulado) */}
      <View style={styles.audioSliderRow}>
        <Text style={styles.audioTime}>{formatTime(currentTime)}</Text>
        <View style={styles.sliderTrack}>
          <View style={[styles.sliderFill, { width: `${(currentTime / AUDIO_DURATION) * 100}%` }]} />
        </View>
        <Text style={styles.audioTime}>{formatTime(AUDIO_DURATION)}</Text>
      </View>

      {/* Opciones de desbloqueo */}
      <View style={styles.unlockTitleRow}>
        <Text style={styles.unlockTitle}>Desbloquea todo lo que se habló en clase.</Text>
        <Pressable>
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
      </View>
      <View style={styles.unlockOptionsList}>
        {unlockOptions.map(opt => (
          <TouchableOpacity
            key={opt.key}
            style={styles.unlockOptionRow}
            onPress={() => setSelected(opt.key)}
            activeOpacity={0.7}
          >
            <View style={styles.unlockOptionTextCol}>
              <Text style={styles.unlockOptionTitle}>{opt.title}</Text>
              <Text style={styles.unlockOptionDesc}>{opt.desc}</Text>
            </View>
            <View style={styles.radioOuter}>
              {selected === opt.key && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

// =====================
// Estilos
// =====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: Colors.light.textSecondary,
  },
  title: {
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    color: Colors.light.label,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
  audioVisualRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  profeIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10,
    paddingHorizontal: 50
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 60,
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    flex: 1,
  },
  bar: {
    width: 5,
    borderRadius: 3,
    backgroundColor: Colors.light.primary,
  },
  audioSliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    marginBottom: 10,
    marginTop: 2,
  },
  audioTime: {
    color: Colors.light.label,
    fontSize: 13,
    width: 36,
    textAlign: 'center',
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.light.bordeTarjetaContacto,
    borderRadius: 2,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  sliderFill: {
    height: 4,
    backgroundColor: Colors.light.primary,
    borderRadius: 2,
  },
  unlockTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 10,
    marginBottom: 2,
  },
  unlockTitle: {
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  closeIcon: {
    color: Colors.light.textSecondary,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  unlockOptionsList: {
    marginHorizontal: 8,
    marginTop: 2,
  },
  unlockOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.onBackground,
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    elevation: 1,
  },
  unlockOptionTextCol: {
    flex: 1,
  },
  unlockOptionTitle: {
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  unlockOptionDesc: {
    color: Colors.light.label,
    fontSize: 12,
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.primary,
  },
});
