import { render, screen } from "@testing-library/react";
import { UserContext } from "../../09-useContext/context/UserContext";
import { HomePage } from "../../09-useContext/HomePage";

describe('Pruebas en <HomePage/>', () => { 
  
    const user = {
        id: 1,
        name: 'Esteban'
    };

    test('debe de mostrar el componente SIN el usuario', () => {

        render(
            <UserContext.Provider value={ { user: null } }>
                <HomePage/>
            </UserContext.Provider>
        );
        //screen.debug();

        const preTag = screen.getByLabelText('pre');  //aria-label
        //console.log(preTag.innerHTML);

        expect(preTag.innerHTML).toBe('null');
    });


    test('debe de mostrar el componente CON el usuario', () => {

        render(
            <UserContext.Provider value={ { user } }>
                <HomePage/>
            </UserContext.Provider>
        );
        //screen.debug();

        const preTag = screen.getByLabelText('pre');  //aria-label
        console.log(preTag.innerHTML);

        expect(preTag.innerHTML).toContain(user.name);
        expect(preTag.innerHTML).toContain(user.id.toString());
    });
})