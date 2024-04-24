import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TodoForm from './TodoForm';
import './styles/App.css'; // Import the custom styles

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    // Fetch data from the Express server
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  const deleteTodo = async (_id) => {
    console.log(_id);
    try {
      await axios.delete('http://localhost:5000/todos/:_id')
      .then(response => {
        setTodos(todos.filter(todo => todo._id !== _id))
        console.log('Todo deleted successfully:', response.data);
      })
      
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='container'>
      <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.task} {todo._id}
          
          <button className='btn-delete' onClick={()=>deleteTodo(todo._id)}>Delete Todo</button>
          </li>
          
        ))}
      </ul>
    </div>
  );
};
export default App;