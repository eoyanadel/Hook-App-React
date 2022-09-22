import { fireEvent, render, screen } from "@testing-library/react";
import { UserContext } from "../../09-useContext/context/UserContext";
import { LoginPage } from "../../09-useContext/LoginPage";

describe('Pruebas en <LoginPage/>', () => { 
    
    const user = { 
        id: 123, 
        name: 'Esteban Oyanadel', 
        email: 'esteban@gmail.com' 
    };

    test('debe de mostrar el componente SIN el usuario', () => { 
        
        render(
            <UserContext.Provider value={ { user: null } }>
                <LoginPage/>
            </UserContext.Provider>
        );
        //screen.debug();

        const preTag = screen.getByLabelText('pre');  //aria-label
        //console.log(preTag.innerHTML);

        expect(preTag.innerHTML).toBe('null');
    });


    test('debe de llamar el setUser cuando se hace click en el button', () => {

        const setUserMock = jest.fn();        

        render(
            <UserContext.Provider value={ { user: null, setUser: setUserMock } }>
                <LoginPage/>
            </UserContext.Provider>
        );
        screen.debug();

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(setUserMock).toHaveBeenCalled();
        expect(setUserMock).toHaveBeenCalledWith(user);
    });
 })