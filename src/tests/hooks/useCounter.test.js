import { act, renderHook } from "@testing-library/react"
import { useCounter } from "../../hooks/useCounter"

describe('Pruebas en el useCounter', () => { 
    test('debe de retornar los valores por defecto', () => {
        
        const { result } = renderHook(() => useCounter());
        // console.log(result);
        const { counter, increment, decrement, reset } = result.current;

        expect(counter).toBe(10);
        expect(increment).toEqual(expect.any(Function));
        expect(decrement).toEqual(expect.any(Function));
        expect(reset).toEqual(expect.any(Function));
    });


    test('debe de generar el counter con el valor de 100', () => {
        
        const { result } = renderHook(() => useCounter(100));        
        const { counter } = result.current;

        expect(counter).toBe(100);
    });


    test('debe de incrementar el contador', () => { 
        
        const { result } = renderHook(() => useCounter(100));
        const { counter, increment } = result.current;

        act(() => {
            increment();
            increment(2);
        });        

        // evalúo con el current pq este contiene el counter actualizado, despues de ejecutar el increment en el act()
        // si ocupara el counter que desestructuro al inicio, no serviría ya que ese counter tiene el valor de ese momento, el cual era 100
        expect(result.current.counter).toBe(103);
     });


     test('debe de decrementar el contador', () => { 
        
        const { result } = renderHook(() => useCounter(100));
        const { counter, decrement } = result.current;

        act(() => {
            decrement();
            decrement(2);
        });        

        // evalúo con el current pq este contiene el counter actualizado, despues de ejecutar el decrement en el act()
        // si ocupara el counter que desestructuro al inicio, no serviría ya que ese counter tiene el valor de ese momento, el cual era 100
        expect(result.current.counter).toBe(97);
     });


     test('debe de realizar el reset', () => { 
        
        const { result } = renderHook(() => useCounter(100));
        const { counter, increment, decrement, reset } = result.current;

        act(() => {
            increment(5);
            decrement(2);
            reset();
        });        

        // evalúo con el current pq este contiene el counter actualizado, despues de ejecutar todo lo del act()
        // si ocupara el counter que desestructuro al inicio, no serviría ya que ese counter tiene el valor de ese momento, el cual era 100
        expect(result.current.counter).toBe(100);
     });
 })