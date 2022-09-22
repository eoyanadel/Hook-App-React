import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../08-useReducer/TodoItem";

describe('Pruebas en el componente <TodoItem />', () => { 
  
    const todo = {
        id: 1,
        decription: 'Piedra del Alma',
        done: false
    };

    const onDeleteTodoMock = jest.fn();
    const onToogleTodoMock = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el Todo pendiente de completar', () => {

        render(
            <TodoItem
                todo={ todo }
                onToggleTodo={ onToogleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );

        const liElement = screen.getByRole('listitem');
        //console.log(liElement.innerHTML);
        //screen.debug();

        expect(liElement.className).toBe('list-group-item d-flex justify-content-between');

        const spanElement = screen.getByLabelText('span');
        //console.log(spanElement.className);

        expect(spanElement.className).toBe('align-self-center ');
        expect(spanElement.className).toContain('align-self-center');
        expect(spanElement.className).not.toContain('text-decoration-line-through');

    });


    test('debe de mostrar el Todo completado', () => {

        todo.done = true;

        render(
            <TodoItem
                todo={ todo }
                onToggleTodo={ onToogleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );

        const spanElement = screen.getByLabelText('span');

        expect(spanElement.className).toContain('text-decoration-line-through');

    });


    test('span debe de llamar el ToggleTodo cuando se hace click', () => {

        render(
            <TodoItem
                todo={ todo }
                onToggleTodo={ onToogleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );

        const spanElement = screen.getByLabelText('span');
        fireEvent.click(spanElement);

        expect(onToogleTodoMock).toHaveBeenCalledWith(todo.id);
    });


    test('button debe de llamar el deleteTodo', () => {

        render(
            <TodoItem
                todo={ todo }
                onToggleTodo={ onToogleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id);
    });
})