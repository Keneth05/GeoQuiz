import { ModalInfoProps } from '@/interfaces/ModalInfo.interface'
import React from 'react'
import { Modal, Pressable, Text, View } from 'react-native'

//modal para visualizar la descripcion de los modos de juego, tanto facil como dificil
const ModalInfo = ({visible, onClose, title, message}: ModalInfoProps) => {
    return (
        <Modal
            visible={visible} // si se muestra el
            transparent
            animationType="fade"
            statusBarTranslucent 
            >
            <View className="flex-1 justify-center items-center bg-black/30">
                <View className="bg-white p-6 rounded-xl w-80">
                <Text className="text-xl font-roboto font-extrabold mb-2 text-black text-center ">{title}</Text>
                <Text className="text-base text-center font-roboto">{message}</Text>
                <Pressable className="mt-4 p-2 bg-Buttons rounded-lg" onPress={onClose}>
                    <Text className="text-white text-center font-roboto text-xl">Close</Text>
                </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default ModalInfo