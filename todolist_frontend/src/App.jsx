import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import OAuthLogin from "./components/OAuthLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<OAuthLogin />} />
          <Route path="/todoList" element={<TodoList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
