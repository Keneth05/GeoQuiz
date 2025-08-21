import { CountryList } from "@/interfaces/Country.interface";
import { getCountrys } from "@/services/CountrysRequest";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// es una clave reutilizable para el caché de los paises
export const COUNTRIES_KEY = ['countries'] as const;

export function useCountriesQuery() {
    return useQuery<CountryList[]>({ // basicamente que lo que devuelve el query es un arreglo de CountryList
        queryKey: COUNTRIES_KEY, // es una llave para identificar la consulta para poder hacer caché, compartir entre pantallas los datos
        queryFn: getCountrys, // es la funcion que se hace con axios que basicamente se encarga de traer los paises
        staleTime: 5 * 60 * 1000, //tiempo que los datos se consideran frescos
        gcTime: 30 * 60 * 1000, //el tiempo que los datos van a estar en caché despues de que nadie los utilice 
        placeholderData: keepPreviousData, //Mostrar datos previos mienteas se llega la respuesta nueva
        refetchOnWindowFocus: true, // si el query o los resultados no están frescos, hace refetch, si están frescos no hace nada
        retry: 2, //2 intentos automaticos si el fetch falla, si despues de esos dos intentos sigue fallando, manda error a pantalla
    
    });
}