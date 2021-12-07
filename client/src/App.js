import React, { Fragment } from "react";
import "./App.css";
import InputTodo from "./componets/inputTodo";
import ListTodos from "./componets/listTodo";
function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
