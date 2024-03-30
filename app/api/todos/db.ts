export  const todosDB = new Map<number, ITodo>();

export interface ITodo{
    text: string,
    complited:boolean,
}

todosDB.set(1,{text:"task1", complited:false})
// todosDB.set(2,{text:"task2", complited:false})

 export let id = 1;


export function getTodos(id?: number) {
    if (id) {
        if (todosDB.has(id)) {
            return { id, ...todosDB.get(id) };
        } else {
            return null
        }
         
    }
    
    return Array.from(todosDB, ([key,value])=>({...value, id:key}))
}

export function createTodo(todo:string) {
    const new_todo = {
        text: todo,
        complited: false,
    };
    todosDB.set(id, new_todo);
}

export function deleteTodo(id:number) {
    todosDB.delete(id)
}

export function updateTodo(id: number, body: ITodo) {
    if (todosDB.has(id)) {
        const prevsTodo = todosDB.get(id)!;
        todosDB.set(id, { ...prevsTodo, ...body });
    }

}