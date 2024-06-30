import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodo, updateTodo, addTodo } from '../Services/TodoService';

export const Todo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTodo(id)
        .then(response => {
          setCompleted(response.data.completed);
          setTitle(response.data.title);
          setDescription(response.data.description);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  function handleClick(e) {
    e.preventDefault();

    const titleRegex = /^.{1,20}$/;
    const descriptionRegex = /^(?!\s*$).{1,255}$/;
    const tempErrors = {};
    tempErrors.title = titleRegex.test(title) ? "" : "Title can't exceed 20 characters.";
    tempErrors.description = descriptionRegex.test(description) ? "" : "Description must be between 1 and 255 characters long and cannot be empty.";
    
    setErrors(tempErrors);

    if (!tempErrors.title && !tempErrors.description) {
      const todo = { title, description, completed };
      if (id) {
        updateTodo(id, todo).then(() => navigate("/todos"));
      } else {
        addTodo(todo).then(() => navigate("/todos"));
      }
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <form style={{ display: "flex", flexDirection: "column", border: "solid black 3px", width: "600px", alignItems: "center" }}>
        <Typography variant="h3" sx={{ marginTop: "20px" }}>
          {id ? "Update Todo" : "Add Todo"}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "40px" }}>Todo title:
          <TextField
            margin="normal"
            required
            id="title"
            label="Todo title"
            name="title"
            placeholder="Enter todo title"
            type="text"
            autoFocus
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{ marginLeft: "10px", marginTop: "-10px", width: "300px" }}
            error={!!errors.title}
            helperText={errors.title}
          />
        </Typography>
        <Typography variant='h5' sx={{ marginTop: "40px" }}>Todo description:
          <TextField
            margin="normal"
            id="description"
            label="Todo description"
            name="description"
            placeholder="Enter todo description"
            onChange={e => setDescription(e.target.value)}
            required
            fullWidth
            autoFocus
            value={description}
            sx={{ marginTop: "-10px", marginLeft: "10px", width: "300px" }}
            error={!!errors.description}
            helperText={errors.description}
            type="text"
          />
        </Typography>
        <Typography variant='h5' margin="normal"
            id="completed"
            name="completed" sx={{ marginTop: "30px" }}>Todo completed : {completed ? " Yes" : " No"}
        </Typography>
        <Button onClick={handleClick} type="submit" variant='contained' sx={{ borderRadius: "10px", marginTop: "30px", marginBottom: "20px" }}>Submit</Button>
      </form>
    </div>
  );
}
