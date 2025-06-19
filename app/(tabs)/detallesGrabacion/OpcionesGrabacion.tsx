import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

// =====================
// Constantes de opciones superiores
// =====================
const topOptions = [
  {
    key: 'profe',
    label: '¿Qué dijo el profe?',
    desc: 'Transcripción clara',
    icon: require('../../../assets/images/layoutTabs/Grabacion/profe_icon.png'),
  },
  {
    key: 'entendiste',
    label: '¿Qué entendiste?',
    desc: 'Resumen explicado',
    icon: require('../../../assets/images/layoutTabs/Grabacion/entendiste_icon.png'),
  },
  {
    key: 'examen',
    label: 'Modo Examen',
    desc: 'Preguntas clave',
    icon: require('../../../assets/images/layoutTabs/Grabacion/examen_icon.png'),
  },
  {
    key: 'express',
    label: 'Modo Express',
    desc: 'Resumen mínimo',
    icon: require('../../../assets/images/layoutTabs/Grabacion/express_icon.png'),
  },
];

// =====================
// Constantes de opciones del centro QUIN-IA
// =====================
const quiniaOptions = [
  {
    key: 'dudas',
    label: 'Detección de dudas del estudiante',
    icon: require('../../../assets/images/layoutTabs/Grabacion/dudas_icon.png'),
  },
  {
    key: 'notas',
    label: 'Notas personales',
    icon: require('../../../assets/images/layoutTabs/Grabacion/notas_icon.png'),
  },
  {
    key: 'linea',
    label: 'Línea de tiempo de temas',
    icon: require('../../../assets/images/layoutTabs/Grabacion/linea_icon.png'),
  },
  {
    key: 'presentacion',
    label: 'Transformar clase en presentación',
    icon: require('../../../assets/images/layoutTabs/Grabacion/presentacion_icon.png'),
  },
  {
    key: 'antiplagio',
    label: 'Antiplagio y referencias',
    icon: require('../../../assets/images/layoutTabs/Grabacion/antiplagio_icon.png'),
  },
  {
    key: 'simulador',
    label: 'Simulador de examen oral',
    icon: require('../../../assets/images/layoutTabs/Grabacion/simulador_icon.png'),
  },
];

export default function OpcionesGrabacionScreen() {
  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any}
      style={styles.container}
    >
      {/* Header con flecha de regreso */}
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.replace('/detallesGrabacion/DetalleGrabacion')} style={styles.backButton}>
          <Image
            source={require('../../../assets/images/layoutTabs/carnet/back_arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Opciones superiores */}
      <View style={styles.topOptionsRow}>
        {topOptions.map((opt, idx) => (
          <TouchableOpacity key={opt.key} style={styles.topOptionBtn} onPress={() => router.push('/detallesGrabacion/reproduccionGrabacion')}>
            <Image source={opt.icon} style={styles.topOptionIcon} />
            <Text style={styles.topOptionLabel}>{opt.label}</Text>
            <Text style={styles.topOptionDesc}>{opt.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Título del centro */}
      <View style={styles.centerTitleRow}>
        <Text style={styles.centerTitle}>Centro QUIN-IA</Text>
        <TouchableOpacity>
          <Text style={styles.moreOptions}>Más opciones</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de opciones del centro QUIN-IA */}
      <FlatList
        data={quiniaOptions}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.quiniaOptionRow}>
            <Image source={item.icon} style={styles.quiniaOptionIcon} />
            <Text style={styles.quiniaOptionLabel}>{item.label}</Text>
            <TouchableOpacity style={styles.quiniaOptionMenu}>
              <Text style={styles.menuDots}>⋮</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.quiniaListContent}
        showsVerticalScrollIndicator={false}
      />
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
  topOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 18,
    gap: 10,
  },
  topOptionBtn: {
    backgroundColor: Colors.light.onBackground,
    borderRadius: 14,
    width: '47%',
    marginBottom: 8,
    alignItems: 'center',
    paddingVertical: 16,
    elevation: 2,
  },
  topOptionIcon: {
    width: 32,
    height: 32,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  topOptionLabel: {
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  topOptionDesc: {
    color: Colors.light.label,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  centerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 6,
  },
  centerTitle: {
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  moreOptions: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  quiniaListContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  quiniaOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.onBackground,
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
    elevation: 1,
  },
  quiniaOptionIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
    resizeMode: 'contain',
  },
  quiniaOptionLabel: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    flex: 1,
    fontWeight: '500',
  },
  quiniaOptionMenu: {
    marginLeft: 10,
    padding: 6,
  },
  menuDots: {
    fontSize: 22,
    color: Colors.light.label,
    fontWeight: 'bold',
  },
});
