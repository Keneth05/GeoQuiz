import Easy4Buttons from "@/components/Easy4Buttons";
import GameCard from "@/components/GameCard";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useCountriesQuery } from '@/hooks/useRequest';
import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";

const EasyMode = () => {

  const { width, height } = useWindowDimensions()
  const isLandscape = width > height
  const { data: countries = [] } = useCountriesQuery();
  const gameLogic = useGameLogic(countries, {mode: "easy",question: "Countryname",optionsCount: 4,autoAdvanceTime: 1000, });

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View className="flex-1  bg-AppBackground">
      <GameCard
        title="Adivina el nombre del país"
        correctAnswers={gameLogic.correctCount} //contador de las correctas
        incorrectAnswers={gameLogic.incorrectCount} //contador de las incorrectas
        flagUrl={gameLogic.flagURL} // bandera del pais seleccionado
        onRestart={() => {  // llamar al boton de reiniciar y setear la opcion seleccionada en null
          setSelected(null); 
          gameLogic.restart(); 
        }}
        isLandscape={isLandscape} // saber si está horizontal o vertical
      >
        <Easy4Buttons
          options={gameLogic.options} // 4 opciones que serán las que apareceran en pantalla
          selectedOption={selected} // opcion seleccionada
          answered={gameLogic.answered} //saber si ya se contestó algo
          correctAnswer={gameLogic.correctAnswerDisplay} // la opcion correcta
          onOptionSelect={(opt) => { // funcion que verifica si la respeusta es correcta y setea la opcion seleccionada 
            setSelected(opt);
            gameLogic.submitAnswer(opt);
          }}
        />
      </GameCard>
    </View>
  );
};

export default EasyMode;