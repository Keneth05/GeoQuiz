import { CountryList } from '@/interfaces/Country.interface';
import React from 'react';
import { Image, Text, useWindowDimensions, View } from 'react-native';

interface CountryInformation {
    country: CountryList
}

const CountryCard = ({ country }: CountryInformation) => {

    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    return (
        <View className={`${isLandscape ? "flex-1 mb-0 mx-1" : ""}`}>
            <View className='flex-col mb-3'>
                <View className='pl-4 pt-0 rounded-lg flex-row bg-CardBackground border-2'>
                    <View>
                        <Image
                            className="w-40 h-36"
                            source={{ uri: country.flags.png }}
                            resizeMode="contain" />
                    </View>

                    <View>
                        <View className='mt-5 mx-5'>
                            <Text className='text-xl text-Details font-roboto'>{country.name.common}</Text>
                        </View>
                        <View className='mx-5 mt-4'>
                            <Text className='font-semi-bold text-lg font-roboto text-CardInformation'>{`Región: ${country.region}`}</Text>
                            <Text className='font-semi-bold text-lg font-roboto text-CardInformation'>{`Capital: ${country.capital}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>


    )
}

export default CountryCard
