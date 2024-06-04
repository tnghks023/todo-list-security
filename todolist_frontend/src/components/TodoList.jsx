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
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

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

    fetchTodos(page, size);
  }, [page, size]);

  const fetchTodos = (page, size) => {
    getTodoList(page, size)
      .then((data) => {
        setTodoList(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleInsertTodo(e) {
    e.preventDefault();
    insertTodo(input).then(() => {
      getTodoList().then((data) => {
        setTodoList(data.content);
        setTotalPages(data.totalPages);
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getPaginationGroup = () => {
    const maxPages = 5;
    const start = Math.floor(page / maxPages) * maxPages;
    return new Array(Math.min(maxPages, totalPages - start))
      .fill()
      .map((_, idx) => start + idx + 1);
  };

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

      <div className="pagination mt-4">
        <button
          disabled={page <= 0}
          className="me-2"
          onClick={() => handlePageChange(0)}
        >
          First
        </button>
        <button
          className="btn btn-secondary me-2"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 0}
        >
          Previous
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(item - 1)}
            className={`pagination-item ${page === item - 1 ? "active" : ""}`}
          >
            {item}
          </button>
        ))}

        <button
          className="btn btn-primary ms-2"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
        <button
          className="ms-2"
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={page >= totalPages - 1}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default TodoList;
