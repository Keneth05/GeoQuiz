// app/_layout.tsx
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import 'react-native-reanimated';

import { useAuthentication } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from 'react';
import "../global.css";

export default function RootLayout() {

  const queryClient = new QueryClient()

  // es como un componente interno que maneja los fonts, la autenticacion y el splash
  const AppProvider = () => {

    //carga la fuente
    const [loaded] = useFonts({
          Roboto: require('../assets/fonts/RobotoCondensed-VariableFont_wght.ttf')
      });

      // se obtiene el valor del usuario y el estado de carga del zustand
      const user = useAuthentication(state => state.user)
      const loadingUser = useAuthentication(state => state.loadingUser)

      //Cuando ya se cargaron las fuentes y el usuario dejó de cargar, se oculta el splash
      useEffect(() => {
  
        // Mientras las fuentes o el usuario están cargando, no se muestra nada
      if (loaded && !loadingUser)
        SplashScreen.hideAsync();
  
    }, [loaded, loadingUser])
  
    if (!loaded || loadingUser) {
      return null;
    }
  
    if (!user)
      return <Slot screenOptions={{ headerShown: true }} />
    
    return <Slot />
  }


  // se envielve todo en QueryClientProvider para qeu React Query funcione
  return (
    <QueryClientProvider client={queryClient}>
          <AppProvider/>
    </QueryClientProvider>
    );
}
