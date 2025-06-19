import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

// Datos estructurados para las facultades y sus opciones
const FACULTADES = [
  { key: 'artes', label: 'Facultad de Artes' },
  { key: 'arquitectura', label: 'Facultad de Arquitectura y Urbanismo' },
  { key: 'ciencias', label: 'Facultad de Ciencias' },
  { key: 'administrativas', label: 'Facultad de Ciencias Administrativas' },
  { key: 'quimicas', label: 'Facultad de Ciencias Químicas' },
  { key: 'ingenieria', label: 'Facultad de Ingeniería y Ciencias Aplicadas' },
  { key: 'odontologia', label: 'Facultad de Odontología' },
];

// Opciones de trámites para la facultad de ingeniería
const TRAMITES = [
  { key: 'info', label: 'Información' },
  { key: 'parqueadero', label: 'Parqueadero' },
  { key: 'servipagos', label: 'ServiPagos' },
];

// Datos de mapas e imágenes (puedes reemplazar los require por tus imágenes locales)
const MAPAS = {
  principal: require('../../../assets/images/layoutTabs/herramientas/ubicate/mapa_ingenieria.png'),
  parqueaderos: require('../../../assets/images/layoutTabs/herramientas/ubicate/mapa_parqueaderos.png'),
  parqueaderoD: require('../../../assets/images/layoutTabs/herramientas/ubicate/mapa_parqueaderoD.png'),
  parqueaderoGoogle: require('../../../assets/images/layoutTabs/herramientas/ubicate/mapa_google.png'),
};

// Mensajes informativos
const MENSAJES = {
  parqueaderoD: '¡Atención! Existen 4 puestos libres en el parqueadero D. Recuerda que la disponibilidad puede cambiar en cualquier momento, ¡aprovéchalos ahora!',
  consejo: '"Evita contratiempos en tus procesos académicos: pega tus dudas a tiempo y mantén tus trámites al día."',
};

// Estados de navegación interna
const VIEWS = {
  FACULTADES: 'FACULTADES',
  INGENIERIA_MAPA: 'INGENIERIA_MAPA',
  INGENIERIA_TRAMITES: 'INGENIERIA_TRAMITES',
  PARQUEADEROS: 'PARQUEADEROS',
  PARQUEADERO_D: 'PARQUEADERO_D',
  CONSEJO: 'CONSEJO',
};

const UbicateScreen = () => {
  // Estado para controlar la vista actual
  const [view, setView] = useState(VIEWS.FACULTADES);
  // Estado para el título secundario
  const [subtitle, setSubtitle] = useState('');

  // Función para volver atrás según la vista
  const handleBack = () => {
    if (view === VIEWS.FACULTADES) {
      router.back();
    } else if (view === VIEWS.INGENIERIA_MAPA) {
      setView(VIEWS.FACULTADES);
      setSubtitle('');
    } else if (view === VIEWS.INGENIERIA_TRAMITES) {
      setView(VIEWS.INGENIERIA_MAPA);
      setSubtitle('Facultad de Ingeniería y Ciencias Aplicadas');
    } else if (view === VIEWS.PARQUEADEROS) {
      setView(VIEWS.INGENIERIA_TRAMITES);
      setSubtitle('Trámites de la Facultad de Ingeniería y Ciencias Aplicadas');
    } else if (view === VIEWS.PARQUEADERO_D) {
      setView(VIEWS.PARQUEADEROS);
      setSubtitle('Parqueaderos de la Facultad de Ingeniería y Ciencias Aplicadas');
    } else if (view === VIEWS.CONSEJO) {
      setView(VIEWS.PARQUEADEROS);
      setSubtitle('Parqueaderos de la Facultad de Ingeniería y Ciencias Aplicadas');
    }
  };

  // Renderiza la lista de facultades
  const renderFacultades = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Facultades</Text>
      {FACULTADES.map(fac => (
        <TouchableOpacity
          key={fac.key}
          style={styles.optionRow}
          activeOpacity={0.8}
          onPress={() => {
            if (fac.key === 'ingenieria') {
              setView(VIEWS.INGENIERIA_MAPA);
              setSubtitle('Facultad de Ingeniería y Ciencias Aplicadas');
            }
          }}
        >
          <Text style={styles.optionText}>{fac.label}</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
        </TouchableOpacity>
      ))}
      {/* Espacio para el efecto visual de la imagen */}
      <View style={styles.bottomBar} />
    </View>
  );

  // Renderiza el mapa principal de ingeniería y el botón de trámites
  const renderIngenieriaMapa = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{subtitle}</Text>
      <Image source={MAPAS.principal} style={styles.mapaImg} resizeMode="contain" />
      <TouchableOpacity
        style={styles.tramiteBtn}
        activeOpacity={0.8}
        onPress={() => {
          setView(VIEWS.INGENIERIA_TRAMITES);
          setSubtitle('Trámites de la Facultad de Ingeniería y Ciencias Aplicadas');
        }}
      >
        <Text style={styles.tramiteBtnText}>Trámites</Text>
      </TouchableOpacity>
    </View>
  );

  // Renderiza las opciones de trámites
  const renderIngenieriaTramites = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{subtitle}</Text>
      {TRAMITES.map(opt => (
        <TouchableOpacity
          key={opt.key}
          style={styles.optionRow}
          activeOpacity={0.8}
          onPress={() => {
            if (opt.key === 'parqueadero') {
              setView(VIEWS.PARQUEADEROS);
              setSubtitle('Parqueaderos de la Facultad de Ingeniería y Ciencias Aplicadas');
            }
          }}
        >
          <Text style={styles.optionText}>{opt.label}</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
        </TouchableOpacity>
      ))}
    </View>
  );

  // Renderiza el mapa de parqueaderos y opciones
  const renderParqueaderos = () => (
    <ScrollView contentContainerStyle={styles.card}>
      <Text style={styles.sectionTitle}>{subtitle}</Text>
      <Image source={MAPAS.parqueaderos} style={styles.mapaImg} resizeMode="contain" />
      <View style={styles.iconRow}>
        {/* Ejemplo de iconos de parqueaderos */}
        <Text style={styles.iconText}>🅿️ Parqueadero</Text>
        <Text style={styles.iconText}>🅿️ Parqueadero</Text>
        <Text style={styles.iconText}>🅿️ Parqueadero</Text>
        <Text style={styles.iconText}>🅿️ Parqueadero</Text>
      </View>
      <TouchableOpacity
        style={styles.optionRow}
        activeOpacity={0.8}
        onPress={() => {
          setView(VIEWS.PARQUEADERO_D);
          setSubtitle('Parqueadero D');
        }}
      >
        <Text style={styles.optionText}>Ver Parqueadero D</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionRow}
        activeOpacity={0.8}
        onPress={() => {
          setView(VIEWS.CONSEJO);
          setSubtitle('Consejo');
        }}
      >
        <Text style={styles.optionText}>Ver Consejo</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
      </TouchableOpacity>
    </ScrollView>
  );

  // Renderiza el detalle del parqueadero D
  const renderParqueaderoD = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{subtitle}</Text>
      <Image source={MAPAS.parqueaderoGoogle} style={styles.mapaImg} resizeMode="contain" />
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{MENSAJES.parqueaderoD}</Text>
      </View>
    </View>
  );

  // Renderiza el consejo final
  const renderConsejo = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{subtitle}</Text>
      <Image source={MAPAS.parqueaderoD} style={styles.mapaImg} resizeMode="contain" />
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{MENSAJES.consejo}</Text>
      </View>
    </View>
  );

  // Render principal según la vista
  let content;
  if (view === VIEWS.FACULTADES) content = renderFacultades();
  else if (view === VIEWS.INGENIERIA_MAPA) content = renderIngenieriaMapa();
  else if (view === VIEWS.INGENIERIA_TRAMITES) content = renderIngenieriaTramites();
  else if (view === VIEWS.PARQUEADEROS) content = renderParqueaderos();
  else if (view === VIEWS.PARQUEADERO_D) content = renderParqueaderoD();
  else if (view === VIEWS.CONSEJO) content = renderConsejo();

  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any}
      style={styles.fullScreenBackground}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Ubícate',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity style={styles.headerIcon} onPress={handleBack}>
              <Image
                source={require('../../../assets/images/layoutTabs/carnet/back_arrow.png')}
                style={{ width: 24, height: 24, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: Colors.light.textSecondary,
            fontWeight: 'bold',
          },
        }}
      />
      <View style={styles.centeredContent}>{content}</View>
    </LinearGradient>
  );
};

// Estilos responsivos y armoniosos
const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
  },
  headerIcon: {
    paddingHorizontal: 10,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: 18,
    padding: 18,
    width: '92%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    marginBottom: 10,
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.bordeTarjetaContacto,
  },
  optionText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  bottomBar: {
    height: 20,
    backgroundColor: Colors.light.disabled,
    borderRadius: 10,
    marginTop: 18,
    marginHorizontal: 10,
  },
  tramiteBtn: {
    backgroundColor: Colors.light.disabled,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 18,
    alignItems: 'center',
  },
  tramiteBtnText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
  },
  mapaImg: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.light.background,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  iconText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  infoBox: {
    backgroundColor: Colors.light.fondoTarjetaContacto,
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  infoText: {
    color: Colors.light.textSecondary,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default UbicateScreen; 