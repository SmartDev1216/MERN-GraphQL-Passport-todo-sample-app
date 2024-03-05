import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_TODOS,
  ADD_TODO,
  TOGGLE_TODO_COMPLETION,
  DELETE_TODO,
} from "../graphql/queries";

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  console.log(data);
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodoCompletion] = useMutation(TOGGLE_TODO_COMPLETION);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [text, setText] = useState("");
  const [texterror, setTextError] = useState("");

  const validateInput = () => {
    if (!text.trim()) {
      setTextError("Text is required");
      return false;
    }
    setTextError("");
    return true;
  };

  const handleAddTodo = () => {
    if (validateInput()) {
      addTodo({
        variables: { text: text },
        refetchQueries: [{ query: GET_TODOS }],
      });
      setText("");
    }
  };

  const handleToggleTodoCompletion = (id) => {
    toggleTodoCompletion({
      variables: { id },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo({ variables: { id }, refetchQueries: [{ query: GET_TODOS }] });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4 justify-center items-center mt-[100px]">
      <h1 className="text-2xl font-bold mb-4">TODO App</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Todo..."
          className="border border-gray-300 p-2 mr-2 flex-grow"
          required
        />

        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Todo
        </button>
      </div>
      {texterror && <p className="text-red-500 pb-2">{texterror}</p>}
      <ul>
        {data.todos.map((todo) => (
          <li
            key={todo.id}
            className="w-full flex justify-between p-2 my-2 border-solid border-2 border-gray-600  rounded"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodoCompletion(todo.id)}
                className="border border-gray-300 mr-2"
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              />
              <span>{todo.text}</span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
