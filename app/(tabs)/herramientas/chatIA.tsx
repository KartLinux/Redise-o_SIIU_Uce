import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const { width } = Dimensions.get('window');

// Data de la conversación, estructurada para no hardcodear
const conversationData = {
  initial: {
    message: "Hola! Soy QUIN-IA, ¿Cómo estás? ¿Cómo puedo ayudarte?",
    buttons: [
      { text: "Menú Principal", action: "showPrincipalMenu" },
      { text: "Menú Adicional", action: "showAdditionalMenu" },
    ],
  },
  principalMenu: {
    message: "Hola! Soy QUIN-IA, tu asistente virtual y estoy aquí para ayudarte. Puedo asistirte con información sobre:\n\n1. Oferta académica 👨‍🎓\n2. Admisión 📝\n3. Contactos 📞\n4. Beneficios/servicios a estudiantes 🌟\n5. Nova\n\nRecuerda que estoy para apoyarte 24/7.",
    buttons: [], // No hay botones después de este menú en la imagen
  },
  additionalMenu: {
    message: "Hola! Soy QUIN-IA, tu asistente virtual y estoy aquí para ayudarte. Puedo asistirte con información sobre:\n\n1. Becas y financiamiento 💰\n2. Calendario académico 🗓️\n3. Vida universitaria 🎓\n4. Soporte tecnológico 🛠️\n5. Internacionalización 🌎\n\nRecuerda que estoy para apoyarte 24/7.",
    buttons: [], // No hay botones después de este menú en la imagen
  },
};

const ChatIAScreen = () => {
  const [currentMessage, setCurrentMessage] = useState(conversationData.initial.message);
  const [currentButtons, setCurrentButtons] = useState(conversationData.initial.buttons);
  const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user'; content: string; buttons?: { text: string; action: string; }[] }>>([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = React.useRef<ScrollView>(null); // Ref for ScrollView

  useEffect(() => {
    // Inicializar la conversación con el primer mensaje del bot
    setMessages([{ type: 'bot', content: currentMessage, buttons: currentButtons }]);
    // Scroll to bottom on initial load
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  const handleButtonClick = (action: string) => {
    if (action === "showPrincipalMenu") {
      setMessages(prevMessages => [...prevMessages, { type: 'bot', content: conversationData.principalMenu.message }]);
      setCurrentButtons(conversationData.principalMenu.buttons);
    } else if (action === "showAdditionalMenu") {
      setMessages(prevMessages => [...prevMessages, { type: 'bot', content: conversationData.additionalMenu.message }]);
      setCurrentButtons(conversationData.additionalMenu.buttons);
    }
    // Scroll to bottom after button click
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { type: 'user', content: inputText.trim() }]);
      setInputText('');
      // Aquí podrías añadir lógica para que el bot responda al mensaje del usuario
      // Scroll to bottom after sending message
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }
  };

  return (
    <LinearGradient
      colors={Colors.light.gradientSecondary as any}
      style={styles.fullScreenBackground}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'QUIN-IA',
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
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.messagesContainer}
          ref={scrollViewRef} // Assign ref to ScrollView
        >
          {messages.map((msg, index) => (
            <View key={index} style={msg.type === 'bot' ? styles.botMessageContainer : styles.userMessageContainer}>
              {msg.type === 'bot' && (
                <Image
                  source={require('../../../assets/images/layoutTabs/herramientas/quinia_icon.png')}
                  style={styles.avatar}
                />
              )}
              <View style={msg.type === 'bot' ? styles.botBubble : styles.userBubble}>
                <Text style={msg.type === 'bot' ? styles.botMessageText : styles.userMessageText}>
                  {msg.content}
                </Text>
                {msg.buttons && msg.buttons.length > 0 && (
                  <View style={styles.buttonContainer}>
                    {msg.buttons.map((button, btnIndex) => (
                      <TouchableOpacity
                        key={btnIndex}
                        style={button.text === "Menú Principal" ? styles.principalButton : styles.additionalButton}
                        onPress={() => handleButtonClick(button.action)}
                      >
                        <Text style={button.text === "Menú Principal" ? styles.principalButtonText : styles.additionalButtonText}>
                          {button.text}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Escríbeme..."
            placeholderTextColor={Colors.light.label}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage} // Permite enviar con el teclado
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color={Colors.light.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 80, // Ajustar para el header transparente
    justifyContent: 'flex-end',
  },
  headerIcon: {
    paddingHorizontal: 10,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  userMessageContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginVertical: 5,

  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.light.avatarFondoClaro,
  },
  botBubble: {
    backgroundColor: Colors.light.surface, // Fondo blanco para los mensajes del bot
    borderRadius: 15,
    padding: 10,
    maxWidth: width * 0.75, // Ancho máximo del 75% de la pantalla
    borderTopLeftRadius: 5,
  },
  userBubble: {
    backgroundColor: Colors.light.primary, // Color primario para los mensajes del usuario
    borderRadius: 15,
    padding: 10,
    maxWidth: width * 0.75,
    borderTopRightRadius: 5,
  },
  botMessageText: {
    color: Colors.light.textSecondary,
    fontSize: 16,
  },
  userMessageText: {
    color: Colors.light.text, // Texto blanco para los mensajes del usuario
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  principalButton: {
    backgroundColor: Colors.light.surface, // Gris claro
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.light.label,
    width: '40%',
  },
  additionalButton: {
    backgroundColor: Colors.light.background, // Turquesa/azul claro
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    width: '40%',
  },
  principalButtonText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  additionalButtonText: {
    color: Colors.light.text, // Blanco
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.light.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.light.label,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.light.fondoTarjetaContacto, // Fondo claro para el input
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

export default ChatIAScreen;
