import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

// Datos de ejemplo (puedes reemplazar por tus datos reales)
const contacts = [
  { id: '1', name: 'Ana Torres', status: 'En línea' },
  { id: '2', name: 'Carlos Benavidez', status: 'Ocupado' },
  { id: '3', name: 'María López', status: 'Disponible' },
  { id: '4', name: 'Juan Pérez', status: 'Ausente' },
  { id: '5', name: 'Lucía Gómez', status: 'En línea' },
];

// Función para obtener las iniciales
const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

// Función para obtener el color del estado
type Estado = 'En línea' | 'Ocupado' | 'Disponible' | 'Ausente';
const getStatusColor = (status: Estado) => {
  if (status === 'En línea' || status === 'Disponible') return Colors.light.textoEstadoVerde;
  if (status === 'Ocupado') return Colors.light.textoEstadoRojo;
  return Colors.light.textoEstadoGris;
};

export default function ContactosScreen() {
  return (
    <View style={styles.container}>
      {/* Fondo gradiente */}
      <LinearGradient
        colors={Colors.light.gradientSecondary as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Text style={styles.title}>Contactos</Text>

      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={[Colors.light.fondoTarjetaContacto, Colors.light.bordeTarjetaContacto]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={[Colors.light.avatarFondoClaro, Colors.light.avatarFondoOscuro]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatar}
                >
                  <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
                </LinearGradient>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={[styles.status, { color: getStatusColor(item.status as Estado) }]}>{item.status}</Text>
              </View>
            </LinearGradient>
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
    paddingTop: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.secondary,
    marginLeft: 24,
    marginBottom: 16,
    letterSpacing: 1,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  cardWrapper: {
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: Colors.light.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.light.bordeTarjetaContacto,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    color: Colors.light.textoNombreContacto,
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
  },
  info: {
    flex: 1,
  },
  name: {
    color: Colors.light.textoNombreContacto,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 2,
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.9,
  },
});
