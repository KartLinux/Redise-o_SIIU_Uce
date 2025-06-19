import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // For icons
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router'; // Assuming expo-router for header and navigation
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors'; // Import the Colors constant

const TramitesScreen = () => {
  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any} // Use gradientSecondary for the background, cast to any to resolve TypeScript error
      style={styles.fullScreenBackground}
    >
      <Stack.Screen
        options={{
          headerShown: true, // Show the header
          title: 'Tramites', // Header title
          headerTransparent: true, // Make header transparent to blend with gradient
          headerLeft: () => (
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="arrow-back" size={24} color={Colors.light.textSecondary} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="help-circle-outline" size={24} color={Colors.light.textSecondary} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: Colors.light.textSecondary, // Header title color
            fontWeight: 'bold',
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* Section for Academic Procedures */}
          <Text style={styles.sectionTitle}>Académicos</Text>

          {/* List Item: Retiro voluntario */}
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Retiro voluntario</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
          </TouchableOpacity>
          {/* Divider line */}
          <View style={styles.divider} />

          {/* List Item: Cambio de Carrera */}
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Cambio de Carrera</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
          </TouchableOpacity>
          {/* Divider line */}
          <View style={styles.divider} />

          {/* List Item: Retiro de Asignaturas */}
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Retiro de Asignaturas</Text>
            <View style={styles.listItemRightContent}>
              <MaterialCommunityIcons name="cube-outline" size={20} color={Colors.light.label} />
              <Text style={styles.anyoneText}>Anyone</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
            </View>
          </TouchableOpacity>
          {/* Divider line */}
          <View style={styles.divider} />

          {/* List Item: Actualización de Datos */}
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Actualización de Datos</Text>
            <View style={styles.listItemRightContent}>
              <MaterialCommunityIcons name="cube-outline" size={20} color={Colors.light.label} />
              <Text style={styles.anyoneText}>Anyone</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
            </View>
          </TouchableOpacity>
          {/* Divider line */}
          <View style={styles.divider} />

          {/* List Item: Becarios */}
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Becarios</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
          </TouchableOpacity>
          {/* Divider line */}
          <View style={styles.divider} />

          {/* List Item: Titulación */}
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Titulación</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
          </TouchableOpacity>
          {/* Divider line */}
          <View style={styles.divider} />

          {/* List Item: Mesa de Ayuda */}
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Mesa de Ayuda</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.label} />
          </TouchableOpacity>
          {/* Divider line (last item might not need a divider depending on design, but added for consistency) */}
          <View style={styles.divider} />

          {/* Advanced Configuration Button */}
          <TouchableOpacity style={styles.advancedConfigButton}>
            <Text style={styles.advancedConfigButtonText}>Configuracion avanzada</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1, // Take full screen
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 100, // Adjust this based on your header height to prevent content from going under it
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.surface, // Background color for the main content area
    borderTopLeftRadius: 30, // Rounded top corners
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerIcon: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.textSecondary, // Color for section titles
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  listItemText: {
    fontSize: 16,
    color: Colors.light.textSecondary, // Color for list item text
  },
  listItemRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  anyoneText: {
    fontSize: 14,
    color: Colors.light.label, // Color for "Anyone" text
    marginRight: 5,
    marginLeft: 5, // Add some space between icon and text
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.disabled, // Color for divider lines
    marginVertical: 1, // Small vertical margin for dividers
  },
  advancedConfigButton: {
    backgroundColor: Colors.light.disabled, // Gray background for the button
    paddingVertical: 15,
    borderRadius: 25, // Rounded corners for the button
    alignItems: 'center',
    marginTop: 30, // Margin from the last list item
    marginBottom: 20, // Margin from the bottom
  },
  advancedConfigButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.textSecondary, // Text color for the button
  },
});

export default TramitesScreen;
