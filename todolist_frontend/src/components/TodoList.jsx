import React, { useEffect, useState } from "react";
import Input from "./input";
import Todo from "./todo";
import {
  getTodoList,
  insertTodo,
  changeCompletedTodo,
  deleteTodo,
} from "../utils/ApiFunctions";
import { Navigate, useNavigate } from "react-router-dom";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParam("token");

    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      navigate("/");
    }

    function searchParam(key) {
      return new URLSearchParams(location.search).get(key);
    }

    getTodoList()
      .then((data) => {
        setTodoList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleInsertTodo(e) {
    e.preventDefault();
    insertTodo(input).then(() => {
      getTodoList().then((data) => {
        setTodoList(data);
      });
    });

    setInput("");
  }

  function handleUpdateTodo(id) {
    changeCompletedTodo(id);
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDeleteTodo(id) {
    deleteTodo(id);
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function changeText(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <h1> TODO LIST</h1>
      <Input
        handleSubmit={handleInsertTodo}
        input={input}
        handleChange={changeText}
      />

      {todoList
        ? todoList.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                handleClick={() => handleUpdateTodo(todo.id)}
                handleDelete={() => handleDeleteTodo(todo.id)}
              />
            );
          })
        : null}
    </div>
  );
};

export default TodoList;
