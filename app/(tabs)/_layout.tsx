import LogoutButton from '@/components/Logout';
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

const TabLayout = () => {


    return (
        <Tabs screenOptions={{
            headerShown:true,
            headerTintColor: 'white',
            tabBarActiveTintColor:'white',
            tabBarInactiveTintColor:'#6d6e6d',
            headerTitleAlign:'center',
            tabBarLabelStyle: {
                fontSize: 14,        
                fontWeight: 'bold', 
            },
            headerTitleStyle: {
                fontSize: 24,          
                fontWeight: 'bold',   
                color: 'white',     
            },
            headerStyle: {
                backgroundColor: '#15222F', 
            },
            tabBarStyle: {
                backgroundColor: '#15222F',             
            },
            headerRight: () => (<Image 
                                source={require('@/assets/images/Logo.png')}
                                style={{ width: 70, height: 95, marginRight: 15, marginBottom:5 }}
                                resizeMode='contain'
                                />),
            headerLeft: () => (
                <LogoutButton/>
            )
        }}>

            <Tabs.Screen name='CountryList/index' options={{headerTitle: 'GeoQuiz', tabBarLabel: 'Países', tabBarIcon:({color}) => <FontAwesome size={24} name='flag-checkered' color={color}/>}}/>
            
            <Tabs.Screen name='GameMode' options={{title:'Juegos', headerShown:false, tabBarIcon:({color}) => <FontAwesome size={24} name='gamepad' color={color}/>}}/>
        
        </Tabs> 
    )
}

export default TabLayout