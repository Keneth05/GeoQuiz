import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import OptionButton, { OptionsType } from './OptionButton';

//props que se le pasan a los botones
interface EasyButtonsProps {
    options: string[];
    correctAnswer: string;
    selectedOption: string | null;
    answered: boolean;
    onOptionSelect: (option: string) => void;
}

const Easy4Buttons = ({ options, correctAnswer, selectedOption, answered, onOptionSelect }: EasyButtonsProps) => {

    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    return (
        <View
        // para saber si poner los botones en lineas de dos, o hacia abajo
            className={
                isLandscape
                    ? "flex-row flex-wrap justify-between gap-3"
                    : "flex-col gap-2"
            }
        >
            {options.map((option) => {
                let buttonState: OptionsType = "default";
                if (answered) {
                    // si la opcion es igual a la opcion correcta, pinta el boton de verde
                    if (option === correctAnswer) {
                        buttonState = "correct"
                        //si la repsuesta que escogio el usuario es igual al contenido de la opcion lo pinta de rojo, no es la correcta, y para no pintar todas de rojo, sino solo la seleccionada
                    } else if (selectedOption === option) {
                        buttonState = "incorrect"
                    }
                }
                return (
                    <OptionButton
                        key={`${option}`}
                        label={option} //lo que dirá el boton es el texto de la opcion
                        buttonType={buttonState} // color que se le pondrá dependiedo de la respuesta
                        containerStyle={{ width: isLandscape ? '48%' : '100%' }} // si es horizontal botones lardos, vertical dos botones por linea
                        onPress={() => onOptionSelect(option)} // se le pasa la opcion para verificar el gane o no
                        
                    />

                );
            })}
        </View>
    )
}

export default Easy4Buttons