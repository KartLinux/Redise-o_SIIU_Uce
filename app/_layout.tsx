// app/_layout.tsx
import { Stack } from 'expo-router';
import { ThemeProvider } from '../components/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="SIIU_Academico" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}