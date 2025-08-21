import { useAuthentication } from '@/context/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';

const LogoutButton = () => {

    const logout = useAuthentication(state => state.logout)

    const router = useRouter();

    //boton para cerrar sesion que redirige al login
    return (
        <Pressable
            className='ms-5 rounded-lg p-1 border-2 border-white'
            onPress={async () => {
                await logout();
                router.replace("/");
            }}>
            
            <Text className='text-xl font-roboto font-bold text-white'> <FontAwesome size={20} name='person-walking-arrow-right'/></Text>
        </Pressable>
    );
}

export default LogoutButton