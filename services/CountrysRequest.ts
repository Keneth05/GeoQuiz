import { CountryList } from "@/interfaces/Country.interface";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export async function getCountrys(): Promise<CountryList[]> {

    const { data } = await axios.get<CountryList[]>(API_URL);
    return data;

    // no se agrega try catch para que el error lo obtenga el error de tanstack en el hook
}