import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface Country {
  cca3: string;
  name: { common: string };
  flags: { png?: string; svg?: string };
  capital?: string[];
}

type gameMode = "easy" | "hard";
type questionType = "Countryname" | "CountryCapital";

interface gameConfig {
  mode: gameMode;
  question: questionType;
  optionsCount?: number;
  autoAdvanceTime?: number;
}

//recive una lista de starings, hago un slice para no modiifcar la lista original y se hace un RANDOM para revolver las opciones 
function shuffle(list: string[]) {
  return list.slice().sort(() => Math.random() - 0.5);
}

//Basicamente aqui devuelvo la bandera del pais que se esté jugando 
//primero que todo, c: Country es el parametroi de la funcion y Country es el tipo de dato que se espera para c
//luego intenta devolver la bandera con .png si no existe, es null o undefined, intenta con SVG que es otra opcion para la imagen de la bandera
function getFlagURL(country: Country | null) {
  return country?.flags?.png || country?.flags?.svg || undefined;
}

function NormalizeText(text: string) {
  return text
    .trim()//quitar los espacios a los lados de la palabra
    .toLowerCase()// convertir todo a minuscula
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")// quita las tildes pero deja la tilde separada 
    .replace(/\s+/g, "");//remplaza las tildes que hay separadas por espacios vacios, quedando la letra sola sin tilde
}

export function useGameLogic(
  countries: Country[] | undefined,
  { mode, optionsCount = 4, autoAdvanceTime = 1200 }: gameConfig
) {

  const askingCapital = mode === "hard";
  const effectiveQuestion: questionType = askingCapital ? "CountryCapital" : "Countryname";

  //Aqui basicamente hago una lista de paises validos para el juego, teniendo en cuenta el tipo de la pregunta, sea nombres o capitales
  //el flujo seria que si no hay paises devuelve un arreglo vacio
  //si la pregunta es por capital, entonces solo incluye paises que tengan la capital definida y que sea arreglo
  //en cambio si la pregunta es el nombre del pais, se incuyen solo los paises que tengan un nobre definido, en esta caso por la api son practicametne todos, pero igual agregué ala validacion
  const validInfo = useMemo<Country[]>(() => {
    if (!countries?.length) return [];
    return effectiveQuestion === "CountryCapital"
      ? countries?.filter(country => Array.isArray(country.capital) && country.capital.length > 0)
      : countries?.filter(country => country.name.common);
  }, [countries, effectiveQuestion]);
  //memo porque evita filtrar en cada render, evita re renders y una referencia estable, cambia cuando hay nuevos datos, o cambia el modo de juego


  //estado para guardar el pais con el que se está jugando
  const [actualCountry, setActualCountry] = useState<Country | null>(null);

  //estado para guardar el "codigo" por asi decirlo del pais anterior, para que no se repita justo despues
  const [previousCca3, setPreviousCca3] = useState<string | null>(null);

  //estado para guardar las opciones para el modo facil, lo que va en los botones
  const [options, setOptions] = useState<string[]>([]);

  //estado para guardar si ya el usuario seleccionó una opcion o digitó una capital, basicamente si respondio
  const [answered, setAnswered] = useState(false);

  //estado para guardar un boleano de si es correcto lo que el usuario respondio o no, para usarlo en subir correctos o incorrectos
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  //estado para guardar un contador de los asiertos del usuario
  const [correctCount, setCorrectCount] = useState(0);

  //estado para guardar un contador de las respuestas incorrectas que tenga el usaurio 
  const [incorrectCount, setIncorrectCount] = useState(0);

  // es respuesta correcta sin nromalizar para mostrar en pantalla, con useref para que no cause re renders
  const correctAnswerReference = useRef<string>("");

  //el id del timeout, para evitar re renders y poder cancelar, limpiar el timer en restart
  const autoTimerRound = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Basicamente elige un pais aleatorio evitanto que este se repita comparando con el codigo del pais previo
  const chooseRandomCountry = useCallback((): Country | null => {
    if (!validInfo.length) return null; // si no hay nada en los valids, se retorna null porque no hay paises para escoger 
    let randomCountry = validInfo[Math.floor(Math.random() * validInfo.length)];
    let attempts = 0;
    //tiene 5 intentos maximo para obtener un pais diferente al pasado
    while (previousCca3 && randomCountry.cca3 === previousCca3 && attempts < 5) {
      randomCountry = validInfo[Math.floor(Math.random() * validInfo.length)];
      attempts++;
    }
    return randomCountry;
  }, [previousCca3, validInfo]);
  //para que la funcion no se cree de nuevo en cada render de la app, las dependencias porque si cambia la lista de valid, se hace de nuevo la funcion
  //o si cambia el previusCca3

  // construir ronda (en easy genera opciones con NOMBRES)
  const buildRound = useCallback(() => {
    const country = chooseRandomCountry(); // se elige un pais aleatorio diferente al anterior 

    setActualCountry(country); // se guarda el pais seleccionado
    setOptions([]); // se limpian opciones de la ronda anterior, se pone el si se respondio en false y si es correcto en null
    setAnswered(false);
    setIsCorrect(null);

    if (!country) return; // si no hay pais, se sale porque sin pais no se puede hacer nada 

    if (mode === "easy") { //esto es para construir las opciones, osea los botones en modo facil
      const correctAnswer = country.name.common; // se guarda la respuesta correcta de la ronda, en este caso el nombre del pais 

      const possibleCandidates = validInfo //aqui son todos los paiese que sean validos, en este caso los paises que tengan nombre 
        .filter(c => c.cca3 !== country.cca3) //evita que sea el correcto para no duplicar la opcion correcta 
        .map(c => c.name.common) // solo importan los nombres de los paises

      //mezcla los candidatos y toma 3 de ellos y los hace distractores, estos 3 seran las opciones incorrectas 
      const distractors = shuffle(possibleCandidates).slice(0, Math.max(0, optionsCount - 1));

      //hago un set para que si por casualidad se coló dos distractores iguales, sacar uno y dejar solo opciones distintas y ademas junto los distractores con la opcion correcta y se transforma a array
      const unique = Array.from(new Set([correctAnswer, ...distractors]));

      //vuelvo a revolver las opcioones para qeu la correcta no siempre quede en la primera opcion
      const finalOpts = shuffle(unique).slice(0, optionsCount);

      setOptions(finalOpts); //seteo o guardo las opciones para usarlas en los botones 
    }
  }, [mode, chooseRandomCountry, validInfo, optionsCount]);


  const normalizeCorrectAnswer = useMemo<string[]>(() => {
    //esto es basicamente si no hay un pais seleccionado aun, osea es null por lo que no tiene sentido calcuilar la respuesta correcta, entonces se devuielve un arreglo vacio para evitar errores al acceder a propiedades inexistentes y que la UI no se joda 
    if (!actualCountry) return [];
    if (!askingCapital) { // si es modo facil 
      const countryName = actualCountry.name.common; // se obtiene el nombre del pais que se está jugando 
      correctAnswerReference.current = countryName; // se setea el nombre del pais normal sin normalizar para poder pintar de verde el boton con la opcion correcta
      return [NormalizeText(countryName)]; // se normaliza para que a la hora que el usuario selecciona una opcion, el texto de la opcion tambien se normaliza, entonces se debe normalizar tambien el correcto para comparar bien 
    } else {
      const caps = actualCountry.capital!; // caps tiene las capitales del pais jugando
      correctAnswerReference.current = caps.join(", "); //muestra todas las capitales del pais separadas con coma
      return caps.map(NormalizeText); // se normalizan todas las capitales
    }
  }, [actualCountry, askingCapital]);

  // primera ronda o cuando cambia el pool
  useEffect(() => {
    if (!validInfo.length) {
      setActualCountry(null); setOptions([]); return;
    }
    buildRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validInfo]);

  // pasar a la siguiente ronda
  const nextRound = useCallback(() => {
    if (!validInfo.length || !actualCountry) return;
    setPreviousCca3(actualCountry.cca3);
    buildRound();
  }, [validInfo.length, actualCountry, buildRound]);

  const submitAnswer = useCallback((userUIanswer: string) => {
    if (answered) return; // para que cuando se selecciona una opcion ya no haga nada mas, basicamente evita doble seleccion de opcion, porque sin esto el usuario puede clickear en todas las opciones y se sumaran los puntos 

    const userAnswer = NormalizeText(userUIanswer); // normaliza lo que ingresó el usuario o el contenido del boton en caso de modo dificil
    const isCorrecto = normalizeCorrectAnswer.includes(userAnswer); //si coinside lo que escribio el usuario o opcion que seleccionó con alguna de las opciones que está en normalizeCorrectAnswer, si es nombre, solo será uno, si es capital, si el pais tiene mas de una capiutal, si alguna coincide

    setAnswered(true); //se guarda que la ronda ya fue respondida
    setIsCorrect(isCorrecto); //gaurda si el usaurio contestó bien
    if (isCorrecto) setCorrectCount(c => c + 1); // si es correcto es true, suma a correctos
    else setIncorrectCount(c => c + 1);// si es false suma a incorrectos

    // si el tiempo programado es mayor a 0, limpia el timeout previo si exsitia y progrma el next round usando el tiempo que mande el usaurio en las props
    if (autoAdvanceTime > 0) {
      if (autoTimerRound.current) {
        clearTimeout(autoTimerRound.current);
      }
      autoTimerRound.current = setTimeout(() => {
        nextRound();
      }, autoAdvanceTime);
    }
  }, [answered, normalizeCorrectAnswer, autoAdvanceTime, nextRound]);

  const restart = useCallback(() => {
    //esto porque si no se hace, si le doy reiniciar cuando escojo una opcion, se cambia 2 veces la pantalla, se renderiza 2 veces
    //con esto, si hay un timer pendiente o existe, se limpia
    if (autoTimerRound.current) //si hay un timer activo, cuando el usuario le da a reiniciar por ejemplo, hay un timer pendiente
    {
      clearTimeout(autoTimerRound.current);
      autoTimerRound.current = null; //se indica al ref que no hay un timer activo
    }
    //se resetean los estados generales
    setCorrectCount(0);
    setIncorrectCount(0);
    setAnswered(false);
    setIsCorrect(null);
    setPreviousCca3(null);
    buildRound();
  }, [buildRound]);

  // limpiar timeout al desmontar
  useEffect(() => {
    //como no hay codigo antes del return, cuando se monta el componente no hace nada, solo al desmontarse
    return () => {
      // basicamnte hace lo mismo de la funcion de restart
      if (autoTimerRound.current) {
        clearTimeout(autoTimerRound.current);
        autoTimerRound.current = null;
      }
    };
  }, []);

  // Exportar la URL de la bandera que se está jugandon actualmente
  const flagURL = getFlagURL(actualCountry);

  // Se obtiene la respuesta correcta guardada
  // Este valor se usa para mostrar la respuesta correcta en pantalla
  // y también para marcar en verde la opción correcta entre los botones.
  const correctAnswerDisplay = correctAnswerReference.current;

  return {
    actualCountry,
    flagURL,
    options,
    answered,
    isCorrect,
    correctCount,
    incorrectCount,
    submitAnswer,
    restart,
    correctAnswerDisplay,
  };
}