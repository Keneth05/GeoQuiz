import ModalInfo from '@/components/ModalInfo'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'

const GameMode = () => {

    //estados para manejar si mostrar el modal y para el modo de juego
    const [modalVisible, setModalVisible] = useState(false)
    const [actualMode, setActualMode] = useState<string>('easy')

    //metodo para manejar el mostrado y que modo
    const handleModal = (mode: 'easy' | 'hard') => {
        setActualMode(mode);
        setModalVisible(true);
    };

    //definir que mensaje se va mostrar dependiendo del modo de juego que el usuario escoje 
    const getMessage = () => {
        if (actualMode === 'easy') {
            return 'En el Modo Fácil tendrás en pantalla una bandera de un pais al azar, contando con 4 opciones posibles de las cuales solo 1 es la correcta, debe de adivinar de que país se trata la bandera presentada';
        }else if(actualMode === 'hard'){
            return 'En el Modo Fácil tendrás en pantalla una bandera de un pais al azar, en este modo deberá de digitar la capital del país que corresponda la bandera presentada';
        }

        return '';
    }

    return (
        <View className='p-10 h-full flex-col justify-center'>

            <View className='mb-6'>
                <Text className='text-center text-4xl mb-3 font-roboto font-bold'>Zona de Juegos</Text>
                <Text className='text-center text-2xl font-roboto font-semibold'>Seleccione un Modo de Juego</Text>
            </View>

            <View className='mx-2'>
                <View className='flex flex-row justify-center'>
                    <Pressable className='w-72 p-3 rounded-lg bg-Buttons active:opacity-90 mt-1 mx-5' onPress={() => router.push('/GameMode/easyMode')}>
                        <Text className='text-2xl text-white text-center font-roboto'>Modo Fácil</Text>
                    </Pressable>

                    {/* Al presionar, se tiene por defecto el mostrar en true, entonces solo le paso el modo de juego para definir el texto */}
                    <Pressable className='w-14 p-3 rounded-full bg-Buttons active:opacity-90 mt-1' onPress={() => handleModal('easy')}>
                        <Text className='text-2xl text-white text-center font-roboto'>?</Text>
                    </Pressable>
                </View>
                
                <View className='flex flex-row justify-center mt-5'>
                    <Pressable className='w-72 p-3 rounded-lg bg-Buttons active:opacity-90 mt-1 mx-5' onPress={() => router.push('/GameMode/hardMode')}>
                        <Text className='text-2xl text-white text-center font-roboto'>Modo Difícil</Text>
                    </Pressable>

                    {/* Al presionar, se tiene por defecto el mostrar en true, entonces solo le paso el modo de juego para definir el texto */} 
                    <Pressable className='w-14 p-3 rounded-full bg-Buttons active:opacity-90 mt-1' onPress={() => handleModal('hard')}>
                        <Text className='text-2xl text-white text-center font-roboto'>?</Text>
                    </Pressable>
                </View>
            </View>

            {/* Modal, el title es depende del modo, con ternario */}
            <ModalInfo
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={actualMode === 'easy' ? 'Modo Fácil' : 'Modo Difícil'}
                message={getMessage()}
            />
        </View>
    )
}

export default GameMode