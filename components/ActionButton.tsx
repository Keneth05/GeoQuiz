import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface RestarProps{
    onRestart: () => void;
}

const RestartButton = ({onRestart}: RestarProps) => {
    return (
        //boton que recibe como props la funcion de restart del hook de logica
        <View className='flex-row items-center justify-center mt-5'>
            <Pressable className='flex-1 items-center justify-center rounded-lg p-4 bg-Buttons'
            onPress={onRestart}
            >
                <Text className='font-bold text-xl text-Details'>Reiniciar</Text>
            </Pressable>
        </View>
    )
}

export default RestartButton