import { Ionicons } from '@expo/vector-icons'; // For icons
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router'; // Assuming expo-router for header and navigation
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors'; // Import the Colors constant

const MatriculasScreen = () => {
  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any} // Use gradientSecondary for the background, cast to any to resolve TypeScript error
      style={styles.fullScreenBackground}
    >
      <Stack.Screen
        options={{
          headerShown: true, // Show the header
          title: 'Matriculas', // Header title
          headerTransparent: true, // Make header transparent to blend with gradient
          headerLeft: () => (
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="arrow-back" size={24} color={Colors.light.textSecondary} />
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
          {/* Top section with Pie Chart and Legend */}
          <View style={styles.chartSection}>
            {/* Placeholder for Pie Chart - Actual pie chart would require a charting library */}
            <View style={styles.pieChartPlaceholder}>
              {/* Example segments - these are visual representations and not functional */}
              <View style={[styles.pieSegment, { backgroundColor: Colors.light.secondary, transform: [{ rotate: '-45deg' }] }]} />
              <View style={[styles.pieSegment, { backgroundColor: Colors.light.label, transform: [{ rotate: '45deg' }] }]} />
              <View style={[styles.pieSegment, { backgroundColor: Colors.light.disabled, transform: [{ rotate: '135deg' }] }]} />
            </View>
            
            {/* Legend for the Pie Chart */}
            <View style={styles.legendContainer}>
              <Text style={styles.legendTitle}>Cupos</Text>
              <View style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: Colors.light.secondary }]} />
                <Text style={styles.legendText}>Llenos</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: Colors.light.label }]} />
                <Text style={styles.legendText}>Disponibles</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: Colors.light.disabled }]} />
                <Text style={styles.legendText}>Sin Matriculase</Text>
              </View>
            </View>
          </View>

          {/* Cards section */}
          <View style={styles.cardsContainer}>
            {/* Matriculados Card */}
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>MATRICULADOS</Text>
              <Text style={styles.cardValue}>5 000</Text>
            </View>
            {/* Generar Matrícula Card */}
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>GENERAR MATRÍCULA</Text>
              <Text style={styles.cardValue}>OK</Text>
            </View>
          </View>

          {/* Materias and Gratuidad Headers */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>MATERIAS</Text>
            <Text style={styles.sectionHeaderText}>GRATUIDAD</Text>
          </View>
          <View style={styles.divider} />

          {/* List of Subjects */}
          {/* Subject 1: Dispositivos Móviles */}
          <View style={styles.subjectItem}>
            <View>
              <Text style={styles.subjectTitle}>Dispositivos Móviles</Text>
              <Text style={styles.subjectStatus}>PERDIDA</Text>
            </View>
            <View style={styles.subjectPriceContainer}>
              <Text style={styles.subjectPrice}>$100</Text>
              <Text style={styles.subjectMonths}>10 mo</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Subject 2: Formación de Empresas */}
          <View style={styles.subjectItem}>
            <View>
              <Text style={styles.subjectTitle}>Formación de Empresas</Text>
              <Text style={styles.subjectStatus}>GRATUIDAD</Text>
            </View>
            <View style={styles.subjectPriceContainer}>
              <Text style={styles.subjectPrice}>$0</Text>
              <Text style={styles.subjectMonths}>10 mo</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Subject 3: Gestión de Empresas */}
          <View style={styles.subjectItem}>
            <View>
              <Text style={styles.subjectTitle}>Gestión de Empresas</Text>
              <Text style={styles.subjectStatus}>GRATUIDAD</Text>
            </View>
            <View style={styles.subjectPriceContainer}>
              <Text style={styles.subjectPrice}>$0</Text>
              <Text style={styles.subjectMonths}>10 mo</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Total Section */}
          <View style={styles.totalSection}>
            <View>
              <Text style={styles.totalTitle}>Total</Text>
              <Text style={styles.totalSubtitle}>3 MATERIAS</Text>
            </View>
            <View style={styles.subjectPriceContainer}>
              <Text style={styles.totalPrice}>$100</Text>
              <Text style={styles.totalMonths}>10 mo</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Bottom Green Button - Placeholder */}
          <TouchableOpacity style={styles.bottomButton}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.light.onBackground} />
            <Text style={styles.bottomButtonText}>Confirmar Matrícula</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 100, // Adjust this based on your header height
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: '90%',
  },
  headerIcon: {
    paddingHorizontal: 10,
  },
  chartSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  pieChartPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light.disabled, // Base for the chart
    position: 'relative',
    overflow: 'hidden',
    marginRight: 20,
  },
  pieSegment: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 50, // To make the segments appear as part of a circle
    // These transform properties are a very basic attempt to simulate slices, a real library would be better
  },
  legendContainer: {
    justifyContent: 'center',
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColorBox: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: Colors.light.onBackground, // White background for cards
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 12,
    color: Colors.light.label,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 5,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.label,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.disabled,
    marginVertical: 1,
  },
  subjectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  subjectTitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
  },
  subjectStatus: {
    fontSize: 12,
    color: Colors.light.label,
  },
  subjectPriceContainer: {
    alignItems: 'flex-end',
  },
  subjectPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
  },
  subjectMonths: {
    fontSize: 12,
    color: Colors.light.label,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.light.disabled,
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
  },
  totalSubtitle: {
    fontSize: 14,
    color: Colors.light.label,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
  },
  totalMonths: {
    fontSize: 14,
    color: Colors.light.label,
  },
  bottomButton: {
    backgroundColor: '#4CAF50', // A green color for the button, adjust as needed from Colors.ts if available
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bottomButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.onBackground, // White text color
    marginLeft: 10,
  },
});

export default MatriculasScreen;
