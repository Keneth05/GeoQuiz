import { useAuthentication } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Home = () => {
    const user = useAuthentication(state => state.user)
    const loadingUser = useAuthentication(state => state.loadingUser)

    // Mientras carga el estado de autenticación
    if (loadingUser) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // Si NO hay usuario ir al login
    if (!user) {
        return <Redirect href="/login" />;
    }

    // Si SÍ hay usuario ir a la lista de países 
    return <Redirect href="/CountryList" />;
};

export default Home;