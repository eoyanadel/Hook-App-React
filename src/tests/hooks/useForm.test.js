import { renderHook, act } from '@testing-library/react';
import { useForm } from '../../hooks';

describe('Pruebas en useForm', () => { 

    const initialForm = {
        name: 'Esteban',
        email: 'esteban@gmail.com'
    }

    test('debe de regresar los valores por defecto', () => {

        const { result } = renderHook(() => useForm(initialForm));
        //console.log(result.current);

        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            onInputChange: expect.any(Function), 
            onResetForm: expect.any(Function)
          });
    });
    

    test('debe de cambiar el nombre del formulario', () => { 
       
        const newValue = 'Juan';

        const { result } = renderHook(() => useForm(initialForm));
        const { onInputChange } = result.current;

        act(() => {
            onInputChange({ target: { name: 'name', value: newValue } });
        })

        expect(result.current.name).toBe(newValue);
        expect(result.current.formState.name).toBe(newValue);
    });


    test('debe de realizar el reset del formulario', () => { 
       
        const newValue = 'Juan';

        const { result } = renderHook(() => useForm(initialForm));
        const { onInputChange, onResetForm } = result.current;

        act(() => {
            onInputChange({ target: { name: 'name', value: newValue } });
            onResetForm();
        })

        expect(result.current.name).toBe(initialForm.name);
        expect(result.current.formState.name).toBe(initialForm.name);
    });
});