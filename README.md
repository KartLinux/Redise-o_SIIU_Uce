<div align="center" style="margin-bottom: 32px;">

  <h1 style="font-size:2.5em; color:#0A7EA4; font-family:'Segoe UI',Arial,sans-serif; margin-bottom: 0.2em;">
    MyAppNative
  </h1>

  <h2 style="font-size:1.2em; color:#002B5C; font-family:'Segoe UI',Arial,sans-serif; font-weight:400; margin-top:0;">
    Frontend móvil profesional inspirado en Figma para la Universidad Central del Ecuador
  </h2>

  <p style="max-width:600px; color:#333; font-size:1.1em; margin: 18px auto 0 auto; line-height:1.6;">
    <b>MyAppNative</b> es un proyecto <b>frontend</b> desarrollado en <b>React Native + Expo</b>, enfocado en la <b>replicación fiel de un diseño profesional realizado en Figma</b>.
    <br>
    El objetivo principal es demostrar la capacidad de construir interfaces móviles modernas, limpias y escalables, siguiendo <b>buenas prácticas de desarrollo</b>, arquitectura modular y uso eficiente de recursos visuales.
    <br>
    <br>
    <i>Este proyecto no implementa funcionalidades de backend ni lógica de negocio real, sino que se centra en la experiencia visual, la navegación y la estructura de componentes, sirviendo como base sólida para futuros desarrollos funcionales.</i>
  </p>

  <p style="color:#0096F0; font-size:1.1em; margin-top: 18px;">
    <b>Diseño, código limpio y experiencia de usuario, todo en un solo lugar.</b>
  </p>
</div>

<h2 align="center">Comparativo: Figma vs React Native</h2>

<table align="center" style="width:100%; border:none;">
  <thead>
    <tr>
      <th style="text-align:center; font-size:18px;">Pantalla</th>
      <th style="text-align:center; font-size:18px;">Diseño Figma</th>
      <th style="text-align:center; font-size:18px;">Implementación React Native</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><b>SIIU</b></td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/e53bb2ef-1469-4229-9067-8a5f7c5c6e38" alt="Siiu_Figma" width="220" style="border-radius:12px; box-shadow:0 2px 8px #0002;">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/acc853be-0175-4c40-805d-e6bc8962bb65" alt="Siiu_ReactNative" width="220" style="border-radius:12px; box-shadow:0 2px 8px #0002;">
      </td>
    </tr>
    <tr>
      <td align="center"><b>Inicio</b></td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/bffec9d8-de4d-42d0-b8fd-f4566ad05a8f" alt="Inicio_Figma" width="220" style="border-radius:12px; box-shadow:0 2px 8px #0002;">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/2c873a94-6896-4d47-b43a-340feb62bdc1" alt="Inicio_ReactNative" width="220" style="border-radius:12px; box-shadow:0 2px 8px #0002;">
      </td>
    </tr>
    <tr>
      <td align="center"><b>Home</b></td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/5f714543-c63b-41e3-aab5-64f2976f8dbc" alt="Home_Figma" width="220" style="border-radius:12px; box-shadow:0 2px 8px #0002;">
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/3f45ce8b-4f9c-4558-906a-5c9d87499d6a" alt="Home_ReactNative" width="220" style="border-radius:12px; box-shadow:0 2px 8px #0002;">
      </td>
    </tr>
  </tbody>
</table>

## 🛠️ Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone <URL_DEL_REPO>
   cd MyAppNative
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Inicia el proyecto:**
   ```bash
   npx expo start
   ```

4. **Escanea el QR** con la app de Expo Go o ejecuta en un emulador.

---

## 📦 Dependencias principales

- **React Native**: Framework principal.
- **Expo**: Plataforma para desarrollo y build.
- **expo-router**: Navegación basada en archivos.
- **expo-linear-gradient**: Gradientes en la UI.
- **react-native-reanimated**: Animaciones avanzadas.
- **@react-navigation/bottom-tabs**: Navegación tipo TabBar.
- **@expo/vector-icons**: Iconos vectoriales.
- **react-native-gesture-handler**: Gestos y toques avanzados.
- **react-native-safe-area-context**: Manejo de áreas seguras en dispositivos modernos.

### Instalación de dependencias (si agregas el proyecto desde cero):

```bash
npm install expo expo-router expo-linear-gradient react-native-reanimated @react-navigation/bottom-tabs @expo/vector-icons react-native-gesture-handler react-native-safe-area-context
```

> **Nota:** Si usas Yarn, reemplaza `npm install` por `yarn add`.

---

## 🖼️ Recursos gráficos

- Todas las imágenes y logos están en la carpeta `assets/images/`.
- Los íconos y recursos de cada sección están organizados por funcionalidad.

---

## 🎨 Personalización

- Cambia los colores en `constants/Colors.ts` para adaptar la app a tu identidad visual.
- Los gradientes y estilos principales están centralizados para fácil edición.

---

## 📋 Notas de desarrollo

- El proyecto sigue buenas prácticas de React Native y Expo.
- Navegación gestionada con `expo-router`.
- Animaciones de audio y UI usando `react-native-reanimated` y `Animated`.
- Código modular, comentado y fácil de mantener.
- Las rutas y pantallas ocultas del TabBar están gestionadas en `app/(tabs)/_layout.tsx`.
- **Scripts útiles:**
  - `npm start` o `npx expo start`: Inicia el servidor de desarrollo.
  - `npm run android`: Ejecuta en emulador Android.
  - `npm run ios`: Ejecuta en emulador iOS (Mac).
  - `npm run web`: Ejecuta en navegador.

---

## 🤖 Funcionalidades IA

- **QUIN-IA:** Asistente virtual con menús inteligentes.
- **Centro QUIN-IA:** Herramientas de análisis, resumen, transcripción y simulación de exámenes.

---

## 📝 Licencia

Este proyecto es de uso académico y/o personal.  
Para uso comercial, contacta al autor.

---

## 👨‍💻 Créditos

Desarrollado por Root.  
Universidad Central del Ecuador.
