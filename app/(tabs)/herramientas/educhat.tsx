import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const { width } = Dimensions.get('window');

// Tipo flexible para los mensajes
interface Message {
  type: 'bot' | 'user';
  content: string;
  buttons?: { text: string; action: string }[];
  showInput?: boolean;
  isSystem?: boolean;
}

// Conversación estructurada para evitar hardcode
const conversationFlow: Record<string, { message: string; buttons?: { text: string; action: string }[]; showInput?: boolean }> = {
  initial: {
    message: 'Hola Alex, ¿Cómo estás? ¿A quién deseas mandar el mensaje?',
    buttons: [
      { text: 'Materia', action: 'showSubjects' },
    ],
  },
  showSubjects: {
    message: 'Ingresa la materia para comenzar la conversación sobre dudas, tareas o temas específicos.',
    buttons: [
      { text: '1. Seguridad Informática', action: 'subject1' },
      { text: '2. Inteligencia Artificial', action: 'subject2' },
      { text: '3. Administración de Proyectos de TI', action: 'subject3' },
      { text: '4. Arquitectura Empresarial', action: 'subject4' },
      { text: '5. Minería de Datos', action: 'subject5' },
      { text: '6. Ética Profesional y Legislación en TI', action: 'subject6' },
    ],
  },
  subject1: {
    message: 'Hola! Soy QUIN-IA, ¿Cómo puedo ayudarte?',
    buttons: [
      { text: 'Menú Principal', action: 'showSubjects' },
    ],
    showInput: true,
  },
  // Puedes agregar más subjects aquí si quieres respuestas diferentes
};

const EduchatScreen = () => {
  // Estados para manejar el flujo de la conversación
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: conversationFlow.initial.message, buttons: conversationFlow.initial.buttons },
  ]);
  const [currentButtons, setCurrentButtons] = useState<{ text: string; action: string }[]>(conversationFlow.initial.buttons || []);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Maneja el click de los botones de opciones
  const handleButtonClick = (action: string) => {
    const nextStep = conversationFlow[action];
    if (nextStep) {
      setMessages(prev => ([
        ...prev,
        { type: 'bot', content: nextStep.message, buttons: nextStep.buttons, showInput: nextStep.showInput },
      ]));
      setCurrentButtons(nextStep.buttons || []);
    }
    // Scroll automático
    setTimeout(() => {
      if (scrollViewRef.current) scrollViewRef.current.scrollToEnd({ animated: true });
    }, 100);
  };

  // Maneja el envío de mensajes del usuario
  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages(prev => ([
        ...prev,
        { type: 'user', content: inputText.trim() },
        { type: 'bot', content: 'Reenviando...', isSystem: true },
      ]));
      setInputText('');
      setCurrentButtons([]); // Oculta botones tras enviar
      setTimeout(() => {
        if (scrollViewRef.current) scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);

      // Después de 1 segundo, mostrar mensaje de confirmación y quitar 'Reenviando...'
      setTimeout(() => {
        setMessages(prev => {
          // Elimina el último mensaje 'Reenviando...' y agrega el de confirmación
          const filtered = prev.filter((msg, idx) => !(msg.isSystem && msg.content === 'Reenviando...' && idx === prev.length - 1));
          return [
            ...filtered,
            { type: 'bot', content: '¡Mensaje enviado con éxito! ¿En qué más puedo ayudarte?', buttons: currentButtons, showInput: true },
          ];
        });
      }, 1000);
    }
  };

  // Scroll automático al agregar mensajes
  useEffect(() => {
    if (scrollViewRef.current) scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  // El input debe estar visible siempre, excepto si el último mensaje es 'Reenviando...'
  const lastMsg = messages[messages.length - 1];
  const showInput = !(lastMsg && lastMsg.isSystem && lastMsg.content === 'Reenviando...');

  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any}
      style={styles.fullScreenBackground}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'EduChat',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={Colors.light.textSecondary} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: Colors.light.textSecondary,
            fontWeight: 'bold',
          },
        }}
      />
      <View style={styles.chatContainer}>
        <ScrollView
          contentContainerStyle={styles.messagesContainer}
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((msg, idx) => (
            <View
              key={idx}
              style={msg.type === 'bot' ? styles.botMessageContainer : styles.userMessageContainer}
            >
              {msg.type === 'bot' && (
                <View style={styles.avatarBot} />
              )}
              <View style={msg.type === 'bot' ? styles.botBubble : styles.userBubble}>
                <Text style={msg.type === 'bot' ? styles.botText : styles.userText}>{msg.content}</Text>
                {/* Renderiza botones si existen */}
                {msg.buttons && msg.buttons.length > 0 && (
                  <View style={styles.buttonContainer}>
                    {msg.buttons.map((button, bidx) => (
                      <TouchableOpacity
                        key={bidx}
                        style={styles.optionButton}
                        onPress={() => handleButtonClick(button.action)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.optionButtonText}>{button.text}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              {msg.type === 'user' && (
                <View style={styles.avatarUser} />
              )}
            </View>
          ))}
        </ScrollView>
        {/* Input siempre visible excepto cuando está reenviando */}
        {showInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Escríbeme..."
              placeholderTextColor={Colors.light.label}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="send" size={24} color={Colors.light.primary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

// Estilos responsivos y armoniosos
const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
  },
  headerIcon: {
    paddingHorizontal: 10,
  },
  chatContainer: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingBottom: 10,
    width: '100%',
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
    width: '100%',
  },
  userMessageContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginVertical: 5,
    width: '100%',
  },
  avatarBot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.avatarFondoClaro,
    marginRight: 8,
    marginLeft: 2,
    borderWidth: 1,
    borderColor: Colors.light.bordeTarjetaContacto,
  },
  avatarUser: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.primary,
    marginLeft: 8,
    marginRight: 2,
    borderWidth: 1,
    borderColor: Colors.light.bordeTarjetaContacto,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botBubble: {
    backgroundColor: Colors.light.surface,
    borderRadius: 15,
    padding: 10,
    maxWidth: width * 0.75,
    borderTopLeftRadius: 5,
    marginBottom: 2,
  },
  userBubble: {
    backgroundColor: Colors.light.primary,
    borderRadius: 15,
    padding: 10,
    maxWidth: width * 0.75,
    borderTopRightRadius: 5,
    marginBottom: 2,
  },
  botText: {
    color: Colors.light.textSecondary,
    fontSize: 16,
  },
  userText: {
    color: Colors.light.text,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 10,
    gap: 6,
  },
  optionButton: {
    backgroundColor: Colors.light.fondoTarjetaContacto,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: Colors.light.bordeTarjetaContacto,
    alignSelf: 'flex-start',
  },
  optionButtonText: {
    color: Colors.light.textSecondary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.light.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.light.label,
    width: '100%',
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.light.fondoTarjetaContacto,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    color: Colors.light.textSecondary,
    borderWidth: 1,
    borderColor: Colors.light.bordeTarjetaContacto,
  },
  sendButton: {
    backgroundColor: 'transparent',
    padding: 5,
  },
});

export default EduchatScreen; 