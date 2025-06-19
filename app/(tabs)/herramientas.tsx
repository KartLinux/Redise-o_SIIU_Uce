import { Ionicons } from '@expo/vector-icons'; // For icons
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router'; // Import router for navigation
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors'; // Import the Colors constant

const { width } = Dimensions.get('window');

// =====================
// Componente de Botón de Aplicación
// =====================
interface AppButtonProps {
  label: string;
  icon: any; // Use 'any' for require path, or define a more specific image source type
  onPress: () => void; // Use onPress for navigation
}

function AppButton({ label, icon, onPress }: AppButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.appButton}
      onPress={onPress}
    >
      <Image source={icon} style={styles.appIcon} />
      <Text style={styles.appText}>{label}</Text>
    </TouchableOpacity>
  );
}

const HerramientasScreen = () => {
  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any} // Use gradientSecondary for the background
      style={styles.fullScreenBackground}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Herramientas',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="arrow-back" size={24} color={Colors.light.textSecondary} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={{
              color: Colors.light.textSecondary,
              fontWeight: 'bold',
            }}>
              Herramientas
            </Text>
          ),
        }}
      />

      <View style={styles.contentContainer}> {/* Container for the grid of buttons */}
        <View style={styles.appGrid}>
          {/* QUIN-IA Button */}
          <AppButton 
            label="QUIN-IA"
            icon={require('../../assets/images/layoutTabs/herramientas/quinia_icon.png')} // Placeholder: Replace with actual QUIN-IA icon
            onPress={() => router.push('/herramientas/quinia')} // Navigate to QUIN-IA screen
          />

          {/* EduChat Button */}
          <AppButton 
            label="EduChat"
            icon={require('../../assets/images/layoutTabs/herramientas/educhat_icon.png')} // Placeholder: Replace with actual EduChat icon
            onPress={() => router.push('/herramientas/educhat')} // Navigate to EduChat screen
          />

          {/* Ubícate Button */}
          <AppButton 
            label="Ubícate"
            icon={require('../../assets/images/layoutTabs/herramientas/ubicate_icon.png')} // Placeholder: Replace with actual Ubícate icon
            onPress={() => router.push('/herramientas/ubicate')} // Navigate to Ubícate screen
          />

          {/* Noticias Button */}
          <AppButton 
            label="Noticias"
            icon={require('../../assets/images/layoutTabs/herramientas/noticias_icon.png')} // Placeholder: Replace with actual Noticias icon
            onPress={() => router.push('/herramientas/noticias')} // Navigate to Noticias screen
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1, // Take up remaining space
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    // Adjust paddingTop if needed based on actual header height in your app
    paddingTop: 80, 
  },
  appGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 400, // Max width for the grid to keep it centered on larger screens
  },
  appButton: {
    backgroundColor: Colors.light.onBackground, // White background for app buttons
    width: (width / 2) - 40, // Roughly half screen width minus padding/margin
    height: (width / 2) - 40, // Make it square
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  appText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HerramientasScreen;
