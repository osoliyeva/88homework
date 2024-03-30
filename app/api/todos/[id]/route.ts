import { deleteTodo, getTodos, updateTodo } from "../db"

export async function GET(request: Request, { params }:{params:{id:string}}) {
    
    const id = +params.id
    
    const data = getTodos(id)
    return Response.json(data)
    
}
export async function DELETE(request: Request, { params }:{params:{id:string}}) {
    
    const id = +params.id
    
    deleteTodo(id)
    return Response.json("deleted")
    
}
export async function PUT(request: Request, { params }:{params:{id:string}}) {
    
    const id = +params.id
    const body = await request.json();
    updateTodo(id, body)
    return Response.json("updated")
    
}