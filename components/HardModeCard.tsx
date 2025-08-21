import React, { useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";

import GameCard from "@/components/GameCard";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useCountriesQuery } from '@/hooks/useRequest';
import HardInput from "./HardInput";

export default function HardModeCard() {

    //obtener las medidas y saber si está vertical o horizontal
    const { width, height } = useWindowDimensions()
    const isLandscape = width > height

    // se traen los paises de la peticion con tanstack/axios
    const { data: countries = [] } = useCountriesQuery();

    // se trae la logica del juego pasando como parametros que el modo es HARD y se van a preguntar capiatles, tambien el teimpo quese durará para que salga la siguiente pregunta
    const gameLogic = useGameLogic(countries, {mode: "hard", question: "CountryCapital",autoAdvanceTime: 1200});
    
    //saber si ya se respondio, para bloquear el input 
    const [answer, setAnswer] = useState("");

    return (
        <View className="flex-1 p-4 bg-AppBackground">
            <GameCard
                title={`Adivina la capital de ${gameLogic.actualCountry?.name.common}`}
                correctAnswers={gameLogic.correctCount} //respuestas correctas
                incorrectAnswers={gameLogic.incorrectCount} //respuestas incorrectas
                flagUrl={gameLogic.flagURL} //la URL de la bandera del pais escogido randommente 
                onRestart={() => { // se llama a la funcion de restar del hook de la logica y se pone el answer en "" para limpiar el input
                    setAnswer("");
                    gameLogic.restart();
                }}
                isLandscape={isLandscape} //saber si es horizontal o no, para cambiar el diseño en el GAMECARD component
            >
                <HardInput
                    value={answer} //se pasa lo que el usuario escribe en input
                    onChangeText={setAnswer} //ir viendo en tiempo real lo que se escribe 
                    answered={gameLogic.answered} //para bloquear el input
                    onConfirm={(userAnswer) => {
                        gameLogic.submitAnswer(userAnswer); // se llama a funcion para confirmar la respuesta y se pone el input vacio 
                        setAnswer("");
                    }}
                />

                {gameLogic.answered ? (// si la ronda está respondida, se muestra cual es la respuesta correcta, sino no muestra nada
                    <Text className="text-center text-Details mt-2 text-xl font-roboto font-bold">
                        Respuesta correcta: {gameLogic.correctAnswerDisplay}
                    </Text>
                ) : null}
            </GameCard>
        </View>
    );
}