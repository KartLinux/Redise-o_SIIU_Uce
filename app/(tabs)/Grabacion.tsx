import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../constants/Colors';

// =====================
// Datos de ejemplo para las grabaciones
// =====================
const recordings = [
  { id: '1', title: 'Dispositivos Móviles', date: 'Martes 29-Abril-2025' },
  { id: '2', title: 'Dispositivos Móviles', date: 'Martes 29-Abril-2025' },
  { id: '3', title: 'Dispositivos Móviles', date: 'Martes 29-Abril-2025' },
  { id: '4', title: 'SI-Empresarial', date: 'Jueves 01-Mayo-2025' },
  { id: '5', title: 'Formación de Empresas', date: 'Jueves 01-Mayo-2025' },
  { id: '6', title: 'SI-Empresarial', date: 'Jueves 01-Mayo-2025' },
  { id: '7', title: 'Formación de Empresas', date: 'Jueves 01-Mayo-2025' },
  { id: '8', title: 'Dispositivos Móviles', date: 'Martes 06-Mayo-2025' },
];

// =====================
// Componente para cada grabación
// =====================
function RecordingItem({
  title,
  date,
  onPlay,
  onMenu,
}: {
  title: string;
  date: string;
  onPlay: () => void;
  onMenu: () => void;
}) {
  return (
    <View style={styles.recordingItem}>
      <TouchableOpacity style={styles.playButton} onPress={onPlay}>
        <Image
          source={require('../../assets/images/layoutTabs/Grabacion/play_audio.png')}
          style={styles.playIcon}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.recordingTitle}>{title}</Text>
        <Text style={styles.recordingDate}>{date}</Text>
      </View>
      <TouchableOpacity style={styles.menuButton} onPress={onMenu}>
        <Text style={styles.menuDots}>⋮</Text>
      </TouchableOpacity>
    </View>
  );
}

// =====================
// Menú de opciones para cada grabación
// =====================
function RecordingMenuModal({
  visible,
  onClose,
  onPlay,
  onShare,
  onDelete,
}: {
  visible: boolean;
  onClose: () => void;
  onPlay: () => void;
  onShare: () => void;
  onDelete: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.menuModal}>
          <TouchableOpacity style={styles.menuOption} onPress={onPlay}>
            <Text style={styles.menuOptionText}>Reproducir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={onShare}>
            <Text style={styles.menuOptionText}>Compartir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={onDelete}>
            <Text style={[styles.menuOptionText, { color: Colors.light.accentRed }]}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

// =====================
// Pantalla principal de Grabaciones
// =====================
export default function GrabacionScreen() {
  // Estado para el menú de opciones
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<null | typeof recordings[0]>(null);

  // Acciones del menú
  const handlePlay = () => {
    setMenuVisible(false);
    Alert.alert('Reproducir', `Reproduciendo: ${selectedRecording?.title}`);
  };
  const handleShare = () => {
    setMenuVisible(false);
    Alert.alert('Compartir', `Compartiendo: ${selectedRecording?.title}`);
  };
  const handleDelete = () => {
    setMenuVisible(false);
    Alert.alert('Eliminar', `Eliminando: ${selectedRecording?.title}`);
  };

  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any}
      style={styles.container}
    >
      {/* Header superior */}
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>👋 Hola Rubén,</Text>
          <Text style={styles.headerTitle}>Grabaciones</Text>
        </View>
        <Image
          source={require('../../assets/images/layoutTabs/perfil/perfil.png')}
          style={styles.avatar}
        />
      </View>

      {/* Banner superior */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../../assets/images/layoutTabs/Grabacion/nav_grabacion.png')}
          style={styles.bannerImage}
        />
        <View style={styles.bannerLabel}>
          <Text style={styles.bannerText}>10MO SEMESTRE</Text>
        </View>
      </View>

      {/* Lista de grabaciones */}
      <FlatList
        data={recordings}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RecordingItem
            title={item.title}
            date={item.date}
            onPlay={() =>
              router.push(
                { pathname: '/detallesGrabacion/DetalleGrabacion', params: { title: item.title, date: item.date, id: item.id } } as any
              )
            }
            onMenu={() => {
              setSelectedRecording(item);
              setMenuVisible(true);
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal de menú de opciones */}
      <RecordingMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onPlay={handlePlay}
        onShare={handleShare}
        onDelete={handleDelete}
      />
    </LinearGradient>
  );
}

// =====================
// Estilos
// =====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 40,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  greeting: {
    color: Colors.light.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  headerTitle: {
    color: Colors.light.textSecondary,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.avatarFondoClaro,
  },
  bannerContainer: {
    marginHorizontal: 18,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.light.surface,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  bannerImage: {
    width: 120,
    height: 60,
    resizeMode: 'cover',
  },
  bannerLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  recordingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.fondoTarjetaContacto,
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.light.bordeTarjetaContacto,
  },
  playButton: {
    marginRight: 10,
    backgroundColor: Colors.light.primary,
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  recordingTitle: {
    color: Colors.light.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  recordingDate: {
    color: Colors.light.label,
    fontSize: 12,
    marginTop: 2,
  },
  menuButton: {
    marginLeft: 10,
    padding: 6,
  },
  menuDots: {
    fontSize: 22,
    color: Colors.light.label,
    fontWeight: 'bold',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end',
  },
  menuModal: {
    backgroundColor: Colors.light.onBackground,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 18,
    paddingBottom: 30,
    elevation: 10,
  },
  menuOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.bordeTarjetaContacto,
  },
  menuOptionText: {
    fontSize: 17,
    color: Colors.light.textSecondary,
    fontWeight: '600',
  },
});
