// app/home.tsx

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

// =====================
// Componentes reutilizables
// =====================
function QuickActionButton({ label, icon, route }: { label: string; icon: any; route: string }) {
  return (
    <TouchableOpacity 
      style={styles.actionButton}
      onPress={() => router.push(route as any)}
    >
      <Image source={icon} style={styles.actionIcon} />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function MainActionButton({ label, icon, route }: { label: string; icon: any; route: string }) {
  return (
    <TouchableOpacity 
      style={styles.mainActionButton}
      onPress={() => router.push(route as any)}
    >
      <Image source={icon} style={styles.mainActionIcon} />
      <Text style={styles.mainActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function MessageItem({ user, message, time, avatar }: { user: string; message: string; time: string; avatar: any }) {
  return (
    <View style={styles.messageItem}>
      <Image source={avatar} style={styles.messageAvatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.messageUser}>{user}</Text>
        <Text style={styles.messageText} numberOfLines={1}>{message}</Text>
      </View>
      <Text style={styles.messageTime}>{time}</Text>
    </View>
  );
}

function AudioBar() {
  // Número de barras
  const BARS = 27;
  // Alturas base y máxima
  const MIN_HEIGHT = 10;
  const MAX_HEIGHT = 28;

  // Crear refs animados para cada barra
  const animatedValues = useRef([...Array(BARS)].map(() => new Animated.Value(MIN_HEIGHT))).current;

  useEffect(() => {
    // Animar cada barra con un pequeño delay para el efecto de onda
    animatedValues.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: MAX_HEIGHT,
            duration: 350,
            delay: i * 80,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: MIN_HEIGHT,
            duration: 350,
            delay: 0,
            useNativeDriver: false,
          }),
        ])
      ).start();
    });
  }, [animatedValues]);

  return (
    <TouchableOpacity 
      style={styles.audioBarCustomContainer}
      onPress={() => router.push('/Grabacion' as any)}
    >
      {/* Icono a la izquierda */}
      <Image source={require('../../assets/images/layoutTabs/home/audio_bar.png')} style={styles.audioBarIcon} />
      {/* Barras animadas */}
      <View style={styles.barsContainer}>
        {animatedValues.map((anim, idx) => (
          <Animated.View
            key={idx}
            style={[
              styles.bar,
              {
                height: anim,
                backgroundColor: '#222',
                marginLeft: idx === 0 ? 0 : 3,
              },
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
}

// =====================
// Datos de ejemplo
// =====================
const quickActions = [
  { label: 'Carnet', icon: require('../../assets/images/layoutTabs/home/carnet.png'), route: '/carnet' },
  { label: 'Horario y Materias', icon: require('../../assets/images/layoutTabs/home/horario.png'), route: '/horario' },
  { label: 'Calificaciones', icon: require('../../assets/images/layoutTabs/home/calificaciones.png'), route: '/calificaciones' },
];

const mainActions = [
  { label: 'Trámites', icon: require('../../assets/images/layoutTabs/home/tramites.png'), route: '/tramites' },
  { label: 'Matrícula', icon: require('../../assets/images/layoutTabs/home/matricula.png'), route: '/matricula' },
  { label: 'Herramientas', icon: require('../../assets/images/layoutTabs/home/herramientas.png'), route: '/herramientas' },
];

const messages = [
  {
    user: 'Nancy Ruales',
    message: 'Hola, ¿dónde estás?',
    time: '12:41 PM',
    avatar: require('../../assets/images/layoutTabs/home/user1.png'),
  },
  {
    user: 'Carlos Benavidez',
    message: 'Te envío el link para el trabajo de...',
    time: '1:06 PM',
    avatar: require('../../assets/images/layoutTabs/home/user2.png'),
  },
];

// =====================
// Pantalla principal Home
// =====================
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Fondo gradiente */}
      <LinearGradient
        colors={Colors.light.gradientSecondary as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.7 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.headerCard}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.hello}>Hola <Text style={styles.wave}>👋</Text></Text>
            <Text style={styles.userName}>Rubén Ger</Text>
          </View>
          <Image source={require('../../assets/images/layoutTabs/home/bell.png')} style={styles.bellIcon} />
        </View>
      </View>

      {/* Zona superior: accesos rápidos y calendario */}
      <View style={styles.topRow}>
        {/* Accesos rápidos en columna */}
        <View style={styles.quickActionsColumn}>
          {quickActions.map((item, idx) => (
            <QuickActionButton key={idx} label={item.label} icon={item.icon} route={item.route} />
          ))}
        </View>
        {/* Calendario y acciones principales */}
        <View style={styles.calendarAndActionsColumn}>
          <View style={styles.calendarCard}>
            <Text style={styles.calendarTitle}>Mayo 2025</Text>
            {/* Placeholder calendario */}
            <Image source={require('../../assets/images/layoutTabs/home/calendar_placeholder.png')} style={styles.calendarImage} />
          </View>
          <View style={styles.mainActionsRow}>
            {mainActions.map((item, idx) => (
              <MainActionButton key={idx} label={item.label} icon={item.icon} route={item.route} />
            ))}
          </View>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchBarContainer}>
        <TextInput placeholder="Búsqueda" style={styles.searchBar} placeholderTextColor="#888" />
      </View>

      {/* Lista de mensajes */}
      <View style={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <MessageItem key={idx} {...msg} />
        ))}
      </View>

      {/* Barra de audio (custom) */}
      <View style={styles.audioBarContainer}>
        <AudioBar />
      </View>
    </View>
  );
}

// =====================
// Estilos
// =====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
  headerCard: {
    backgroundColor: Colors.light.primary,
    borderRadius: 14,
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 15,
    padding: 10,
    // Sombra
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 6,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  hello: {
    color: '#111',
    fontSize: 13,
    fontWeight: '700',
  },
  wave: {
    fontSize: 13,
  },
  userName: {
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bellIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  quickActionsColumn: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 6,
    marginRight: 4,
  },
  actionButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 4,
    minWidth: 120,
    maxWidth: 140,
    height: 55,
    marginBottom: 0,
    borderColor: 'skyblue',
    borderWidth: 1,
  },
  actionIcon: {
    width: 30,
    height: 30,
    marginBottom: 1,
    resizeMode: 'contain',
  },
  actionLabel: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  calendarAndActionsColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  calendarCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 7,
    marginBottom: 8,
    // Sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  calendarTitle: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 2,
  },
  calendarImage: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  mainActionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  mainActionButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    minWidth: 10,
    maxWidth: 90,
    height: 60,
    marginBottom: 2,
  },
  mainActionIcon: {
    width: 40,
    height: 20,
    marginBottom: 1,
    resizeMode: 'contain',
  },
  mainActionLabel: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  searchBarContainer: {
    marginHorizontal: 10,
    marginBottom: 8,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 38,
    fontSize: 15,
    color: '#222',
    // Sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  messagesContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    marginHorizontal: 10,
    marginBottom: 8,
    // Sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  messageAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: '#eee',
  },
  messageUser: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 14,
  },
  messageText: {
    color: '#444',
    fontSize: 13,
  },
  messageTime: {
    color: '#888',
    fontSize: 11,
    marginLeft: 8,
  },
  audioBarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  audioBar: {
    width: 260,
    height: 38,
    resizeMode: 'contain',
  },
  audioBarCustomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: 22,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'skyblue', // celeste
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    width: 320,
    alignSelf: 'center',
    marginTop: 4,
  },
  audioBarIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
    resizeMode: 'contain',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    height: 32,
    marginLeft: 4,
  },
  bar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: '#222',
  },
});