import CountryCard from '@/components/CountryCard'
import SearchCountry from '@/components/SearchCountry'
import { useCountriesQuery } from '@/hooks/useRequest'
import { CountryList } from '@/interfaces/Country.interface'
import React, { useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, useWindowDimensions } from 'react-native'

const CountryListTotal = () => {
    const { data: countries = [], error, isError, isLoading:loading } = useCountriesQuery();


    const [countryName, setCountryName] = useState<string>('')

    const userSearch = countryName.trim().toLowerCase();
    const isSearching = userSearch.length > 0;

    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    // memo para memorizar en caché el resulado para no hacerlo en cada render
    const filteredCountries = useMemo<CountryList[]>(() => {
        if (!isSearching) return countries; // si no se está buscando nada, simplemente devuelve los paises
        return countries.filter((c) =>
            c.name.common.toLowerCase().includes(userSearch)
        );
    }, [countries, userSearch, isSearching]);

    if (loading) {
        return (
            <SafeAreaView className='flex flex-col justify-center'>
                <ActivityIndicator size="large" color="#0F0F88" style={{ marginTop: 200 }} />
                <Text className='text-center text-2xl'>Cargando países…</Text>
            </SafeAreaView>
        )
    }

    if (isError) {
        return (
            <SafeAreaView>
                <Text className='text-center text-red-500 text-xl'>{error instanceof Error ? error.message : 'Error al cargar los países'}</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className='flex p-3 bg-AppBackground'>
            <FlatList
                key={isLandscape ? "land" : "port"} // se asegura que se aplique bien el numColumns
                data={filteredCountries} // arreglo de paises a renderizar
                keyExtractor={(item) => item.cca3} //identificador unico del pais
                renderItem={({ item }) => <CountryCard country={item} />} // como se va a renderizar el pais, carta de pais en este caso
                showsVerticalScrollIndicator={false}
                removeClippedSubviews //para mejorar memoria, si un item está fuera de pantalla, lo saca de vistas
                initialNumToRender={10} //cuantos items se renderizan al inicio
                maxToRenderPerBatch={10} //Máximo de ítems que se renderizan en cada lote
                windowSize={4} 
                updateCellsBatchingPeriod={40}//tiempo de renderizacion entre cada lote de items
                numColumns={isLandscape ? 2 : 1} // segun la orientacion se renderizan en 1 o 2 colimnas
                columnWrapperStyle={ // estilo cuando hay varias columnas
                    isLandscape ? { justifyContent: "space-around", gap: 3 } : ""
                }
                ListHeaderComponent={ // componente que aparece arriba de la lista de paises
                    <View className="mb-3 bg-AppBackground">
                        <SearchCountry onSearch={setCountryName} />
                    </View>
                }
                stickyHeaderIndices={[0]} // header pegado arriba
                ListEmptyComponent={ // si no hay resultados en la busqueda
                    isSearching ? (
                        <View className="mt-10">
                            <Text className="text-2xl text-center font-roboto font-bold italic text-gray-500">
                                No hay países que coincidan con “{countryName.trim()}”.
                            </Text>
                        </View>
                    ) : null
                }
            />
        </SafeAreaView>
    )
}

export default CountryListTotal