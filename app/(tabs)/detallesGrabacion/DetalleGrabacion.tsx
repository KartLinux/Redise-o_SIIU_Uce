import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

export default function DetalleGrabacionScreen() {
  // Recibe los parámetros de la grabación seleccionada
  const params = useLocalSearchParams();
  const title = params.title || 'Dispositivos Móviles';
  const date = params.date || 'Grabación 00001';

  const texto =
    'rloute e foi parar bem rente ao menino, que desceu da casa apressado pela rua. rloute e foi parar bem rente ao menino, que desceu da casa apressado pela rua. rloute e foi parar bem rente ao menino, que desceu da casa apressado pela rua.';

  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any}
      style={styles.container}
    >
      {/* Header con flecha de regreso */}
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.replace('/Grabacion')} style={styles.backButton}>
          <Image
            source={require('../../../assets/images/layoutTabs/carnet/back_arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grabación</Text>
        <View style={{ width: 32 }} /> {/* Espacio para alinear el título */}
      </View>

      {/* Tarjeta de texto */}
      <View style={styles.textCard}>
        <Text style={styles.textCardTitle}>O CHUTE DO DESTINO</Text>
        <Text style={styles.textCardBody}>{texto}</Text>
        <TouchableOpacity style={styles.hideButton}>
          <Text style={styles.hideButtonText}>Ocultar Pantalla</Text>
        </TouchableOpacity>
      </View>

      {/* Botón Guardar como PDF */}
      <TouchableOpacity style={styles.pdfButton}>
        <Image
          source={require('../../../assets/images/layoutTabs/Grabacion/pdf_icon.png')}
          style={styles.pdfIcon}
        />
        <Text style={styles.pdfButtonText}>Guardar como PDF</Text>
      </TouchableOpacity>

      {/* Info de la grabación */}
      <View style={styles.infoRow}>
        <View>
          <Text style={styles.audioTitle}>{title}</Text>
          <Text style={styles.audioSubtitle}>{date}</Text>
        </View>
        <View style={styles.audioIcons}>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/images/layoutTabs/Grabacion/fav_icon.png')}
              style={styles.audioIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/images/layoutTabs/Grabacion/share_icon.png')}
              style={styles.audioIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de audio */}
      <View style={styles.audioBarRow}>
        <Text style={styles.audioTime}>0:25</Text>
        <TouchableOpacity style={styles.audioPlayButton}>
          <Image
            source={require('../../../assets/images/layoutTabs/Grabacion/play_audio.png')}
            style={styles.audioPlayIcon}
          />
        </TouchableOpacity>
        <Text style={styles.audioTime}>3:15</Text>
      </View>

      {/* Botón de opciones de preguntas */}
      <TouchableOpacity style={styles.questionButton} onPress={() => router.push('/detallesGrabacion/OpcionesGrabacion')}>
        <Text style={styles.questionButtonText}>Opciones de preguntas</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 10,
    justifyContent: 'space-between',
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  textCard: {
    backgroundColor: Colors.light.onBackground,
    borderRadius: 16,
    marginHorizontal: 18,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    alignItems: 'center',
  },
  textCardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.light.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  textCardBody: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify',
  },
  hideButton: {
    marginTop: 4,
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.light.surface,
  },
  hideButtonText: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  pdfButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 18,
    marginBottom: 10,
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pdfIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  pdfButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 6,
  },
  audioTitle: {
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  audioSubtitle: {
    color: Colors.light.label,
    fontSize: 12,
  },
  audioIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  audioIcon: {
    width: 22,
    height: 22,
    marginLeft: 10,
    tintColor: Colors.light.primary,
    resizeMode: 'contain',
  },
  audioBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    gap: 18,
  },
  audioTime: {
    color: Colors.light.label,
    fontSize: 13,
    width: 36,
    textAlign: 'center',
  },
  audioPlayButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 30,
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  audioPlayIcon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  questionButton: {
    marginTop: 8,
    alignSelf: 'center',
    backgroundColor: Colors.light.secondary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
    elevation: 2,
  },
  questionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 