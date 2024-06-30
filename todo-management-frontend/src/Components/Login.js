import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { logIn } from '../Services/TodoService';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    function login(e){
        e.preventDefault();
        const user = {usernameOrEmail : name, password : password};
        logIn(user).then(response => {
            console.log(response.data);
            navigate('/todos')
        }).catch(err => console.error(err))
    }
  return (
    <form>
        <div style={{marginTop : "50px",display : "flex",flexDirection : "column"}}>
        <TextField
            name = "username"
            id = "username"
            type = "text"
            label = "Username or Email"
            required
            autoFocus
            sx = {{width : "300px"}}
            placeholder='Enter your username or email'
            onChange={e => setName(e.target.value)}
        />
        <TextField
            name = "password"
            id = "password"
            type = "password"
            label = "Password"
            sx = {{width : "300px"}}
            required
            autoFocus
            placeholder='Enter your password'
            onChange = { e => setPassword(e.target.value)}
        />
        <Button onClick={login} type = "submit" variant='contained' sx={{width : "200px"}}>sign in</Button>
        </div>
    </form>
  )
}
