import React from 'react';
import { Text, View } from 'react-native';

interface ScoreBarProps{
    correctAnswers: number;
    incorrectAnswers: number;
}

const ScoreBar = ({correctAnswers, incorrectAnswers}: ScoreBarProps) => {
    return (
        // textos que indican si son aciertos o incorrectos, con un text que lleva el contador de cada uno, recibe como props los contadoes de cada cosa 
        <View className='flex flex-row justify-around mb-5'>
            <Text className='text-xl font-roboto font-bold text-Details'>
                Aciertos: <Text className='text-xl font-roboto font-bold text-Details'>{correctAnswers}</Text>
            </Text>
            <Text className='text-xl font-roboto font-bold text-Details'>
                Incorrectos: <Text className='text-xl font-roboto font-bold text-Details'>{incorrectAnswers}</Text>
            </Text>
        </View>
    )
}

export default ScoreBar