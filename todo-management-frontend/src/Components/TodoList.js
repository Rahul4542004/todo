import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {  checkRole, deleteTodo, getTodoList, markComplete, markIncomplete,isUserLoggedIn } from '../Services/TodoService.js';
import { useEffect, useState } from 'react';

export const TodoList = () => {
  const tableCell = {
    border: "solid black 2px",
    backgroundColor: 'darkgrey',
    textAlign: 'center'
  };
  
  const cell = {
    textAlign: "center",
    border: "solid black 2px"
  };
  
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodoList().then((response) => setTodos(response.data)).catch(err => console.error(err));
  }, []);
  
  const navigator = useNavigate();
  
  const handleComplete = (id) => {
    markComplete(id).then(() => {
      getTodoList().then((response) => setTodos(response.data)).catch(err => console.error(err));
    }).catch(err => console.error(err));
  };
  
  const handleIncomplete = (id) => {
    markIncomplete(id).then(() => {
      getTodoList().then((response) => setTodos(response.data)).catch(err => console.error(err));
    }).catch(err => console.error(err));
  };
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
      {checkRole() && <Button variant="contained" sx={{ marginTop: '20px', transition: 'all', color: "white", backgroundColor: "black",
        '&:hover': {
          backgroundColor: 'white',
          color: 'black'
        }}} onClick={() => navigator("/add-todo")}>Add Todo</Button>}
      <table style={{ border: 'solid black 2px', width: "1000px", marginTop: '20px', fontSize: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={tableCell}>
            <td style={tableCell}>Todo title</td>
            <td style={tableCell}>Todo description</td>
            <td style={tableCell}>Todo completed</td>
            <td style={tableCell}>Actions</td>
          </tr>
        </thead>
        <tbody>
          {isUserLoggedIn() && todos.map(todo =>
            <tr key={todo.id}>
              <td style={cell}>{todo.title}</td>
              <td style={cell}>{todo.description}</td>
              <td style={cell}>{todo.completed ? "Yes" : "No"}</td>
              <td style={cell}>
                { checkRole() &&
                <Button onClick={() => navigator(`/update-todo/${todo.id}`)} variant="contained" sx={{ color: "orange", backgroundColor: "white",
                  '&:hover': { color: "white", backgroundColor: "orange" }
                }}>Update</Button>
              }
              { checkRole() &&
                <Button onClick={() => {
                  deleteTodo(todo.id).then(response => {
                    setTodos(todos.filter(t => t.id !== todo.id));
                    navigator('/todos');
                  }).catch(err => console.error(err));
                }} sx={{ color: "red", backgroundColor: "white", '&:hover': { 
                  color: "white", backgroundColor: "red" } }} variant="contained">Delete</Button>
                }
                <Button onClick={() => handleComplete(todo.id)}
                  sx={{ color: "green", backgroundColor: "white", '&:hover': { color: "white", backgroundColor: "green" } }} variant="contained">Complete</Button>
                <Button onClick={() => handleIncomplete(todo.id)}
                  sx={{ color: "rgba(255,0,0,0.8)", backgroundColor: "white", '&:hover': { color: "white", backgroundColor: "rgba(255,0,0,0.8)" } }} variant="contained">Incomplete</Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
