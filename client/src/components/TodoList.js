import React,{useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS, ADD_TODO, TOGGLE_TODO_COMPLETION, DELETE_TODO } from '../graphql/queries'

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodoCompletion] = useMutation(TOGGLE_TODO_COMPLETION);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [text,setText] = useState('')
  const handleAddTodo = () => {
    addTodo({ variables: { text: text }, refetchQueries: [{ query: GET_TODOS }] });
  };

  const handleToggleTodoCompletion = (id) => {
    toggleTodoCompletion({ variables: { id }, refetchQueries: [{ query: GET_TODOS }] });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo({ variables: { id }, refetchQueries: [{ query: GET_TODOS }] });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
        <input
                type='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Add Todo...'
        />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {data.todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodoCompletion(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;