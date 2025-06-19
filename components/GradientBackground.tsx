// app/components/GradientBackground.tsx
// app/components/GradientBackground.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ColorValue } from 'react-native';
import { Colors } from '../constants/Colors';

interface GradientBackgroundProps {
  children?: React.ReactNode;
  colors?: readonly [ColorValue, ColorValue];
}

export function GradientBackground({ 
  children, 
  colors = Colors.light.gradientPrimary as [ColorValue, ColorValue]
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}