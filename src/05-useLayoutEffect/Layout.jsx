import { useCounter, useFetch } from "../hooks";
import { LoadingQuote, Quote } from "../03-examples";

export const Layout = () => {

    const { counter, increment } = useCounter(1)
    
    const { data, isLoading, hasError } = useFetch(`https://www.breakingbadapi.com/api/quotes/${ counter }`);
    
    //console.log({ data, isLoading, hasError });

    //si la data tiene valor, entonces toma la data en la posición 0
    const { author, quote } = !!data && data[0];

    return (
        <>
            <h1>Breaking Bad Quotes</h1>
            <hr />
            
            {
                isLoading ? <LoadingQuote /> : <Quote quote={ quote } author={ author } />
            }       

            <button className="btn btn-primary" disabled={ isLoading } onClick={ () => increment() }>
                Next Quote: { counter }
            </button>

        </>
    )
}
