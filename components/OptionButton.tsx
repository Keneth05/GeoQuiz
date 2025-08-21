import React from 'react';
import { Pressable, StyleProp, Text, ViewStyle } from 'react-native';

// tipos que pueden ser los botones
export type OptionsType = "default" | "correct" | "incorrect";

// Props que se le pasan al boton individual
interface OptionButtonProps {
    label: string;
    onPress: () => void;
    buttonType: OptionsType;
    containerStyle?: StyleProp<ViewStyle>
}

const OptionButton = ({ label, onPress, buttonType = "default", containerStyle }: OptionButtonProps) => {

    // dependiendo del tipo de boton, se da un color al backgound, colores definidos en el nativeWind
    const backGroundButton = buttonType === "correct" ? "bg-Correct"
        : buttonType === "incorrect" ? "bg-Incorrect"
            : "bg-Details"

    return (
        <Pressable onPress={onPress} style={containerStyle} className={`rounded-xl p-4 ${backGroundButton}`}>
            <Text className='text-xl text-black text-center font-roboto font-bold'>{label}</Text>
        </Pressable>


    )
}

export default OptionButton