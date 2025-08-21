import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import RestartButton from './ActionButton';
import CountryFlag from './CountryFlag';
import ScoreBar from './ScoreBar';

// propiedades que ocupa el componente para poder llamar o utilizar el resto de componentes en su interior
interface GameCardProps {
    title: string,
    correctAnswers: number,
    incorrectAnswers: number,
    flagUrl?: string,
    children: React.ReactNode;
    isLandscape: boolean; // si está vertical o horizontal
    onRestart: () => void;
}

const GameCard = ({ title, correctAnswers, incorrectAnswers, flagUrl, onRestart, children, isLandscape = false }: GameCardProps) => {

    return (
        <ScrollView>
            {/* titulo de la pantalla dependiendo del modo de juego, se define vistas de los modos */}
            <Text className='font-roboto font-bold text-xl text-center mb-3'>{title}</Text>
            <View className={`rounded-lg bg-CardBackground p-3 ${isLandscape ? 'flex-row gap-10 justify-evenly items-center' : 'flex-col gap-3'}`}>

                {/*los scorebars que aparecen arriba de la bandera si está en vertical */}
                <View className={isLandscape ? 'flex-[0.40]' : ''}>
                    {!isLandscape && (
                        <ScoreBar correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} />
                    )}
                    <CountryFlag flagURL={flagUrl} />
                </View>

                {/*los scorebars que aparecen arriba de las opciones o input si está en horizontal */}
                <View className={isLandscape ? 'flex-[0.45]' : ''}>
                    {isLandscape && (
                        <ScoreBar correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} />
                    )}

                    {/*Acá aparece o se renderiza lo que se le pase en cada pantalla de modo de juego, ya sea botones o el Input para la capital*/}
                    <View className=" flex-col ">
                        {children}
                    </View>

                </View>
            </View>
            {/*boton para reiniciar que llama a la funcion del hook con la logica*/}
            <View className='justify-center items-center'>
                <View className='w-72'>
                    <RestartButton onRestart={onRestart} />
                </View>
            </View>

        </ScrollView>


    )
}

export default GameCard