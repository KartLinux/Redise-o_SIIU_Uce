// components/SIIU_Academico/atoms/Button.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/Colors';

// ✅ Constantes visuales (en lugar de hardcodear)
const TAMAÑO_PADDING_VERTICAL = 10;
const TAMAÑO_PADDING_HORIZONTAL = 10;
const RADIO_REDONDEADO = 50; // 50% del radio del botón
const ESPACIADO_ENTRE_BOTONES = 10;

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

/**
 * Componente atómico: Botón genérico.
 *
 * Usa variantes (`primary` o `secondary`) para cambiar su estilo visual.
 */
const Button: React.FC<ButtonProps> = ({ children, onPress, variant = 'primary' }) => {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant]]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: TAMAÑO_PADDING_VERTICAL,
    paddingHorizontal: TAMAÑO_PADDING_HORIZONTAL,
    borderRadius: RADIO_REDONDEADO,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ESPACIADO_ENTRE_BOTONES,
  },
  primary: {
    backgroundColor: Colors.light.primary,
  },
  secondary: {
    backgroundColor: Colors.light.secondary,
  },
});

export default Button;