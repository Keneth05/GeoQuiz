import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface InputProps {
    value: string;     // texto que escribe el usuario
    onChangeText: (userText: string) => void;  // actualiza el texto
    onConfirm: (userText: string) => void; // confirmar llama submitAnswer del hook de logica
    answered: boolean;  // para deshabilitar tras responder
};

export default function HardInput({value, onChangeText, onConfirm, answered}: InputProps) {
    
    //para que el boton de confirmar no esté habilitado si el usuario aun no escribe nada, ahorrandome validaciones
    const disabledButton = answered || value.trim().length === 0;

    return (
        <View className="w-full">
            <Text className="text-slate-200 mb-2 text-xl font-roboto font-bold">Capital:</Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                editable={!answered}
                placeholder={"Nombre de la capital..."}
                placeholderTextColor="#94a3b8"
                className={`rounded-xl p-4 bg-white text-slate-600 border ${answered ? "opacity-60" : ""}`}
            />

            <Pressable
                // onpres del boton para confirmar lo escrito
                onPress={() => onConfirm(value)}
                disabled={disabledButton} // desabilitar el boton si no se ha escrito nada, o habilitarlo si ya se escribio algo
                className={`mt-3 rounded-xl px-4 py-3 items-center justify-center ${disabledButton ? "bg-blue-600 opacity-60" : "bg-blue-600"
                    }`}
            >
                <Text className="text-white font-semibold">Confirmar</Text>
            </Pressable>
        </View>
    );
}