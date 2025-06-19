// app/components/AnimatedLogo.tsx
import React from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

export const AnimatedLogo: React.FC<{ style?: StyleProp<ImageStyle> }> = ({ style }) => {
  return (
    <Image
      source={require("../assets/images/logoUCE.png")}
      style={[{ width: 100, height: 100, borderRadius: 50, resizeMode: "cover" }, style]}
    />
  );
};
