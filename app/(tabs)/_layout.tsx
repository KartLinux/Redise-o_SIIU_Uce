// app/(tabs)/_layout.tsx
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Tabs } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

// =====================
// Constantes de diseño
// =====================
const TAB_BAR_GRADIENT_COLORS = [Colors.light.secondary, Colors.light.primary];
const TAB_BAR_GRADIENT_START = { x: 0, y: 1 };
const TAB_BAR_GRADIENT_END = { x: 0, y: 0 };
const HEADER_GRADIENT_COLORS = [Colors.light.primary, Colors.light.secondary];
const HEADER_GRADIENT_START = { x: 0, y: 0 };
const HEADER_GRADIENT_END = { x: 0, y: 1 };
const HEADER_HEIGHT = 80;
const HEADER_PADDING_BOTTOM = 10;
const HEADER_PADDING_HORIZONTAL = 0;
const FAB_SIZE = 74;
const FAB_ICON_SIZE = 48;
const FAB_BOTTOM = 60;
const FAB_BORDER_WIDTH = 5;
const FAB_BORDER_COLOR = '#D4EFFF';

// =====================
// Custom Tab Bar con gradiente y botón central
// =====================
function CustomTabBar(props: BottomTabBarProps) {
  return (
    <View style={{ position: 'relative' }}>
      {/* Fondo gradiente del tab bar */}
      <LinearGradient
        colors={TAB_BAR_GRADIENT_COLORS as [import('react-native').ColorValue, import('react-native').ColorValue]}
        start={TAB_BAR_GRADIENT_START}
        end={TAB_BAR_GRADIENT_END}
        style={StyleSheet.absoluteFill}
      />
      {/* Botón central (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/herramientas/chatIA')}
      >
        <Image source={require('../../assets/images/layoutTabs/colibri.png')} style={styles.fabIcon} />
      </TouchableOpacity>
      {/* Tab bar real */}
      <BottomTabBar {...props} />
    </View>
  );
}

// =====================
// Custom Header con gradiente
// =====================
type CustomHeaderProps = { options: any; route: { name: string } };
function CustomHeader({ options, route }: CustomHeaderProps) {
  return (
    <LinearGradient
      colors={HEADER_GRADIENT_COLORS as [import('react-native').ColorValue, import('react-native').ColorValue]}
      start={HEADER_GRADIENT_START}
      end={HEADER_GRADIENT_END}
      style={{
        height: HEADER_HEIGHT,
        justifyContent: 'flex-end',
        paddingBottom: 0,
        paddingHorizontal: HEADER_PADDING_HORIZONTAL,
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Image
          source={require('../../assets/images/layoutTabs/logoUce.png')}
          style={{ width: 36, height: 36, marginRight: 8, borderRadius: 18, backgroundColor: '#fff' }}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>
          {options.title || route.name}
        </Text>
      </View>
      {/* Franja azul oscuro */}
      <View style={{ height: 6, backgroundColor: Colors.light.secondary, width: '100%' }} />
      {/* Franja roja */}
      <View style={{ height: 6, backgroundColor: Colors.light.accentRed, width: '100%', marginTop: 4 }} />
    </LinearGradient>
  );
}

// =====================
// Estilos
// =====================
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: FAB_BOTTOM,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: Colors.light.gradientPrimary[0],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 10,
    borderWidth: FAB_BORDER_WIDTH,
    borderColor: FAB_BORDER_COLOR,
  },
  fabIcon: {
    width: FAB_ICON_SIZE,
    height: FAB_ICON_SIZE,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

// =====================
// Layout principal de las tabs
// =====================
export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      
      <Tabs
        screenOptions={{
          header: (props) => <CustomHeader {...props} />, // Header con gradiente
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#000',
          tabBarStyle: { backgroundColor: 'transparent', borderTopWidth: 0, elevation: 0 },
        }}
        tabBar={props => <CustomTabBar {...props} />}
      >
        <Tabs.Screen 
          name="home" 
          options={{ 
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={require('../../assets/images/layoutTabs/home.png')}
                style={{
                  width: 28,
                  height: 28,
                  tintColor: color,
                  opacity: focused ? 1 : 0.7,
                }}
                resizeMode="contain"
              />
            ),
          }} 
        />
          <Tabs.Screen 
            name="explore" 
            options={{ 
              title: "Actividades",
              tabBarIcon: ({ color, size, focused }) => (
                <Image
                  source={require('../../assets/images/layoutTabs/actividades.png')}
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: color,
                    opacity: focused ? 1 : 0.7,
                  }}
                  resizeMode="contain"
                />
              ),
            }} 
          />
          <Tabs.Screen 
            name="contactos" 
            options={{ 
              title: "Contactos",
              tabBarIcon: ({ color, size, focused }) => (
                <Image
                  source={require('../../assets/images/layoutTabs/contactos.png')}
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: color,
                    opacity: focused ? 1 : 0.7,
                  }}
                  resizeMode="contain"
                />
              ),
            }} 
          />
          <Tabs.Screen 
            name="perfil" 
            options={{ 
              title: "Perfil",
              tabBarIcon: ({ color, size, focused }) => (
                <Image
                  source={require('../../assets/images/layoutTabs/perfil.png')}
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: color,
                    opacity: focused ? 1 : 0.7,
                  }}
                  resizeMode="contain"
                />
              ),
            }} 
          />
          {/* Hidden Tabs */}
          <Tabs.Screen 
            name="carnet" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Carnet",
            }} 
          />
          <Tabs.Screen 
            name="horario" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Horario",
            }} 
          />
          <Tabs.Screen 
            name="calificaciones" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Calificaciones",
            }} 
          />
          <Tabs.Screen 
            name="tramites" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Tramites",
            }} 
          />
          <Tabs.Screen 
            name="matricula" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Matricula",
            }} 
          />
          <Tabs.Screen 
            name="herramientas" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Herramientas",
            }} 
          />
          <Tabs.Screen 
            name="herramientas/educhat" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "EduChat",
            }} 
          />
          <Tabs.Screen 
            name="herramientas/ubicate" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Ubícate",
            }} 
          />
          <Tabs.Screen 
            name="herramientas/noticias" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Noticias",
            }} 
          />
          <Tabs.Screen 
            name="herramientas/quinia" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Quinía",
            }} 
          />
          <Tabs.Screen 
            name="herramientas/splashScreenQuinia" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Quinía",
            }} 
          />
          <Tabs.Screen 
            name="herramientas/chatIA" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Chat-IA",
            }} 
          />
          <Tabs.Screen 
            name="Grabacion" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "Grabacion",
            }} 
          />
          <Tabs.Screen 
            name="detallesGrabacion/DetalleGrabacion" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "DetalleGrabacion",
            }} 
          />
          <Tabs.Screen 
            name="detallesGrabacion/OpcionesGrabacion" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "OpcionesGrabacion",
            }} 
          />
          <Tabs.Screen 
            name="detallesGrabacion/reproduccionGrabacion" 
            options={{ 
              href: null, // This hides the tab from the tab bar
              title: "reproduccionGrabacion",
            }} 
          />
      </Tabs>
    </View>
  );
}