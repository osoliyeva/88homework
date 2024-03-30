"use client";
const BaseUrl = "http://localhost:3000/api/todos/";

import { useEffect, useRef, useState } from "react";
import { ITodo, id } from "./api/todos/db";

const Form = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [Id, setId] = useState<number | undefined>(undefined);
  
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(e.target.input.value);
    if (e.target.input.value.length&& !isEdit)
      e.preventDefault()
      createTodo({ text: e.target.input.value });
    setTodos([...todos, e.target.input.value])
    if (isEdit) updateTodo({ id: Id, text: e.target.input.value });
  };

  const createTodo = async (obj: any) => {
    const req = await fetch(BaseUrl, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({ ...obj }),
    });
    const res = await req.json();
    getTodo();
    clearInput();
    console.log(res);
    
  };

  const getTodo = async () => {
    setLoading(true);
    const req = await fetch(BaseUrl, {
      cache: "no-store",
    });
    const res = await req.json();
    setTodos([...res,]);
    setLoading(false);
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const updateTodo = async (data: {
    id?: number;
    completed?: boolean;
    text: string;
  }) => {
    const newData = {
      completed: data.completed ? false : true,
      text: data.text,
    };
    fetch(BaseUrl + data.id, {
      
      method: "PUT",
      body: JSON.stringify(newData),
    }).finally(() => {
      if (inputRef.current) inputRef.current.value = "";
      setIsEdit(false);
      setId(undefined);
      getTodo();
    });
  };


  const handleUpdate = (id: number) => {
    setIsEdit(true);
    if (inputRef.current) inputRef.current.value = todos[id - 1].text;
    setId(id);
  };


  useEffect(() => {
    getTodo();
    clearInput();
  }, []);


  return (
    <div className="main__container">

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          !loading && handleSubmit(e);
        }}
      >
        <div className="form">
        <input ref={inputRef} type="text" name="input" placeholder="task1" />
        <button disabled={loading} className="submit">submit</button>
        </div>
      </form>

      
      <ol>
        {todos.map((e, i) => (
          <li key={i}>

            {e.text}

            <button
              onClick={() => {
                fetch(BaseUrl + (i + 1), {
                  method: "DELETE",
                  
                }).finally(() => {
                  getTodo();
                });
              }}
              className="submit"
            >

              del

            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleUpdate(i + 1);
              }}
              className="submit"
            >
              
              edit

            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Form;
