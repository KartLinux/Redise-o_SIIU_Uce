import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

// =====================
// Componente de Elemento de Calificación
// =====================
interface GradeItemProps {
  years: string;
  semesters: string;
  status: string;
  statusColor: string;
}

function GradeItem({ years, semesters, status, statusColor }: GradeItemProps) {
  return (
    <View style={styles.gradeItemContainer}>
      <View style={styles.gradeTextContainer}>
        <Text style={styles.gradeYears}>{years}</Text>
        <Text style={styles.gradeSemesters}>{semesters}</Text>
      </View>
      <Text style={[styles.gradeStatus, { color: statusColor }]}>{status}</Text>
    </View>
  );
}

export default function CalificacionesScreen() {
  // Datos de ejemplo para las calificaciones
  const gradesData = [
    { years: '2020-2020', semesters: '1ro y 2do Semestre', status: 'Aprobado', statusColor: Colors.light.textoEstadoVerde },
    { years: '2021-2021', semesters: '3er y 4to Semestre', status: 'Aprobado', statusColor: Colors.light.textoEstadoVerde },
    { years: '2022-2022', semesters: '5to y 6to Semestre', status: 'Aprobado', statusColor: Colors.light.textoEstadoVerde },
    { years: '2023-2024', semesters: '7mo y 8vo Semestre', status: 'En curso', statusColor: Colors.light.textoEstadoGris },
  ];

  return (
    <View style={styles.container}>
      {/* Fondo gradiente */}
      <LinearGradient
        colors={Colors.light.gradientSecondary as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Encabezado */}
      <View style={styles.header}>
        {/* Botón de retroceso */}
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <Image source={require('../../assets/images/layoutTabs/carnet/back_arrow.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Título del encabezado */}
        <Text style={styles.headerTitle}>Calificaciones</Text>
        {/* Botón de ayuda/pregunta (opcional) */}
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={require('../../assets/images/layoutTabs/carnet/question_mark.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Contenedor principal de la lista de calificaciones */}
        <View style={styles.gradesListCard}>
          {/* Encabezados de la tabla */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderTextYears}>AÑOS</Text>
            <Text style={styles.tableHeaderTextStatus}>ESTADO</Text>
          </View>
          {/* Línea divisoria */}
          <View style={styles.divider} />

          {/* Renderizar los elementos de calificaciones */}
          {gradesData.map((item, index) => (
            <React.Fragment key={index}>
              <GradeItem 
                years={item.years}
                semesters={item.semesters}
                status={item.status}
                statusColor={item.statusColor}
              />
              {index < gradesData.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Contenedor de botones de descarga */}
        <View style={styles.downloadButtonsContainer}>
          {/* Botón Descargar Malla */}
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadButtonLabel}>DESCARGAR</Text>
            <Text style={styles.downloadButtonText}>MALLA</Text>
          </TouchableOpacity>
          {/* Botón Descargar Historial */}
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadButtonLabel}>DESCARGAR</Text>
            <Text style={styles.downloadButtonText}>HISTORIAL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
  },
  headerIcon: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  gradesListCard: {
    backgroundColor: Colors.light.onBackground,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: Colors.light.textSecondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableHeaderTextYears: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    flex: 2,
  },
  tableHeaderTextStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.bordeTarjetaContacto,
    marginVertical: 10,
  },
  gradeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  gradeTextContainer: {
    flex: 2,
  },
  gradeYears: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
  },
  gradeSemesters: {
    fontSize: 12,
    color: Colors.light.label,
  },
  gradeStatus: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
  },
  downloadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    maxWidth: 400,
  },
  downloadButton: {
    backgroundColor: Colors.light.onBackground,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '48%',
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  downloadButtonLabel: {
    fontSize: 12,
    color: Colors.light.label,
    fontWeight: 'bold',
  },
  downloadButtonText: {
    fontSize: 18,
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
