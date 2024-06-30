import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { logIn } from '../Services/TodoService';
import { useNavigate } from 'react-router-dom';

export const Login = ({setLogIn,setUsername}) => {
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [flag,setFlag]  = useState(false);
    const navigate = useNavigate();
    function login(e){
        e.preventDefault();
        const user = {usernameOrEmail : name, password : password};
        logIn(user).then(response => {
            console.log(response.data);
            setLogIn(true);
            setUsername(name);
            navigate('/todos')
        }).catch(err => {
            setFlag(true);
            console.error(err)
        })
    }
  return (
    <form>
        <center>
        <div style={{marginTop : "50px",display : "flex",flexDirection : "column",alignItems : "center",border : "solid black 2px",
                    width : "500px"
        }}>
        <TextField
            name = "username"
            id = "username"
            type = "text"
            label = "Username or Email"
            required
            autoFocus
            sx = {{width : "300px",marginTop : "50px"}}
            placeholder='Enter your username or email'
            onChange={e => setName(e.target.value)}
        />
        <TextField
            name = "password"
            id = "password"
            type = "password"
            label = "Password"
            sx = {{width : "300px",marginTop : "50px"}}
            required
            autoFocus
            placeholder='Enter your password'
            onChange = { e => setPassword(e.target.value)}
        />
        <Button onClick={login} type = "submit" variant='contained' sx={{width : "200px",marginTop : "50px",marginBottom : !flag ? '50px' : "10px",
            transitionProperty : "all", '&:hover' : {
                backgroundColor : "white",
                color : "blue"
            }
        }}>sign in</Button>
        {flag && <p style = {{color : "red",marginBottom : "50px"}}>Incorrect email or password</p>}
        </div>
        </center>
    </form>
  )
}
