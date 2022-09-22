import { useEffect } from "react"
import { useForm } from "../hooks/useForm";

export const FormWithCustomHook = () => {

    const { formState, onInputChange, onResetForm, username, email, password } = useForm({
        username: '',
        email: '',
        password: ''
    })

    //const { username, email, password } = formState;

    //useEffect es para disparar efectos secundarios
    //se recomienda usar un useEffect por cada efecto secundario que se desea 

    useEffect(() => {
        //console.log('useEffect called!');
    }, []);

    useEffect(() => {
        //console.log('formState changed!');
    }, [formState]);

    useEffect(() => {
        //console.log('email changed!');
    }, [email]);



    return (
        <>
            <h1>Formulario FormWithCustomHook</h1>
            <hr />

            <input 
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={ username }
                onChange={ onInputChange }
            />

            <input 
                type="email"
                className="form-control mt-2"
                placeholder="esteban@google.com"
                name="email"
                value={ email }
                onChange={ onInputChange }
            />

            <input 
                type="password"
                className="form-control mt-2"
                placeholder="Contraseña"
                name="password"
                value={ password }
                onChange={ onInputChange }
            />


            <button className="btn btn-primary mt-2" onClick={ onResetForm }>Borrar</button>

        </>
    )
}
