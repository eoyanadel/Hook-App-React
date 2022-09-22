import { useCallback, useState } from "react"
import { ShowIncrement } from "./ShowIncrement";

export const CallbackHook = () => {

    const [counter, setCounter] = useState(10);

    //LEER 2DO
    //El useCallback memoriza la función incrementFather, es decir, ocupa el mismo espacio de memoria cada vez que se renderiza el componente CallBackHook.
    //De esta forma, al renderizarse y llamar al componente ShowIncrement, la funcion incrementFather es la misma, por lo que el ShowIncrement, al tener el React.memo,
    //no vuelve a renderizarse.
    //Por lo tanto, solo se encarga de incrementar el valor con el setCounter sin renderizar el ShowIncrment nuevamente.
    const incrementFather = useCallback(
      (num) => {
        console.log('setCounter(counter + 1);');
        setCounter( (value) => value + num);
      },
      [],
    )
    
    //LEER 1ERO
    //Cada vez que se renderiza el componente CallbackHook, la función incrementFather ocupa un espacio de memoria distinto, es decir, es una función nueva.
    //Por eso no memoriza el componente ShowIncrement al que se le pasa por parámetro la funcion incrementFather, a pesar de que ese componente
    //tiene el React.memo para justamente se memorize y no se vuelva a renderizar.    
    /* const incrementFather = () => {
        setCounter(counter + 1);
    } */

    return (
        <>
            <h1>useCallback Hook: { counter }</h1>
            <hr />

            <ShowIncrement increment={ incrementFather } />
        </>
    )
}
