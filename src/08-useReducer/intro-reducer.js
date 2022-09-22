

const initialState = [{
    id: 1,
    todo: 'Recolectar la piedra del Alma',
    done: false
}];


// El Reducer no modifica ni muta el estado, siempre devuelve un nuevo estado
const todoReducer = ( state = initialState, action = {} ) => {

    if (action.type === '[TODO] add todo') {
        return [ ...state, action.payload ]

        //jamas hacer esto, es decir, jamas hacer un push al arreglo, porque está mutando el state original
        //state.push(action.payload)
    }
    
    return state;
}



let todos = todoReducer();

const newTodo = {
    id: 2,
    todo: 'Recolectar la piedra del poder',
    done: false
};

const addTodoAction = {
    type: '[TODO] add todo',
    payload: newTodo
}

todos = todoReducer(todos, addTodoAction);


console.log({ state: todos });