import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

// Custom Dropdown Component
interface DropdownItem {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label: string;
  options: DropdownItem[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
}

function CustomDropdown({ label, options, selectedValue, onValueChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <View style={styles.pickerWrapper}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={() => setIsOpen(!isOpen)}>
        <Text style={[styles.dropdownHeaderText, !selectedValue && { color: Colors.light.label }]}>
          {selectedValue ? options.find(opt => opt.value === selectedValue)?.label : label}
        </Text>
        <Image
          source={require('../../assets/images/layoutTabs/horario/arrow_down.png')} // Placeholder for dropdown arrow
          style={styles.dropdownArrow}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownOptionsContainer}>
          {options.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={styles.dropdownOption}
              onPress={() => handleSelect(item.value)}
            >
              <Text style={styles.dropdownOptionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default function HorarioScreen() {
  const [selectedCarrera, setSelectedCarrera] = useState<string | null>(null);
  const [selectedParalelo, setSelectedParalelo] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showOptions, setShowOptions] = useState(true); // New state to control dropdown visibility
  const scrollViewRef = useRef<ScrollView>(null);

  // Effect to scroll to the end when results are shown
  useEffect(() => {
    if (showResults) {
      // Add a small delay to ensure content has rendered
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100); 
    }
  }, [showResults]);

  const carreras = [
    { label: 'Sistemas de Información', value: 'sistemas_informacion' },
    { label: 'Ingeniería Civil', value: 'ingenieria_civil' },
    { label: 'Informática', value: 'informatica' },
  ];

  const paralelos = [
    { label: '001', value: '001' },
    { label: '002', value: '002' },
    { label: '003', value: '003' },
  ];

  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  ];

  const handleSearch = () => {
    setShowResults(true);
    setShowOptions(false); // Hide options when searching
  };

  const handleShowOptions = () => {
    setShowOptions(true);
    setShowResults(false); // Hide results when showing options
  };

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
        <Text style={styles.headerTitle}>Horario</Text>
        {/* Help/Question mark button */}
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={require('../../assets/images/layoutTabs/carnet/question_mark.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Dropdown container */}
      {showOptions && (
        <View style={styles.dropdownsContainer}>
          {/* Carrera (Major) dropdown */}
          <CustomDropdown
            label="Carrera"
            options={carreras}
            selectedValue={selectedCarrera}
            onValueChange={setSelectedCarrera}
          />

          {/* Paralelo (Section) dropdown */}
          <CustomDropdown
            label="Paralelo"
            options={paralelos}
            selectedValue={selectedParalelo}
            onValueChange={setSelectedParalelo}
          />
        </View>
      )}

      {/* Search button / Show Options button */}
      {!showResults && showOptions && (
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text>Buscar</Text>
        </TouchableOpacity>
      )}

      {!showOptions && (
        <TouchableOpacity style={styles.showOptionsButton} onPress={handleShowOptions}>
          <Text style={styles.showOptionsButtonText}>Mostrar Opciones</Text>
        </TouchableOpacity>
      )}

      {/* Conditional rendering for results */}
      {showResults && (
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.resultsContainer}>
          {/* Schedule Table */}
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleInfoRow}>
              <Text style={styles.scheduleInfoLabel}>NIVEL:</Text>
              <Text style={styles.scheduleInfoValue}>DÉCIMO</Text>
            </View>
            <View style={styles.scheduleInfoRow}>
              <Text style={styles.scheduleInfoLabel}>PARALELO:</Text>
              <Text style={styles.scheduleInfoValue}>SIIS-001</Text>
            </View>

            <View style={styles.scheduleTable}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeaderCell, styles.timeColumn]}>Hora</Text>
                <Text style={styles.tableHeaderCell}>Lunes</Text>
                <Text style={styles.tableHeaderCell}>Martes</Text>
                <Text style={styles.tableHeaderCell}>Miércoles</Text>
                <Text style={styles.tableHeaderCell}>Jueves</Text>
                <Text style={styles.tableHeaderCell}>Viernes</Text>
              </View>

              {/* Table Rows */}
              {timeSlots.map((time, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.timeColumn]}>{time}</Text>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCell}></Text>
                </View>
              ))}

              {/* Example class entries */}
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.timeColumn]}>18:00</Text>
                <Text style={styles.tableCell} numberOfLines={2}>REDES DE INFORMACION AVANZADA - LAB</Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell} numberOfLines={2}>PROGRAMACIÓN PARA DISPOSITIVOS MÓVILES</Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.timeColumn]}>19:00</Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell} numberOfLines={2}>PROGRAMACIÓN PARA DISPOSITIVOS MÓVILES</Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell} numberOfLines={2}>REDES DE INFORMACION AVANZADA - LAB</Text>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.timeColumn]}>20:00</Text>
                <Text style={styles.tableCell} numberOfLines={2}>REDES DE INFORMACION AVANZADA - LAB</Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell} numberOfLines={2}>PROGRAMACIÓN PARA DISPOSITIVOS MÓVILES</Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell}></Text>
              </View>
            </View>

            {/* Download Button */}
            <TouchableOpacity style={styles.downloadButton}>
              <Image source={require('../../assets/images/layoutTabs/carnet/download_icon.png')} style={styles.downloadIcon} />
              <Text style={styles.downloadButtonText}>Descargar</Text>
            </TouchableOpacity>
          </View>

          {/* Order of Payment Card */}
          <View style={styles.orderCard}>
            <Image source={require('../../assets/images/layoutTabs/horario/calendar_icon.png')} style={styles.orderIcon} />
            <View style={styles.orderContent}>
              <Text style={styles.orderTitle}>Orden de Cobro</Text>
              <Text style={styles.orderText}>Materia Perdida:</Text>
              <Text style={styles.orderText}>Programación para</Text>
              <Text style={styles.orderText}>Dispositivos Móviles</Text>
              <View style={styles.orderAmountContainer}>
                <Text style={styles.orderAmount}>$ 100</Text>
                <Text style={styles.orderStatusCanceled}>Cancelado</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
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
    paddingTop: 20,
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
  dropdownsContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    zIndex: 1, // Ensure dropdowns are above other content
  },
  pickerWrapper: {
    backgroundColor: Colors.light.onBackground,
    borderRadius: 10,
    width: '85%',
    maxWidth: 350,
    marginBottom: 15,
    shadowColor: Colors.light.textSecondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: Colors.light.bordeTarjetaContacto,
    borderWidth: 1,
    position: 'relative',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
  },
  dropdownHeaderText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  dropdownArrow: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: Colors.light.textSecondary,
  },
  dropdownOptionsContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.light.onBackground,
    borderRadius: 10,
    borderColor: Colors.light.bordeTarjetaContacto,
    borderWidth: 1,
    marginTop: 50,
    zIndex: 1000,
  },
  dropdownOption: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.bordeTarjetaContacto,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  searchButton: {
    backgroundColor: Colors.light.onBackground,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    width: '85%',
    maxWidth: 350,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  showOptionsButton: {
    backgroundColor: Colors.light.onBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  showOptionsButtonText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  scheduleCard: {
    backgroundColor: Colors.light.onBackground,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    width: '100%',
    alignSelf: 'center',
  },
  scheduleInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  scheduleInfoLabel: {
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
    marginRight: 5,
  },
  scheduleInfoValue: {
    color: Colors.light.textSecondary,
  },
  scheduleTable: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.light.bordeTarjetaContacto,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.bordeTarjetaContacto,
  },
  tableHeaderCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: Colors.light.primary,
    color: Colors.light.onBackground,
    borderRightWidth: 1,
    borderRightColor: Colors.light.bordeTarjetaContacto,
  },
  timeColumn: {
    flex: 0.8,
  },
  tableCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    textAlign: 'center',
    color: Colors.light.textSecondary,
    borderRightWidth: 1,
    borderRightColor: Colors.light.bordeTarjetaContacto,
  },
  downloadButton: {
    backgroundColor: Colors.light.accentRed,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: Colors.light.accentRed,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    alignSelf: 'center',
    width: '80%',
  },
  downloadIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: Colors.light.onBackground,
    resizeMode: 'contain',
  },
  downloadButtonText: {
    color: Colors.light.onBackground,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderCard: {
    backgroundColor: Colors.light.fondoTarjetaContacto,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    width: '100%',
    alignSelf: 'center',
    borderColor: Colors.light.bordeTarjetaContacto,
    borderWidth: 1,
    marginTop: 20,
  },
  orderIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 15,
    backgroundColor: Colors.light.avatarFondoClaro,
    borderRadius: 10,
    padding: 5,
  },
  orderContent: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.textoNombreContacto,
    marginBottom: 5,
  },
  orderText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  orderAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  orderAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
  },
  orderStatusCanceled: {
    backgroundColor: Colors.light.textoEstadoVerde,
    color: Colors.light.onBackground,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
