import { getTodos, createTodo} from "./db";



export async function GET() {
    return Response.json(getTodos())
}
export async function POST(request: Request) {
    
    const body = await request.json();

    console.log(body);
    createTodo(body.text);
    return Response.json("created");
}