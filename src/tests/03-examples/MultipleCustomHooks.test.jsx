import { fireEvent, render, screen } from "@testing-library/react";
import { MultipleCustomHooks } from '../../03-examples';
import { useCounter } from "../../hooks/useCounter";
import { useFetch } from '../../hooks/useFetch'

//- El mock se ocupa para simular o imitar el comportamiento de un objeto o en este caso un hook
//- Estoy simulando el hook useFetch
//- Se debe incluir el mock en cada parte donde se llama o si no tira un error
//- Como el useFetch está dentro del componente MultipleCustomHooks,
//  debemos incluir el mock en cada prueba que hagamos ya que estamos haciendo pruebas sobre este componente
jest.mock('../../hooks/useFetch');

//mock del userCounter
jest.mock('../../hooks/useCounter');

describe('Pruebas en <MultipleCustomHooks />', () => { 

    /* Si lo ponemos acá se agrega la simulación en todas las pruebas.
       Lo pongo acá pq solo lo uso en la última prueba, pero los mocks deben agregarse
       en todos los lados donde se ocupa, y para este caso el useCounter se ocupa dentro
       del componente principal en el cual estamos haciendo pruebas. */

    //definiendo función de jest para el increment del useCounter
    const mockIncrement = jest.fn();

    //simulando la ejecución del useCounter
    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement            
    });

    //limpiamos los mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
    });

    
    test('debe de mostrar el componente por defecto', () => { 
        
        // simulando estado inicial del useFetch
        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null
        });

        render(<MultipleCustomHooks />);
        //screen.debug();

        expect(screen.getByText('Loading...'));
        expect(screen.getByText('Breaking Bad Quotes'));

        const nextButton = screen.getByRole('button', { name: 'Next Quote: 1' } );
        //console.log(nextButton.disabled)
        expect(nextButton.disabled).toBeTruthy();
    });


    test('debe de mostrar un Quote', () => { 
        
        //simulando el estado del Fetch ya retornando data
        useFetch.mockReturnValue({
            data: [{ author: 'Esteban', quote: 'Hola Mundo' }],
            isLoading: false,
            hasError: null
        });

        render(<MultipleCustomHooks />);
        //screen.debug();

        expect(screen.getByText('Hola Mundo')).toBeTruthy();
        expect(screen.getByText('Esteban')).toBeTruthy();

        const nextButton = screen.getByRole('button', { name: 'Next Quote: 1' } );
        expect(nextButton.disabled).toBeFalsy();
    });


    test('debe de llamar la función de incrementar', () => {

        //simulando el estado del Fetch ya retornando data
        useFetch.mockReturnValue({
            data: [{ author: 'Esteban', quote: 'Hola Mundo' }],
            isLoading: false,
            hasError: null
        });

        render(<MultipleCustomHooks />);

        const nextButton = screen.getByRole('button', { name: 'Next Quote: 1' } );
        fireEvent.click(nextButton);

        //evaluamos q la funcion increment del useCounter se llamó al hacer click en el boton
        expect(mockIncrement).toHaveBeenCalled();
    });
})