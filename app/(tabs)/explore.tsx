import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const resources = [
  {
    id: '1',
    title: 'Resumen claro y explicativo',
    image: require('../../assets/images/layoutTabs/actividades/mente_binaria.png'),
  },
  {
    id: '2',
    title: 'Técnico y lo cotidiano',
    image: require('../../assets/images/layoutTabs/actividades/plagio.png'),
  },
  {
    id: '3',
    title: 'Resumen claro y explicativo',
    image: require('../../assets/images/layoutTabs/actividades/onenote.png'),
  },
  {
    id: '4',
    title: 'Resumen claro y explicativo',
    image: require('../../assets/images/layoutTabs/actividades/excel.png'),
  },
  {
    id: '5',
    title: 'Técnico y lo cotidiano',
    image: require('../../assets/images/layoutTabs/actividades/word.png'),
  },
  {
    id: '6',
    title: 'tos y analogias',
    image: require('../../assets/images/layoutTabs/actividades/pdf.png'),
  },
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      {/* Fondo gradiente */}
      <LinearGradient
        colors={Colors.light.gradientSecondary as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Header y buscador */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>12 Recursos</Text>
        <TouchableOpacity>
          <Text style={styles.headerAdd}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>

      {/* Filtro */}
      <View style={styles.filterRow}>
        <Text style={styles.filterIcon}>↕</Text>
        <Text style={styles.filterText}>Recientes</Text>
      </View>

      {/* Grid de recursos */}
      <FlatList
        data={resources}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  headerAdd: {
    fontSize: 28,
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 36,
    fontSize: 15,
    color: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 8,
    gap: 6,
  },
  filterIcon: {
    fontSize: 18,
    color: Colors.light.primary,
    marginRight: 4,
  },
  filterText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 6,
    alignItems: 'center',
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 13,
    color: '#222',
    textAlign: 'center',
    fontWeight: '500',
  },
});
