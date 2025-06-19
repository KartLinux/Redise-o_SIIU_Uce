// components/SIIU_Academico/organisms/Header.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import ImageComponent from '../atoms/Image';
import ImageButton from '../molecules/ImageButton';

type HeaderProps = {
  logoSource: any;
  menuButtons: Array<{
    source: any;
    onPress: () => void;
  }>;
};

/**
 * Componente organismo: Encabezado principal.
 * 
 * Muestra:
 * - Una fila de botones redondos con iconos, sin texto.
 * - Un logo centralizado abajo de los botones.
 */
const Header: React.FC<HeaderProps> = ({ logoSource, menuButtons }) => {
  return (
    <View style={styles.container}>
      {/* 📱 Botones redondos alineados horizontalmente */}
      <View style={styles.buttonContainer}>
        {menuButtons.map((item, index) => (
          <ImageButton
            key={index}
            source={item.source}
            title=""
            onPress={item.onPress}
            variant="secondary"
          />
        ))}
      </View>

      {/* 🎯 Logo centrado abajo de los botones */}
      <View style={styles.logoContainer}>
        <ImageComponent
          source={logoSource}
          width={100}
          height={100}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

// ✅ Constantes para evitar hardcode
const ESPACIO_VERTICAL = 29; // Espacio superior e inferior
const ESPACIO_HORIZONTAL = 20; // Espacio lateral
const ESPACIO_ENTRE_BOTONES = 10; // Separación entre botones
const ESPACIO_DEBAJO_BOTONES = 15; // Margen debajo de los botones
const TAMAÑO_LOGO = 90; // Tamaño del logo (ancho y alto)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Empieza desde arriba
    alignItems: 'center',         // Centra todo horizontalmente
    paddingVertical: ESPACIO_VERTICAL,
    paddingHorizontal: ESPACIO_HORIZONTAL,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: ESPACIO_ENTRE_BOTONES,   // Espacio entre botones
    justifyContent: 'center',     // Centramos los botones
    flexWrap: 'nowrap',             // Si no caben, van a la siguiente línea
    marginBottom: ESPACIO_DEBAJO_BOTONES, // Espacio debajo de los botones
    paddingHorizontal: ESPACIO_HORIZONTAL, // Para evitar que toquen bordes
    width: '100%',                // Ocupa todo el ancho
  },
  logoContainer: {
    width: TAMAÑO_LOGO,      // Añadimos espacio extra para bordes redondos
    height: TAMAÑO_LOGO,
    borderRadius: (TAMAÑO_LOGO + 20) / 2, // Forma redonda
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default Header;