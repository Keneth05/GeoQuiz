import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface InputProps{
    onSearch: (text: string) => void;
};

const SearchCountry = ({ onSearch }: InputProps) => {
    return (
        <>
            <Text className='text-4xl font-roboto font-extrabold text-center mb-2'>Listado de Países</Text>
            <View>
                <TextInput
                    placeholder="Buscar País..."
                    className="border p-4 rounded-md bg-white"
                    onChangeText={onSearch}
                />
            </View>
        </>
    );
};

export default SearchCountry