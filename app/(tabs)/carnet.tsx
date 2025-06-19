import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function CarnetScreen() {
  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={Colors.light.gradientSecondary as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Header section */}
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <Image source={require('../../assets/images/layoutTabs/carnet/back_arrow.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Header title */}
        <Text style={styles.headerTitle}>Carnet Estudiantil</Text>
        {/* Help/Question mark button */}
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={require('../../assets/images/layoutTabs/carnet/question_mark.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Main card container */}
      <View style={styles.cardContainer}>
        {/* Student ID card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>CARNET ESTUDIANTIL DIGITAL</Text>
          {/* University logo */}
          <Image
            source={require('../../assets/images/layoutTabs/logoUce.png')}
            style={styles.universityLogo}
          />
          {/* Student photo placeholder */}
          <View style={styles.photoPlaceholder}>
            <Image
              source={require('../../assets/images/layoutTabs/perfil.png')}
              style={styles.studentPhoto}
            />
          </View>
          <Text style={styles.studentLabel}>Estudiante</Text>
          <Text style={styles.studentName}>MANUEL AGUSTÍN</Text>
          {/* Student details: CI / PAS */}
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>C.I. / PAS:</Text>
            <Text style={styles.detailValue}>17XXXXXXX</Text>
          </View>
          {/* Student details: Expiration Date (F.E.) */}
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>F.E:</Text>
            <Text style={styles.detailValue}>19 de enero de 2024</Text>
          </View>
        </View>

        {/* Download button */}
        <TouchableOpacity style={styles.downloadButton}>
          <Image source={require('../../assets/images/layoutTabs/carnet/download_icon.png')} style={styles.downloadIcon} />
          <Text style={styles.downloadButtonText}>Descargar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.textSecondary, // Using color from Colors.ts
  },
  headerIcon: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100, // Adjust to center the card visually
  },
  card: {
    backgroundColor: Colors.light.onBackground, // Using color from Colors.ts
    borderRadius: 15,
    paddingVertical: 15, // Reduced vertical padding for less height
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '90%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.secondary, // Already using color from Colors.ts
    marginBottom: 0,
  },
  universityLogo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10, // Slightly reduced margin
  },
  photoPlaceholder: {
    width: 100,
    height: 100, // Reduced height for the photo placeholder
    backgroundColor: Colors.light.surface, // Using color from Colors.ts
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10, // Slightly reduced margin
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.bordeTarjetaContacto, // Using color from Colors.ts
  },
  studentPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  studentLabel: {
    fontSize: 16,
    color: Colors.light.textSecondary, // Using color from Colors.ts
    marginBottom: 5,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textSecondary, // Using color from Colors.ts
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.light.label, // Using color from Colors.ts
  },
  detailValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.light.textSecondary, // Using color from Colors.ts
  },
  downloadButton: {
    backgroundColor: Colors.light.accentRed,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: Colors.light.accentRed,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  downloadIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: Colors.light.onBackground, // Using color from Colors.ts
    resizeMode: 'contain',
  },
  downloadButtonText: {
    color: Colors.light.onBackground, // Using color from Colors.ts
    fontSize: 16,
    fontWeight: 'bold',
  },
});
