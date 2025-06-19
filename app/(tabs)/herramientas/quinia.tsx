import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const QuiniaScreen = () => {
  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any}
      style={styles.fullScreenBackground}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'QUIN-IA',
          headerTransparent: true,
          headerTitleStyle: {
            color: Colors.light.label, // Light text for the title
            fontWeight: 'bold',
            fontSize: 28, // Larger font size for the title
          },
          headerLeft: () => null, // Hide the back button as per image
        }}
      />
      <View style={styles.container}>
        {/* Hummingbird Image and Blue Circle */}
        <View style={styles.imageContainer}>
          <View style={styles.blueCircle} />
          <Image 
            source={require('../../../assets/images/layoutTabs/herramientas/quinia_icon.png')} // Placeholder: Replace with actual hummingbird image
            style={styles.hummingbirdImage}
          />
        </View>

        {/* List of words */}
        <View style={styles.wordList}>
          <Text style={styles.wordItem}>Sabiduría</Text>
          <Text style={styles.wordItem}>Identidad</Text>
          <Text style={styles.wordItem}>Libertad</Text>
          <Text style={styles.wordItem}>Esfuerzo</Text>
          <Text style={styles.wordItem}>Cambio</Text>
        </View>

        {/* Empezar Button */}
        <TouchableOpacity style={styles.startButton} onPress={() => router.push('/herramientas/splashScreenQuinia')}>
          <Text style={styles.startButtonText}>Empezar</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    marginTop: 0, // Adjust to move content up slightly towards the title
  },
  imageContainer: {
    width: 200, // Size of the container for the image and circle
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  blueCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.light.primary, // Blue color for the circle
    position: 'absolute',
    opacity: 0.8, // Slightly transparent as in the image
  },
  hummingbirdImage: {
    width: '110%', // Make the hummingbird larger than the circle
    height: '120%',
    resizeMode: 'contain',
    position: 'absolute', // Position over the circle
  },
  wordList: {
    marginBottom: 10,
    alignItems: 'center',
  },
  wordItem: {
    fontSize: 20,
    color: Colors.light.textSecondary, // Dark text for the words
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: Colors.light.primary, // Primary blue for the button
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.onBackground, // White text
  },
});

export default QuiniaScreen; 