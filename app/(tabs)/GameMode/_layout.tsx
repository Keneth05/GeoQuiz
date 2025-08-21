import LogoutButton from '@/components/Logout'
import { COUNTRIES_KEY } from '@/hooks/useRequest'
import { getCountrys } from '@/services/CountrysRequest'
import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { useQueryClient } from '@tanstack/react-query'
import { router, Stack } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, View } from 'react-native'

const GameModeStack = () => {

    //esto de tanstack lo usé para precargar la lista de los paises para que las pantallas de easy y hard rendericen practicamnte al isntante sin necesidad de mostrar loaders, porque reutiliza el caché
    const quertClient = useQueryClient();

    useEffect(() => {
    //esto es una precarga de los paises, se ejecuta el getCuntrys una vez cuando se monta el stack y se guarda el resultado en caché
    //si la data ya eastá pues no la vuelve a pedir y si falla, no se rompe nada en esta vista, sino que aparece iserror de tanstack en las pantallas de easy y hard 
    quertClient.prefetchQuery({ queryKey: COUNTRIES_KEY, queryFn: getCountrys });
    
    }, [quertClient]);

    return (
        <Stack
            initialRouteName="index"
            screenOptions={{
                headerShown: true,
                headerShadowVisible: true,
                headerTitleStyle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#15222F' },
                headerTintColor: '#fff',
                headerLeft: ({ canGoBack, tintColor }) =>
                    canGoBack ? (
                        <View className='ms-3'>
                            <FontAwesome
                                name="circle-left"
                                size={24}
                                color={tintColor}
                                onPress={() => router.back()}
                            />
                        </View>

                    ) : null,
                headerRight: () => (
                    <View className='h-16 justify-center mb-2'>
                        <Image
                            source={require('@/assets/images/Logo.png')}
                            style={{ width: 70, height: 95 }}
                            resizeMode="contain"
                        />
                    </View>
                ),
            }}
        >
            <Stack.Screen name="index" options={{
                title: 'GeoQuiz', headerLeft: () => (
                    <LogoutButton />
                )
            }} />
            <Stack.Screen name="easyMode" options={{ title: 'GeoQuiz' }} />
            <Stack.Screen name="hardMode" options={{ title: 'GeoQuiz' }} />
        </Stack>
    )
}

export default GameModeStack