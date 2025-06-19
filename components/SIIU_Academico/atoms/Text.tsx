// components/SIIU_Academico/atoms/Text.tsx
import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

type TextProps = {
  children: React.ReactNode;
  variant?: 'title' | 'subtitle' | 'body' | 'label';
  color?: string;
};

const Text: React.FC<TextProps> = ({ children, variant = 'body', color }) => {
  return (
    <RNText style={[styles[variant], color ? { color } : { color: Colors.light.text }]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: Colors.light.label, // Ejemplo si tienes un color label en Constants
  },
});

export default Text;