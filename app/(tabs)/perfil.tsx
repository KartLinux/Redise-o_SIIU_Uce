import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function PerfilScreen() {
  const [profile, setProfile] = useState({
    name: 'Roberth Loaiza',
    email: 'reloaiza@uce.edu.ec',
    phone: '0987456321',
    semester: '10',
    subjects: '5',
    career: 'SI',
    image: require('../../assets/images/layoutTabs/perfil/perfil.png'),
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  const handleEdit = () => {
    Alert.alert('Editar perfil', 'Aquí puedes implementar la edición del perfil.');
  };

  return (
    <View style={styles.container}>
      {/* Fondo gradiente */}
      <LinearGradient
        colors={Colors.light.gradientSecondary as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Card principal */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>My Profile</Text>
          <TouchableOpacity style={styles.editBtn} onPress={() => setShowLogoutModal(true)}>
            <Text style={styles.editBtnText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
        <Image source={profile.image} style={styles.avatar} />
        <Text style={styles.name}>{profile.name}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Teléfono</Text>
          <Text style={styles.value}>{profile.phone}</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile.semester}</Text>
            <Text style={styles.statLabel}>Semestre</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile.subjects}</Text>
            <Text style={styles.statLabel}>Materias</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile.career}</Text>
            <Text style={styles.statLabel}>Carrera</Text>
          </View>
        </View>
      </View>

      {/* Card de configuración */}
      <View style={styles.configCard}>
        <Text style={styles.configTitle}>Configuración</Text>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Idioma</Text>
          <TouchableOpacity onPress={() => setShowLanguageModal(true)}>
            <Text style={styles.configValue}>Español, English</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Modo Oscuro</Text>
          <TouchableOpacity onPress={() => setShowThemeModal(true)}>
            <Text style={styles.configValue}>Off</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de logout */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Logout</Text>
              <TouchableOpacity onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalMessage}>¿Estás segura de que quieres cerrar sesión?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => {/* lógica de logout */}}>
              <Text style={styles.modalButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de idioma */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCardLarge}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Lenguaje</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.languageGrid}>
              {['Español', 'English', 'Telugu', 'Kannada', 'Hindi', 'Malayalam', 'Punjabi', 'Bengali'].map((lang, idx) => (
                <TouchableOpacity key={lang} style={[styles.languageBtn, idx < 2 && styles.languageBtnSelected]}>
                  <Text style={[styles.languageBtnText, idx < 2 && styles.languageBtnTextSelected]}>{lang}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.modalFooterBtn} onPress={() => setShowLanguageModal(false)}>
              <Text style={styles.modalFooterBtnText}>Hecho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de tema */}
      <Modal
        visible={showThemeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowThemeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCardLarge}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Tema</Text>
              <TouchableOpacity onPress={() => setShowThemeModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.themeList}>
              {[
                { label: 'Oscuro', desc: 'Sistema SIIU_02', selected: true },
                { label: 'Claro', desc: 'Sistema del Dispositivo' },
                { label: 'Por defecto', desc: 'Sistema SIIU' },
                { label: 'Personalizado', desc: 'Tema User 1526987652165' },
              ].map((theme, idx) => (
                <TouchableOpacity key={theme.label} style={styles.themeRow}>
                  <View style={styles.themeTextContainer}>
                    <Text style={styles.themeLabel}>{theme.label}</Text>
                    <Text style={styles.themeDesc}>{theme.desc}</Text>
                  </View>
                  <View style={styles.themeRadioOuter}>
                    {theme.selected && <View style={styles.themeRadioInner} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.modalFooterBtn} onPress={() => setShowThemeModal(false)}>
              <Text style={styles.modalFooterBtnText}>Hecho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 24,
  },
  card: {
    backgroundColor: Colors.light.fondoTarjetaContacto,
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 20,
    shadowColor: Colors.light.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.textoNombreContacto,
  },
  editBtn: {
    backgroundColor: Colors.light.bordeTarjetaContacto,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  editBtnText: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textoNombreContacto,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: 2,
  },
  label: {
    color: Colors.light.secondary,
    fontWeight: 'bold',
    fontSize: 15,
    width: 80,
  },
  value: {
    color: Colors.light.textSecondary,
    fontSize: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.bordeTarjetaContacto,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.light.secondary,
    fontWeight: '600',
  },
  configCard: {
    backgroundColor: Colors.light.fondoTarjetaContacto,
    borderRadius: 18,
    marginHorizontal: 16,
    padding: 18,
    shadowColor: Colors.light.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 18,
  },
  configTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textoNombreContacto,
    marginBottom: 10,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  configLabel: {
    color: Colors.light.secondary,
    fontWeight: '600',
    fontSize: 15,
  },
  configValue: {
    color: Colors.light.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: Colors.light.secondary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  modalTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalClose: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  modalMessage: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: Colors.light.bordeTarjetaContacto,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: Colors.light.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalCardLarge: {
    width: '90%',
    backgroundColor: Colors.light.secondary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
    width: '100%',
  },
  languageBtn: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    margin: 4,
    minWidth: '42%',
    alignItems: 'center',
  },
  languageBtnSelected: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  languageBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  languageBtnTextSelected: {
    color: Colors.light.primary,
  },
  modalFooterBtn: {
    backgroundColor: Colors.light.bordeTarjetaContacto,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: '110%',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  modalFooterBtnText: {
    color: Colors.light.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  themeList: {
    width: '100%',
    marginVertical: 16,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff2',
  },
  themeTextContainer: {
    flex: 1,
  },
  themeLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  themeDesc: {
    color: '#cfd8dc',
    fontSize: 12,
  },
  themeRadioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
