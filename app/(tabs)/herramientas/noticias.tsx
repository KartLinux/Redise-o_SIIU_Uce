import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

// Datos estructurados de noticias y fechas
const FECHAS = [
  { key: '2025-05', label: 'MAYO, 2025' },
  { key: '2024-05', label: 'MAYO, 2024' },
];

// Definición de tipo para noticia
interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  imagen: any;
  contenido: string;
  boletin: string;
}

const NOTICIAS: Record<string, Noticia[]> = {
  '2025-05': [
    {
      id: 'n1',
      titulo: 'I Congreso Ciencia Cafetera',
      resumen: 'Avances en investigación y desarrollo en la industria cafetera.',
      imagen: require('../../../assets/images/layoutTabs/herramientas/noticias/congreso_cafe.png'),
      contenido: 'El I Congreso Ciencia Cafetera reunió a expertos nacionales e internacionales para discutir los últimos avances en la industria cafetera. Se presentaron investigaciones sobre producción sostenible, calidad y exportación.',
      boletin: 'https://boletin1.com',
    },
    {
      id: 'n2',
      titulo: 'Posesión del nuevo PAUCC 2025-2028',
      resumen: 'Nueva directiva asume el reto de liderar la universidad.',
      imagen: require('../../../assets/images/layoutTabs/herramientas/noticias/posesion_paucc.png'),
      contenido: 'La nueva directiva del PAUCC asumió oficialmente sus funciones para el periodo 2025-2028, con el compromiso de fortalecer la educación superior y la investigación.',
      boletin: 'https://boletin2.com',
    },
    {
      id: 'n3',
      titulo: 'Taller de Capacitación sobre la biodiversidad',
      resumen: 'Capacitación sobre biodiversidad, manejo ambiental y turismo comunitario.',
      imagen: require('../../../assets/images/layoutTabs/herramientas/noticias/taller_biodiversidad.png'),
      contenido: 'Taller de Capacitación sobre la biodiversidad, el manejo ambiental y el turismo comunitario. Del 25 al 27 de abril de 2025, en la Comunidad Etnográfica Pablo López del Oglán Alto (CEPOA), cantón Arajuno, provincia de Pastaza, se llevó a cabo el Taller de Capacitación a la Red de Centros Comunitarios de Turismo del Cantón Arajuno, un espacio de fortalecimiento e intercambio de conocimientos centrado en prácticas sostenibles y turismo comunitario.',
      boletin: 'https://boletin3.com',
    },
  ],
  '2024-05': [
    {
      id: 'n4',
      titulo: 'Cimel dentro del proceso de enseñanza',
      resumen: 'El uso de computadoras en el proceso educativo.',
      imagen: require('../../../assets/images/layoutTabs/herramientas/noticias/cimel_ensenanza.png'),
      contenido: 'Cimel ha sido implementado como herramienta clave en el proceso de enseñanza, permitiendo a los estudiantes acceder a recursos digitales y mejorar su aprendizaje.',
      boletin: 'https://boletin4.com',
    },
    {
      id: 'n5',
      titulo: 'Conferencias internacionales de posgrado',
      resumen: 'Expertos internacionales comparten sus conocimientos.',
      imagen: require('../../../assets/images/layoutTabs/herramientas/noticias/conferencias_posgrado.png'),
      contenido: 'Las conferencias internacionales de posgrado han permitido el intercambio de conocimientos entre expertos de diferentes países, fortaleciendo la formación académica.',
      boletin: 'https://boletin5.com',
    },
    {
      id: 'n6',
      titulo: 'El conformismo académico: un desafío regional',
      resumen: 'Reflexión sobre el conformismo en la educación superior.',
      imagen: require('../../../assets/images/layoutTabs/herramientas/noticias/conformismo_academico.png'),
      contenido: 'El conformismo académico es un reto que afecta a la región. Se discutieron estrategias para motivar a los estudiantes y promover la excelencia.',
      boletin: 'https://boletin6.com',
    },
  ],
};

const NoticiasScreen = () => {
  // Estado para la fecha seleccionada
  const [fechaSeleccionada, setFechaSeleccionada] = useState(FECHAS[0].key);
  // Estado para la noticia seleccionada (detalle)
  const [noticiaDetalle, setNoticiaDetalle] = useState<Noticia | null>(null);

  // Renderiza el encabezado institucional
  const renderHeader = () => (
    <View style={styles.headerInst}>
      <Image
        source={require('../../../assets/images/logoUCE.png')}
        style={styles.logoUce}
        resizeMode="contain"
      />
      
    </View>
  );

  // Renderiza el selector de fechas
  const renderSelectorFechas = () => (
    <View style={styles.fechasRow}>
      {FECHAS.map(f => (
        <TouchableOpacity
          key={f.key}
          style={[styles.fechaBtn, fechaSeleccionada === f.key && styles.fechaBtnActive]}
          onPress={() => {
            setFechaSeleccionada(f.key);
            setNoticiaDetalle(null);
          }}
        >
          <Text style={[styles.fechaBtnText, fechaSeleccionada === f.key && styles.fechaBtnTextActive]}>{f.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Renderiza la lista de noticias para la fecha seleccionada
  const renderNoticiasLista = () => (
    <View style={styles.cardNoticias}>
      <Text style={styles.seccionTitle}>{FECHAS.find(f => f.key === fechaSeleccionada)?.label}</Text>
      <View style={styles.noticiasRow}>
        <Text style={styles.noticiasDe}>Noticias de</Text>
        {/* Aquí podrías poner un mini-calendario o icono si lo deseas */}
      </View>
      {NOTICIAS[fechaSeleccionada].map((noticia: Noticia) => (
        <TouchableOpacity
          key={noticia.id}
          style={styles.noticiaPreview}
          activeOpacity={0.85}
          onPress={() => setNoticiaDetalle(noticia)}
        >
          <View style={styles.noticiaPreviewRow}>
            <Image source={noticia.imagen} style={styles.noticiaImgMini} />
            <View style={{ flex: 1 }}>
              <Text style={styles.noticiaTitulo}>{noticia.titulo}</Text>
              <Text style={styles.noticiaResumen}>{noticia.resumen}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Renderiza el detalle de una noticia
  const renderDetalleNoticia = () => (
    <View style={styles.cardNoticias}>
      <Text style={styles.noticiaTituloDetalle}>{noticiaDetalle?.titulo}</Text>
      <Image source={noticiaDetalle?.imagen} style={styles.noticiaImgGrande} />
      <Text style={styles.noticiaResumen}>{noticiaDetalle?.resumen}</Text>
      <Text style={styles.noticiaContenido}>{noticiaDetalle?.contenido}</Text>
      <TouchableOpacity onPress={() => setNoticiaDetalle(null)}>
        <Text style={styles.verBoletin}>Ver Boletín...</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any}
      style={styles.fullScreenBackground}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Repositorio de Noticias',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity style={styles.headerIcon} onPress={() => noticiaDetalle ? setNoticiaDetalle(null) : router.back()}>
              <Image
                source={require('../../../assets/images/layoutTabs/carnet/back_arrow.png')}
                style={{ width: 28, height: 28, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: Colors.light.textSecondary,
            fontWeight: 'bold',
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderHeader()}
        <View style={styles.cardNoticiasWrap}>
          {renderSelectorFechas()}
          {noticiaDetalle ? renderDetalleNoticia() : renderNoticiasLista()}
        </View>
      </ScrollView>
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
    marginTop: 20,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 10,
  },
  headerInst: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 80,
  },
  logoUce: {
    width: 120,
    height: 40,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cardNoticiasWrap: {
    width: '100%',
    alignItems: 'center',
  },
  cardNoticias: {
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
  fechasRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  fechaBtn: {
    backgroundColor: Colors.light.fondoTarjetaContacto,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: Colors.light.bordeTarjetaContacto,
  },
  fechaBtnActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  fechaBtnText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  fechaBtnTextActive: {
    color: Colors.light.text,
  },
  seccionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    marginBottom: 10,
    textAlign: 'center',
  },
  noticiasRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  noticiasDe: {
    fontSize: 15,
    color: Colors.light.label,
    marginRight: 8,
  },
  noticiaPreview: {
    backgroundColor: Colors.light.fondoTarjetaContacto,
    borderRadius: 12,
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.light.bordeTarjetaContacto,
  },
  noticiaPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noticiaImgMini: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: Colors.light.background,
  },
  noticiaTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    marginBottom: 2,
  },
  noticiaResumen: {
    fontSize: 13,
    color: Colors.light.label,
    marginBottom: 2,
  },
  noticiaTituloDetalle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  noticiaImgGrande: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.light.background,
  },
  noticiaContenido: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 8,
    textAlign: 'justify',
  },
  verBoletin: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});

export default NoticiasScreen; 