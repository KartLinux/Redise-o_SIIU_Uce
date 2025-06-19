// app/SIIU_Academico.tsx
// app/SIIU_Academico.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

// ✅ Componentes reutilizables
import Carousel from '../components/SIIU_Academico/organisms/Carousel';
import Header from '../components/SIIU_Academico/organisms/Header';

// ✅ Custom hook para manejar lógica del carrusel
import useCarousel from '../hooks/SIIU_Academico/useCarousel';

// ✅ Colores globales definidos en Constants
import { Colors } from '../constants/Colors';

// ✅ Componente personalizado para fondo con gradiente
import { GradientBackground } from '../components/GradientBackground';
import ImageSection from '../components/SIIU_Academico/molecules/ImageSection';

/**
 * Pantalla principal: SIIU Académico
 *
 * Esta pantalla muestra:
 * - Un encabezado con logo y menú
 * - Dos carruseles sincronizados: uno superior e inferior
 * - Uso de componentes reutilizables y lógica encapsulada en hooks
 */
const SIIUAcademicoScreen = () => {
  const imageSource = require('../assets/images/logoUCE.png');
  const router = useRouter();
  // 👇 Datos estáticos para los carruseles (pueden venir de una API)
  const carouselData = [
    { imageSource: require('../assets/images/carruselSiiu/bntAcademico.png'), title: 'Académico', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnAdministrador.png'), title: 'Administrador', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnDoctorados.png'), title: 'Doctorados', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnEmisionTitulos.png'), title: 'Emision Titulos', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnGestionDocumentacion.png'), title: 'Gestion Documentacion', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnHospital.png'), title: 'Hospital', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnInscripcionPosgrado.png'), title: 'Inscripcion Posgrado', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnInvestigacion.png'), title: 'Investigacion', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnLiquidacion.png'), title: 'Liquidacion', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnMuseo.png'), title: 'Museo', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnRecaudaciones.png'), title: 'Recaudaciones', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnTalentoHumano.png'), title: 'Talento Humano', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnTitulacionPregrado.png'), title: 'Titulacion Pregrado', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnTitulacionPosgrado.png'), title: 'Titulacion Posgrado', route: '/Login' },
    { imageSource: require('../assets/images/carruselSiiu/btnVinculacion.png'), title: 'Vinculacion', route: '/Login' },
  ];
  // 👇 Datos estáticos para las imágenes de la sección (pueden venir de una API)
  const sectionImages = [
    require('../assets/images/sectionSiiu/stnAcademico.png'),
    require('../assets/images/sectionSiiu/stnAdministrador.png'),
    require('../assets/images/sectionSiiu/stnDoctorados.png'),
    require('../assets/images/sectionSiiu/stnEmisionTitulos.png'),
    require('../assets/images/sectionSiiu/stnGestionDocumentacion.png'),
    require('../assets/images/sectionSiiu/stnHospital.png'),
    require('../assets/images/sectionSiiu/stnInscripcionPosgrados.png'),
    require('../assets/images/sectionSiiu/stnInvestigacion.png'),
    require('../assets/images/sectionSiiu/stnLiquidacion.png'),
    require('../assets/images/sectionSiiu/stnMuseo.png'),
    require('../assets/images/sectionSiiu/stnRecaudaciones.png'),
    require('../assets/images/sectionSiiu/stnTalentoHumano.png'),
    require('../assets/images/sectionSiiu/stnTitulacionPregrado.png'),
    require('../assets/images/sectionSiiu/stnTitulacionPosgrado.png'),
    require('../assets/images/sectionSiiu/stnVinculacion.png'),
  ];
  // Hook para controlar la navegación entre elementos del carrusel
  // 🔶 hook para obtener fadeAnim y resetAnimation
  const { 
    currentIndex, 
    scrollTo,
    fadeAnim, // 🔶 Agregado desde el hook
    resetAnimation // 🔶 Agregado desde el hook
  } = useCarousel(0, carouselData.length, 9000);
   // Estado para la imagen seleccionada
   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

   // Callback para actualizar la imagen seleccionada desde el carrusel
  const handleImageSelected = (index: number) => {
    resetAnimation(); // 🔶 Reinicia la animación al cambiar de imagen
    setSelectedImageIndex(index);
  };

  return (
    // 🎨 Fondo con gradiente que ocupa toda la pantalla
    <GradientBackground colors={Colors.light.gradientPrimary as [string, string]}>

      {/* 🧱 Contenedor principal de la pantalla */}
      <View style={styles.container}>
        {/* 📌 Encabezado con logo y botones del menú */}
        <Header
          menuButtons={[
            { source: require('../assets/images/imgAssistent.png'), onPress: () => console.log('Assistent') },
            { source: require('../assets/images/imgFacebook.png'), onPress: () => console.log('Facebook') },
            { source: require('../assets/images/imgTwitter.png'), onPress: () => console.log('Twitter') },
            { source: require('../assets/images/imgYoutube.png'), onPress: () => console.log('Youtube') },
            { source: require('../assets/images/imgMails.png'), onPress: () => console.log('Mails') },
            { source: require('../assets/images/imgMappin.png'), onPress: () => console.log('Map') },
          ]}
          logoSource={require('../assets/images/logoUCE.png')}
        />

        {/* 🚀 Sección de imágenes con efecto de máscara */}
        <View style={styles.sectionContainer}>
          {/* 👇 Usamos la imagen correspondiente al índice seleccionado */}
          {/* 👇 Efecto de desvanecimiento en la imagen seleccionada */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <ImageSection imageSource={sectionImages[selectedImageIndex]} />
          </Animated.View>
        </View>

        {/* 🔄 Carrusel inferior: opciones interactivas */}
        <View style={styles.carouselContainer}>
          <Carousel
            items={carouselData}
            onItemSelected={handleImageSelected} // Actualiza la imagen seleccionada
            onItemPress={(route) => router.push(route as any)} // Conecta con Expo Router
          />
        </View>
      </View>
    </GradientBackground>
  );
};

// ✅ Estilos de la pantalla
const styles = StyleSheet.create({
  // ✅ Estilos para el contenedor principal
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Permite ver el fondo por debajo
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  // ✅ Estilos para el contenedor del carrusel
  carouselContainer: {
    //marginVertical: 20,
    paddingVertical: 20,
  },
  // ✅ Estilos para el contenedor de la sección
  sectionContainer: {
    paddingVertical: 0,
  },
  botonesRedesSociales: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
});

export default SIIUAcademicoScreen;

