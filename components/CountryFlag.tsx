import React from 'react';
import { Image, Text, View } from 'react-native';

//props que recibe la bandera, en este caso solo la URL
interface FlagProps{
    flagURL?: string;
}

const CountryFlag = ({ flagURL }: FlagProps) => {
    return (
        // contenedor para redondear el contenedor
        //si existe bandera, renderiza la bandera con la url de las props, s no hay, muestra un mensaje de Bandera no disponible
        <View className="mb-3 rounded-2xl overflow-hidden border-2">
            
            {flagURL ? (
                <Image
                    source={{ uri: flagURL }}
                    resizeMode="stretch"
                    className="w-full h-44"
                />
            ) : (
                <View className="w-full h-40 items-center justify-center">
                    <Text className="text-Details text-xl font-semibold">Bandera no disponible</Text>
                </View>
            )}
        </View>
    );
}

export default CountryFlag