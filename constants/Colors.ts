/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
// constants/Colors.ts

export const Colors = {
  light: {
    // Colores primarios
    primary: "#0096F0",
    secondary: "#000B30",

    // Textos
    text: '#ffffff',
    textSecondary: '#000000',
    label: '#666666',
    disabled: '#CCCCCC',

    // Fondos
    surface: '#F5F7FA',
    background: '#0A7EA4',
   
    // Degradados
    gradientPrimary: ["#0A7EA4", "#002B5C"],
    gradientSecondary: ["#536581", "#D4EFFF"],
    
    // Texto sobre fondo claro
    onBackground: "#FFFFFF",  

    // Rojo para botones y curvas decorativas (agregado por diseño de Login)
    accentRed: '#E50914',

    // Nuevos colores elegantes para contactos
    fondoTarjetaContacto: "#F7FAFF",         // Fondo claro para tarjetas
    bordeTarjetaContacto: "#E3EAFD",         // Borde sutil para tarjetas
    avatarFondoClaro: "#E6F0FA",             // Fondo claro para avatar
    avatarFondoOscuro: "#B3D1F7",            // Fondo oscuro para avatar
    textoNombreContacto: "#1A237E",          // Azul elegante para nombre
    textoEstadoVerde: "#43A047",             // Verde para estado "En línea"
    textoEstadoRojo: "#E53935",              // Rojo para estado "Ocupado"
    textoEstadoGris: "#757575",              // Gris para estado "Ausente" o "Desconectado"
  },

  dark: {
    // Colores primarios
    primary: "#0096F0",
    secondary: "#000B30",

    // Textos
    text: '#ECEDEE',
    label: '#888888',
    disabled: '#444444',

    // Fondos
    surface: '#121212',
    background: '#002B5C',

    // Degradados
    gradientPrimary: ["#002B5C", "#0A7EA4"],
    // Texto sobre fondo oscuro
    onBackground: "#ECEDEE", 
  },
};


